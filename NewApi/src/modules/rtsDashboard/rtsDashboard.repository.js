const { executeQuery } = require("../../db/queryExecutor");

// Counts endpoint queries
async function repoCounts(
  ulbId = 4,
  fromDate,
  toDate,
  deptName,
  serviceName,
  wardName,
  officerName,
  status
) {
  const commonFilters = `
AND (:fromDate IS NULL OR app_date >= TO_DATE(:fromDate,'DD-MON-YYYY'))
AND (:toDate IS NULL OR app_date <= TO_DATE(:toDate,'DD-MON-YYYY'))
AND (:serviceName IS NULL OR servnm = :serviceName)
AND (:wardName IS NULL OR prabhag_nm = :wardName)
AND (:officerName IS NULL OR officer_name = :officerName)
AND (:status IS NULL OR status = :status)
`;

  const buildViewQuery = (viewName, columnName) => `
     SELECT COUNT(*) AS CNT
    FROM ${viewName}
    WHERE 1 = 1
    ${commonFilters}
  `;

  const totalAppSql = buildViewQuery(
    "vw_total_applications",
    "total_applications"
  );

  const approvedSql = buildViewQuery(
    "approved_applications",
    "approved_applications"
  );

  const pendingSql = buildViewQuery(
    "vw_pending_applications",
    "pending_applications"
  );

  const delayedSql = buildViewQuery(
    "vw_delayed_applications",
    "delayed_applications"
  );

 const approvedPercentageSql = `
  SELECT ROUND(AVG(approved_percentage), 2) AS approved_percentage
  FROM vw_withintime_perc
  WHERE 1 = 1
  ${commonFilters}
`;

  const todayAppSql = buildViewQuery(
    "vw_todays_applications",
    "todays_applications" );

  const todayApprovedSql = buildViewQuery(
    "vw_todays_approved",
    "todays_approved" );

  const binds = {
    fromDate: fromDate || null,
    toDate: toDate || null,
    serviceName: serviceName || null,
    wardName: wardName || null,
    officerName: officerName || null,
    status: status || null,
  };

 const totalAppResult = await executeQuery(totalAppSql, binds);
const approvedResult = await executeQuery(approvedSql, binds);
const pendingResult = await executeQuery(pendingSql, binds);
const delayedResult = await executeQuery(delayedSql, binds);
const approvedPercentageResult = await executeQuery(approvedPercentageSql, binds);
const todayAppResult = await executeQuery(todayAppSql, binds);
const todayApprovedResult = await executeQuery(todayApprovedSql, binds);

  return {
    total_applications: totalAppResult.rows || [],
    approved_applications: approvedResult.rows || [],
    pending_applications: pendingResult.rows || [],
    delayed_applications: delayedResult.rows || [],
    approved_percentage:approvedPercentageResult.rows?.[0]?.APPROVED_PERCENTAGE || 0,
    todays_applications:
      todayAppResult.rows?.[0]?.TODAYS_APPLICATIONS || 0,
    todays_approved:
      todayApprovedResult.rows?.[0]?.TODAYS_APPROVED || 0,
  };
}

