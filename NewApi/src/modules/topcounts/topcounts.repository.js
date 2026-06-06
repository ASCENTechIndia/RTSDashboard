const { executeQuery } = require("../../db/queryExecutor");

async function repoGetTopCounts(
  ulbId,
  username,
  serviceId,
  wardId,
  fromDate,
  toDate,status
) {
  let sql = `
    SELECT 
      COUNT(a.var_application_appno) AS total_applications
    FROM aorts_application_det a
    INNER JOIN aorts_applicant_infodet infodet 
      ON infodet.var_appl_appno = a.var_application_appno
      AND infodet.num_appl_serviceid = a.num_application_serviceid
      AND infodet.num_appl_ulbid = a.num_application_ulbid
    INNER JOIN aorts_service_def sd
      ON sd.num_service_serviceid = a.num_application_serviceid
    LEFT JOIN aorts_service_config sc
      ON sc.num_serv_servid = sd.num_service_serviceid
      AND sc.num_serv_deptid = sd.num_service_deptid
      AND sc.num_serv_ulbid = a.num_application_ulbid
    INNER JOIN admins.aoms_dept_mas d 
      ON d.num_dept_id = a.num_application_deptid
    INNER JOIN admins.aoma_user_def u 
      ON d.num_dept_id = u.num_user_deptid
    INNER JOIN prop.vw_ward_mas w
      ON w.wardid = a.num_application_zoneid
    WHERE 1=1
  `;

  const binds = {};

  if (ulbId != null) {
    sql += ` AND a.num_application_ulbid = :ulbId`;
    binds.ulbId = ulbId;
  }

  if (username) {
    sql += ` AND u.var_user_username = :username`;
    binds.username = username;
  }

  if (serviceId != null) {
    sql += ` AND sd.num_service_serviceid = :serviceId`;
    binds.serviceId = serviceId;
  }

  if (wardId != null) {
    sql += ` AND w.wardid = :wardId`;
    binds.wardId = wardId;
  }

  if (fromDate) {
    sql += ` AND TRUNC(a.dat_application_insdate) >= TO_DATE(:fromDate, 'DD-MON-YYYY')`;
    binds.fromDate = fromDate;
  }

  if (toDate) {
    sql += ` AND TRUNC(a.dat_application_insdate) <= TO_DATE(:toDate, 'DD-MON-YYYY')`;
    binds.toDate = toDate;
  }

  if (status) {
   sql += `
    AND (
      CASE 
        WHEN a.var_application_status IN ('NW', 'AP', 'DL') THEN 'Approved'
        WHEN a.var_application_status IN ('CP', 'IP', 'VP', 'PP', 'PS', 'PV') THEN 'Pending'
        WHEN a.var_application_status IN ('CR', 'DN') THEN 'Reject'
      END
    ) = :status
  `;
    binds.status = String(status);
  }

  const result = await executeQuery(sql, binds);

  return {
    total_applications: result.rows?.[0]?.TOTAL_APPLICATIONS || 0,
  };
}

