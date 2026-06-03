const { executeQuery } = require('../../db/queryExecutor');

// Counts endpoint queries
async function repoCounts(ulbId=4) {
  const queries = [];

  // Total applications
  const totalAppSql = `
    SELECT COUNT(var_application_appno) AS total_applications 
    FROM aorts_application_det 
    WHERE num_application_ulbid = :ulbId
  `;

  // Total approved
  const approvedSql = `
    SELECT COUNT(var_application_appno) AS approved_applications
    FROM aorts_application_det a
    INNER JOIN aorts_applicant_infodet infodet
      ON infodet.var_appl_appno = a.var_application_appno
      AND num_appl_serviceid = a.num_application_serviceid
      AND infodet.num_appl_ulbid = a.num_application_ulbid
    WHERE var_application_status IN ('NW','AP','DL') 
    AND a.num_application_ulbid = :ulbId
  `;

  // Total pending
  const pendingSql = `
    SELECT COUNT(var_application_appno) AS pending_applications
    FROM aorts_application_det a
    INNER JOIN aorts_applicant_infodet infodet
      ON infodet.var_appl_appno = a.var_application_appno
      AND num_appl_serviceid = a.num_application_serviceid
      AND infodet.num_appl_ulbid = a.num_application_ulbid
    WHERE var_application_status IN ('CP','IP','VP','PP') 
    AND a.num_application_ulbid = :ulbId
  `;

  // Delayed applications
  const delayedSql = `
    select count(a.var_application_appno) delayed_applications
    FROM aorts_application_det a
         INNER JOIN aorts_applicant_infodet infodet
             ON     infodet.var_appl_appno = a.var_application_appno
                AND num_appl_serviceid = a.num_application_serviceid
                AND infodet.num_appl_ulbid = a.num_application_ulbid
         INNER JOIN aorts_service_def
             ON num_service_serviceid = a.num_application_serviceid
          left join  aorts_service_config 
          on num_serv_servid=num_service_serviceid 
          and num_serv_deptid=num_service_deptid  
          and num_serv_ulbid=num_application_ulbid
where trunc(sysdate)-trunc(a.dat_application_insdate)>num_service_maxdays
and var_application_status in ('CP','IP','VP','PP') and a.num_application_ulbid = :ulbId
  `;

  // Approved percentage
  const approvedPercentageSql = `
    SELECT ROUND(SUM(CASE WHEN a.var_application_status IN ('NW','AP','DL') THEN 1 END) * 100.0 / COUNT(a.var_application_appno), 2) AS approved_percentage
    FROM aorts_application_det a
    INNER JOIN aorts_applicant_infodet infodet
      ON infodet.var_appl_appno = a.var_application_appno
      AND num_appl_serviceid = a.num_application_serviceid
      AND infodet.num_appl_ulbid = a.num_application_ulbid
    INNER JOIN aorts_service_def
      ON num_service_serviceid = a.num_application_serviceid
    LEFT JOIN aorts_service_config
      ON num_serv_servid = num_service_serviceid
      AND num_serv_deptid = num_service_deptid
      AND num_serv_ulbid = num_application_ulbid
    WHERE TRUNC(SYSDATE) - TRUNC(a.dat_application_insdate) <= num_service_maxdays
    AND a.num_application_ulbid = :ulbId
  `;

  // Today's applications
  const todayAppSql = `
    SELECT COUNT(var_application_appno) AS todays_applications
    FROM aorts_application_det
    WHERE num_application_ulbid = :ulbId 
    AND TRUNC(dat_application_insdate) = TRUNC(SYSDATE)
  `;

  // Today's approved
  const todayApprovedSql = `
    SELECT COUNT(var_application_appno) AS todays_approved
    FROM aorts_application_det a
    INNER JOIN aorts_applicant_infodet infodet
      ON infodet.var_appl_appno = a.var_application_appno
      AND num_appl_serviceid = a.num_application_serviceid
      AND infodet.num_appl_ulbid = a.num_application_ulbid
    WHERE var_application_status IN ('NW','AP','DL') 
    AND a.num_application_ulbid = :ulbId
    AND TRUNC(a.dat_application_insdate) = TRUNC(SYSDATE)
  `;

  const binds = { ulbId: Number(ulbId) };

  try {
    const [
      totalAppResult,
      approvedResult,
      pendingResult,
      delayedResult,
      approvedPercentageResult,
      todayAppResult,
      todayApprovedResult
    ] = await Promise.all([
      executeQuery(totalAppSql, binds),
      executeQuery(approvedSql, binds),
      executeQuery(pendingSql, binds),
      executeQuery(delayedSql, binds),
      executeQuery(approvedPercentageSql, binds),
      executeQuery(todayAppSql, binds),
      executeQuery(todayApprovedSql, binds)
    ]);

    return {
      total_applications: totalAppResult.rows?.[0]?.TOTAL_APPLICATIONS || 0,
      approved_applications: approvedResult.rows?.[0]?.APPROVED_APPLICATIONS || 0,
      pending_applications: pendingResult.rows?.[0]?.PENDING_APPLICATIONS || 0,
      delayed_applications: delayedResult.rows?.[0]?.DELAYED_APPLICATIONS || 0,
      approved_percentage: approvedPercentageResult.rows?.[0]?.APPROVED_PERCENTAGE || 0,
      todays_applications: todayAppResult.rows?.[0]?.TODAYS_APPLICATIONS || 0,
      todays_approved: todayApprovedResult.rows?.[0]?.TODAYS_APPROVED || 0
    };
  } catch (error) {
    throw error;
  }
}