// Deptwise applications view
async function repoDeptWiseApplications(
  fromDate,
  toDate,
  serviceName,
  wardName,
  officerName,
  status
) {
  const sql = `
    SELECT
      officer_name,
      servnm,
      prabhag_nm,
      app_date,
      status,
      var_dept_engname,
      total_applications,
      approved_applications,
      pending_applications,
      approved_percentage
    FROM vw_deptwise_applications
    WHERE 1 = 1
      AND (:fromDate IS NULL OR app_date >= TO_DATE(:fromDate,'DD-MON-YYYY'))
      AND (:toDate IS NULL OR app_date <= TO_DATE(:toDate,'DD-MON-YYYY'))
      AND (:serviceName IS NULL OR servnm = :serviceName)
      AND (:wardName IS NULL OR prabhag_nm = :wardName)
      AND (:officerName IS NULL OR officer_name = :officerName)
      AND (:status IS NULL OR status = :status)
    ORDER BY total_applications DESC
  `;
  const binds = {
    fromDate: fromDate || null,
    toDate: toDate || null,
    serviceName: serviceName || null,
    wardName: wardName || null,
    officerName: officerName || null,
    status: status || null,
  };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

// TAT wise pending applications
async function repoTatWisePending(
  fromDate,
  toDate,
  serviceName,
  wardName,
  officerName,
  status
) {
  const sql = `SELECT
    days_bucket,
    SUM(pending_applications) AS pending_count,
    ROUND(
        SUM(pending_applications) * 100 /
        SUM(SUM(pending_applications)) OVER (),
        2
    ) AS percentage
FROM vw_tatwise_pending
WHERE 1 = 1
  AND (:fromDate IS NULL OR app_date >= TO_DATE(:fromDate,'DD-MON-YYYY'))
  AND (:toDate IS NULL OR app_date <= TO_DATE(:toDate,'DD-MON-YYYY'))
  AND (:serviceName IS NULL OR servnm = :serviceName)
  AND (:wardName IS NULL OR prabhag_nm = :wardName)
  AND (:officerName IS NULL OR officer_name = :officerName)
  AND (:status IS NULL OR status = :status)
GROUP BY days_bucket
ORDER BY
  CASE days_bucket
    WHEN '0 - 3' THEN 1
    WHEN '4 - 7' THEN 2
    WHEN '8 - 15' THEN 3
    WHEN '15+' THEN 4
  END`;

  const binds = {
    fromDate: fromDate || null,
    toDate: toDate || null,
    serviceName: serviceName || null,
    wardName: wardName || null,
    officerName: officerName || null,
    status: status || null,
  };

  const result = await executeQuery(sql, binds);

  const totalPending = result.rows.reduce(
    (sum, row) => sum + Number(row.PENDING_COUNT || 0),
    0
  );

  return {
    totalPending,
    buckets: result.rows,
  };
}

// Monthwise application trend
async function repoMonthwiseApplicationTrend(
  fromDate,
  toDate,
  serviceName,
  wardName,
  officerName,
  status
) {
  const sql = `
    SELECT
      months,
      SUM(received_applications) AS received_applications,
      SUM(approved_applications) AS approved_applications
    FROM vw_monthwiseapplication_trend
    WHERE 1 = 1
      AND (:fromDate IS NULL OR app_date >= TO_DATE(:fromDate,'DD-MON-YYYY'))
      AND (:toDate IS NULL OR app_date <= TO_DATE(:toDate,'DD-MON-YYYY'))
      AND (:serviceName IS NULL OR servnm = :serviceName)
      AND (:wardName IS NULL OR prabhag_nm = :wardName)
      AND (:officerName IS NULL OR officer_name = :officerName)
      AND (:status IS NULL OR status = :status)
    GROUP BY months
    ORDER BY MIN(app_date)
  `;

  const binds = {
    fromDate: fromDate || null,
    toDate: toDate || null,
    serviceName: serviceName || null,
    wardName: wardName || null,
    officerName: officerName || null,
    status: status || null,
  };

  const result = await executeQuery(sql, binds);

  return result.rows || [];
}

// Application Status Summary - Approved vs Pending
async function repoApplicationStatusSummary(
  fromDate,
  toDate,
  serviceName,
  wardName,
  officerName,
  status
) {
  const commonFilters = `
    AND (:fromDate IS NULL OR app_date >= TO_DATE(:fromDate,'DD-MON-YYYY'))
    AND (:toDate IS NULL OR app_date <= TO_DATE(:toDate,'DD-MON-YYYY'))
    AND (:serviceName IS NULL OR servnm = :serviceName)
    AND (:wardName IS NULL OR prabhag_nm = :wardName)
    AND (:officerName IS NULL OR officer_name = :officerName)
    AND (:status IS NULL OR status = :status)
  `;

  const approvedSql = `
    SELECT ROUND(AVG(approved_percentage), 2) AS approved_percentage
    FROM vw_withintime_perc
    WHERE 1 = 1
    ${commonFilters}
  `;

  const resolvedPendingSql = `
    SELECT
      SUM(approved_applications) AS approved_applications,
      SUM(pending_applications) AS pending_applications
    FROM vw_resolvedpending_applications
    WHERE 1 = 1
    ${commonFilters}
  `;

  const binds = {
    fromDate: fromDate || null,
    toDate: toDate || null,
    serviceName: serviceName || null,
    wardName: wardName || null,
    officerName: officerName || null,
    status: status || null,
  };

  const [approvedResult, resolvedPendingResult] = await Promise.all([
    executeQuery(approvedSql, binds),
    executeQuery(resolvedPendingSql, binds),
  ]);

  return {
    approved_percentage:
      approvedResult.rows?.[0]?.APPROVED_PERCENTAGE || 0,

    resolved_pending: {
      approved_applications:
        resolvedPendingResult.rows?.[0]?.APPROVED_APPLICATIONS || 0,

      pending_applications:
        resolvedPendingResult.rows?.[0]?.PENDING_APPLICATIONS || 0,
    },
  };
}

// Detailed Application Status Summary
async function repoDetailedApplicationStatus(
  fromDate,
  toDate,
  serviceName,
  wardName,
  officerName,
  status
) {
  const sql = `
    SELECT
      SUM(approved_applications) AS approved_applications,
      SUM(pending_applications) AS pending_applications,
      SUM(reject_applications) AS reject_applications
    FROM vw_statuswise_application
    WHERE 1 = 1
      AND (:fromDate IS NULL OR app_date >= TO_DATE(:fromDate,'DD-MON-YYYY'))
      AND (:toDate IS NULL OR app_date <= TO_DATE(:toDate,'DD-MON-YYYY'))
      AND (:serviceName IS NULL OR servnm = :serviceName)
      AND (:wardName IS NULL OR prabhag_nm = :wardName)
      AND (:officerName IS NULL OR officer_name = :officerName)
      AND (:status IS NULL OR status = :status)
  `;

  const binds = {
    fromDate: fromDate || null,
    toDate: toDate || null,
    serviceName: serviceName || null,
    wardName: wardName || null,
    officerName: officerName || null,
    status: status || null,
  };

  const result = await executeQuery(sql, binds);

  return result.rows?.[0] || {
    APPROVED_APPLICATIONS: 0,
    PENDING_APPLICATIONS: 0,
    REJECT_APPLICATIONS: 0,
  };
}

// Top Services
async function repoTopServices(
  fromDate,
  toDate,
  serviceName,
  wardName,
  officerName,
  status
) {
  const sql = `
    SELECT
      rank_no,
      servnm,
      SUM(approved_applications) AS approved_applications
    FROM vw_top_services
    WHERE 1 = 1
      AND (:fromDate IS NULL OR app_date >= TO_DATE(:fromDate,'DD-MON-YYYY'))
      AND (:toDate IS NULL OR app_date <= TO_DATE(:toDate,'DD-MON-YYYY'))
      AND (:serviceName IS NULL OR servnm = :serviceName)
      AND (:wardName IS NULL OR prabhag_nm = :wardName)
      AND (:officerName IS NULL OR officer_name = :officerName)
      AND (:status IS NULL OR status = :status)
    GROUP BY rank_no, servnm
    ORDER BY rank_no
  `;
  const binds = {
    fromDate: fromDate || null,
    toDate: toDate || null,
    serviceName: serviceName || null,
    wardName: wardName || null,
    officerName: officerName || null,
    status: status || null,
  };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

// Service-wise Top Delay
async function repoServicewiseTopDelay(
  fromDate,
  toDate,
  serviceName,
  wardName,
  officerName,
  status
) {
  const sql = `
    SELECT
      officer_name,
      servnm,
      prabhag_nm,
      app_date,
      status,
      delayed_applications,
      avg_delay_days
    FROM vw_servicewisetop_delay
    WHERE 1 = 1
      AND (:fromDate IS NULL OR app_date >= TO_DATE(:fromDate,'DD-MON-YYYY'))
      AND (:toDate IS NULL OR app_date <= TO_DATE(:toDate,'DD-MON-YYYY'))
      AND (:serviceName IS NULL OR servnm = :serviceName)
      AND (:wardName IS NULL OR prabhag_nm = :wardName)
      AND (:officerName IS NULL OR officer_name = :officerName)
      AND (:status IS NULL OR status = :status)
    ORDER BY delayed_applications DESC, avg_delay_days DESC
  `;

  const binds = {
    fromDate: fromDate || null,
    toDate: toDate || null,
    serviceName: serviceName || null,
    wardName: wardName || null,
    officerName: officerName || null,
    status: status || null,
  };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function repoPrabhagwiseApplications(
  fromDate,
  toDate,
  serviceName,
  wardName,
  officerName,
  status
) {
  const sql = `
    SELECT
      officer_name,
      servnm,
      prabhag_nm,
      app_date,
      status,
      total_applications,
      approved_applications,
      pending_applications,
      applications_greater15,
      approved_percentage,
      rank
    FROM vw_prbhagwise_applications
    WHERE 1 = 1
      AND (:fromDate IS NULL OR app_date >= TO_DATE(:fromDate,'DD-MON-YYYY'))
      AND (:toDate IS NULL OR app_date <= TO_DATE(:toDate,'DD-MON-YYYY'))
      AND (:serviceName IS NULL OR servnm = :serviceName)
      AND (:wardName IS NULL OR prabhag_nm = :wardName)
      AND (:officerName IS NULL OR officer_name = :officerName)
      AND (:status IS NULL OR status = :status)
    ORDER BY rank
  `;
  const binds = {
    fromDate: fromDate || null,
    toDate: toDate || null,
    serviceName: serviceName || null,
    wardName: wardName || null,
    officerName: officerName || null,
    status: status || null,
  };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function repoCommissionerSummary(
  fromDate,
  toDate,
  serviceName,
  wardName,
  officerName,
  status
) {
  const sql = `
    SELECT
      officer_name,
      servnm,
      prabhag_nm,
      app_date,
      status,
      total_applications,
      approved_applications,
      pending_applications,
      applications_greater15,
      approved_percentage
    FROM vw_commissioner_summary
    WHERE 1 = 1
      AND (:fromDate IS NULL OR app_date >= TO_DATE(:fromDate,'DD-MON-YYYY'))
      AND (:toDate IS NULL OR app_date <= TO_DATE(:toDate,'DD-MON-YYYY'))
      AND (:serviceName IS NULL OR servnm = :serviceName)
      AND (:wardName IS NULL OR prabhag_nm = :wardName)
      AND (:officerName IS NULL OR officer_name = :officerName)
      AND (:status IS NULL OR status = :status)
  `;
  const binds = {
    fromDate: fromDate || null,
    toDate: toDate || null,
    serviceName: serviceName || null,
    wardName: wardName || null,
    officerName: officerName || null,
    status: status || null,
  };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function repoAlerts(ulbId) {
  const pendingSql = `
    SELECT
      CASE
        WHEN TRUNC(SYSDATE) - TRUNC(a.dat_application_insdate) BETWEEN 4 AND 15
          THEN '4-15 days'
        WHEN TRUNC(SYSDATE) - TRUNC(a.dat_application_insdate) > 15
          THEN '15+ days'
      END AS days_bucket,
      COUNT(a.var_application_appno) AS pending_applications
    FROM aorts_application_det a
    INNER JOIN aorts_applicant_infodet infodet
      ON infodet.var_appl_appno = a.var_application_appno
     AND infodet.num_appl_serviceid = a.num_application_serviceid
     AND infodet.num_appl_ulbid = a.num_application_ulbid
    WHERE a.var_application_status IN ('CP', 'IP', 'VP', 'PP')
      AND a.num_application_ulbid = :ulbId
      AND TRUNC(SYSDATE) - TRUNC(a.dat_application_insdate) >= 4
    GROUP BY
      CASE
        WHEN TRUNC(SYSDATE) - TRUNC(a.dat_application_insdate) BETWEEN 4 AND 15
          THEN '4-15 days'
        WHEN TRUNC(SYSDATE) - TRUNC(a.dat_application_insdate) > 15
          THEN '15+ days'
      END
  `;

  const approvedSql = `
    SELECT COUNT(var_application_appno) AS approved_applications
    FROM aorts_application_det a
    INNER JOIN aorts_applicant_infodet infodet
      ON infodet.var_appl_appno = a.var_application_appno
     AND infodet.num_appl_serviceid = a.num_application_serviceid
     AND infodet.num_appl_ulbid = a.num_application_ulbid
    WHERE var_application_status IN ('NW','AP','DL')
      AND a.num_application_ulbid = :ulbId
  `;
  const pendingResult = await executeQuery(pendingSql, { ulbId });
  const approvedResult = await executeQuery(approvedSql, { ulbId });
  return {
    pendingBuckets: pendingResult.rows || [],
    approvedApplications: approvedResult.rows?.[0]?.APPROVED_APPLICATIONS || 0,
  };
}

async function repoComplaintStatus() {
  const sql = `SELECT
    (pending_complaints + resolved_complaints) AS total_complaints,
    pending_complaints,
    resolved_complaints,
    NVL(
        ROUND(
            resolved_complaints * 100 /
            NULLIF(pending_complaints + resolved_complaints, 0),
            2
        ),
        0
    ) AS resolved_percentage
FROM vw_complaints_status`;
  const result = await executeQuery(sql, {});
  return result.rows || [];
}

async function repoRTSComplaints() {
  const sql = `select count(*) as RTS_complaints From aorts_appeal_mas`;
  const result = await executeQuery(sql, {});
  return result.rows || [];
}

async function repoOfficerWork(
  fromDate,
  toDate,
  serviceName,
  wardName,
  officerName,
  status
) {
  const sql = `
    SELECT
      officer_name,
      servnm,
      prabhag_nm,
      app_date,
      status,
      total_applications,
      approved_applications,
      pending_applications,
      delayed_applications
    FROM vw_officerwise_works
    WHERE 1 = 1
      AND (:fromDate IS NULL OR app_date >= TO_DATE(:fromDate,'DD-MON-YYYY'))
      AND (:toDate IS NULL OR app_date <= TO_DATE(:toDate,'DD-MON-YYYY'))
      AND (:serviceName IS NULL OR servnm = :serviceName)
      AND (:wardName IS NULL OR prabhag_nm = :wardName)
      AND (:officerName IS NULL OR officer_name = :officerName)
      AND (:status IS NULL OR status = :status)
    ORDER BY total_applications DESC
    FETCH FIRST 10 ROWS ONLY
  `;
  const binds = {
    fromDate: fromDate || null,
    toDate: toDate || null,
    serviceName: serviceName || null,
    wardName: wardName || null,
    officerName: officerName || null,
    status: status || null,
  };
  const result = await executeQuery(sql, binds);
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
  repoServicewiseTopDelay,
  repoPrabhagwiseApplications,
  repoCommissionerSummary,
  repoAlerts,
  repoComplaintStatus,
  repoRTSComplaints,
  repoOfficerWork,
};