// Approved applications count
async function repoGetApprovedCounts(
  ulbId,
  username,
  serviceId,
  wardId,
  fromDate,
  toDate
) {
  let sql = `
    SELECT 
      COUNT(a.var_application_appno) AS approved_applications
    FROM aorts_application_det a
    INNER JOIN aorts_applicant_infodet infodet 
      ON infodet.var_appl_appno = a.var_application_appno
      AND infodet.num_appl_serviceid = a.num_application_serviceid
      AND infodet.num_appl_ulbid = a.num_application_ulbid
    INNER JOIN aorts_service_def sd
      ON sd.num_service_serviceid = a.num_application_serviceid
    LEFT JOIN aorts_service_config sc
      ON sc.num_serv_servid = sd.num_service_serviceid
      AND sc.num_serv_deptid = sd.num_service_deptid
      AND sc.num_serv_ulbid = a.num_application_ulbid
    INNER JOIN admins.aoms_dept_mas d 
      ON d.num_dept_id = a.num_application_deptid
    INNER JOIN admins.aoma_user_def u 
      ON d.num_dept_id = u.num_user_deptid
    INNER JOIN prop.vw_ward_mas w
      ON w.wardid = a.num_application_zoneid
    WHERE a.var_application_status IN ('NW', 'AP', 'DL')
  `;

  const binds = {};

  if (ulbId != null) {
    sql += ` AND a.num_application_ulbid = :ulbId`;
    binds.ulbId = ulbId;
  }

  if (username) {
    sql += ` AND u.var_user_username = :username`;
    binds.username = username;
  }

  if (serviceId != null) {
    sql += ` AND sd.num_service_serviceid = :serviceId`;
    binds.serviceId = serviceId;
  }

  if (wardId != null) {
    sql += ` AND w.wardid = :wardId`;
    binds.wardId = wardId;
  }

  if (fromDate) {
    sql += ` AND TRUNC(a.dat_application_insdate) >= TO_DATE(:fromDate, 'DD-MON-YYYY')`;
    binds.fromDate = fromDate;
  }

  if (toDate) {
    sql += ` AND TRUNC(a.dat_application_insdate) <= TO_DATE(:toDate, 'DD-MON-YYYY')`;
    binds.toDate = toDate;
  }

  const result = await executeQuery(sql, binds);

  return {
    approved_applications: result.rows?.[0]?.APPROVED_APPLICATIONS || 0,
  };
}

// Pending applications count
async function repoGetPendingCounts(
  ulbId,
  username,
  serviceId,
  wardId,
  fromDate,
  toDate
) {
  let sql = `
    SELECT 
      COUNT(a.var_application_appno) AS pending_applications
    FROM aorts_application_det a
    INNER JOIN aorts_applicant_infodet infodet 
      ON infodet.var_appl_appno = a.var_application_appno
      AND infodet.num_appl_serviceid = a.num_application_serviceid
      AND infodet.num_appl_ulbid = a.num_application_ulbid
    INNER JOIN aorts_service_def sd
      ON sd.num_service_serviceid = a.num_application_serviceid
    LEFT JOIN aorts_service_config sc
      ON sc.num_serv_servid = sd.num_service_serviceid
      AND sc.num_serv_deptid = sd.num_service_deptid
      AND sc.num_serv_ulbid = a.num_application_ulbid
    INNER JOIN admins.aoms_dept_mas d 
      ON d.num_dept_id = a.num_application_deptid
    INNER JOIN admins.aoma_user_def u 
      ON d.num_dept_id = u.num_user_deptid
    INNER JOIN prop.vw_ward_mas w
      ON w.wardid = a.num_application_zoneid
    WHERE a.var_application_status IN ('CP', 'IP', 'VP', 'PP', 'PS', 'PV')
  `;

  const binds = {};

  if (ulbId != null) {
    sql += ` AND a.num_application_ulbid = :ulbId`;
    binds.ulbId = ulbId;
  }

  if (username) {
    sql += ` AND u.var_user_username = :username`;
    binds.username = username;
  }

  if (serviceId != null) {
    sql += ` AND sd.num_service_serviceid = :serviceId`;
    binds.serviceId = serviceId;
  }

  if (wardId != null) {
    sql += ` AND w.wardid = :wardId`;
    binds.wardId = wardId;
  }

  if (fromDate) {
    sql += ` AND TRUNC(a.dat_application_insdate) >= TO_DATE(:fromDate, 'DD-MON-YYYY')`;
    binds.fromDate = fromDate;
  }

  if (toDate) {
    sql += ` AND TRUNC(a.dat_application_insdate) <= TO_DATE(:toDate, 'DD-MON-YYYY')`;
    binds.toDate = toDate;
  }

  const result = await executeQuery(sql, binds);

  return {
    pending_applications: result.rows?.[0]?.PENDING_APPLICATIONS || 0,
  };
}

module.exports = {
  repoGetTopCounts,
  repoGetApprovedCounts,
  repoGetPendingCounts,
};