// Deptwise applications view
async function repoDeptWiseApplications(ulbId) {
  const sql = `SELECT * FROM vw_deptwise_applications`;
  const result = await executeQuery(sql,{});
  return result.rows || [];
}

// TAT wise pending applications
async function repoTatWisePending(ulbId) {
  const sql = `SELECT * FROM vw_tatwise_pending`;
  const result = await executeQuery(sql,{});
  return result.rows || [];
}

// Monthwise application trend
async function repoMonthwiseApplicationTrend(ulbId) {
  const sql = `SELECT * FROM vw_monthwiseapplication_trend`;
  const result = await executeQuery(sql,{});
  return result.rows || [];
}

// Application Status Summary - Approved vs Pending
async function repoApplicationStatusSummary(ulbId = 4) {
  const sql = `
    SELECT 
      SUM(CASE WHEN var_application_status IN ('NW','AP','DL') THEN 1 END) AS approved_applications,
      SUM(CASE WHEN var_application_status NOT IN ('NW','AP','DL') THEN 1 END) AS pending_applications
    FROM aorts_application_det a
      INNER JOIN aorts_applicant_infodet infodet
        ON infodet.var_appl_appno = a.var_application_appno
        AND num_appl_serviceid = a.num_application_serviceid
        AND infodet.num_appl_ulbid = a.num_application_ulbid
      INNER JOIN aorts_service_def
        ON num_service_serviceid = a.num_application_serviceid
      LEFT JOIN aorts_service_config 
        ON num_serv_servid = num_service_serviceid 
        AND num_serv_deptid = num_service_deptid  
        AND num_serv_ulbid = num_application_ulbid
    WHERE a.num_application_ulbid = :ulbId
  `;
  const binds = { ulbId: Number(ulbId) };
  const result = await executeQuery(sql, binds);
  return result.rows?.[0] || {};
}

// Detailed Application Status Summary
async function repoDetailedApplicationStatus(ulbId = 4) {
  const sql = `
    SELECT 
      SUM(CASE WHEN var_application_status IN ('NW','AP','DL') THEN 1 END) AS approved_applications,
      SUM(CASE WHEN var_application_status IN ('CP','IP','VP','PP') THEN 1 END) AS pending_applications,
      SUM(CASE WHEN var_application_status IN ('CR','DN') THEN 1 END) AS reject_applications,
      SUM(CASE WHEN var_application_status NOT IN ('NW','AP','DL','CP','IP','VP','PP','CR','DN') THEN 1 END) AS others_applications
    FROM aorts_application_det a
      INNER JOIN aorts_applicant_infodet infodet
        ON infodet.var_appl_appno = a.var_application_appno
        AND num_appl_serviceid = a.num_application_serviceid
        AND infodet.num_appl_ulbid = a.num_application_ulbid
      INNER JOIN aorts_service_def
        ON num_service_serviceid = a.num_application_serviceid
      LEFT JOIN aorts_service_config 
        ON num_serv_servid = num_service_serviceid 
        AND num_serv_deptid = num_service_deptid  
        AND num_serv_ulbid = num_application_ulbid
    WHERE a.num_application_ulbid = :ulbId
  `;
  const binds = { ulbId: Number(ulbId) };
  const result = await executeQuery(sql, binds);
  return result.rows?.[0] || {};
}

// Top Services
async function repoTopServices(ulbId) {
  const sql = `SELECT * FROM vw_top_services`;
  const result = await executeQuery(sql, {});
  return result.rows || [];
}

// Service-wise Top Delay
async function repoServicewiseTopDelay(ulbId) {
  const sql = `SELECT * FROM vw_servicewisetop_delay`;
  const result = await executeQuery(sql, {});
  return result.rows || [];
}

module.exports = {
  repoCounts,
  repoDeptWiseApplications,
  repoTatWisePending,
  repoMonthwiseApplicationTrend,
  repoApplicationStatusSummary,
  repoDetailedApplicationStatus,
  repoTopServices,
  repoServicewiseTopDelay
};
