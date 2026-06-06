const { executeQuery } = require('../../db/queryExecutor');

// Get services by ULB
async function repoGetServices(ulbId = 1670) {
  const sql = `
    SELECT num_service_serviceid, var_service_eng_name 
    FROM aorts_service_def sd
    LEFT JOIN aorts_service_config sc
      ON sc.num_serv_servid = sd.num_service_serviceid
      AND sc.num_serv_deptid = sd.num_service_deptid
    WHERE sc.num_serv_ulbid = :ulbId
  `;
  return executeQuery(sql, { ulbId });
}





// Get wards by ULB
async function repoGetWards(ulbId = 1670) {
  const sql = `
    SELECT DISTINCT wardname, wardid
    FROM prop.vw_ward_mas
    INNER JOIN aorts_application_det
      ON wardid = num_application_zoneid
    WHERE num_application_ulbid = :ulbId
  `;
  return executeQuery(sql, { ulbId });
}

// Get users by ULB
async function repoGetUsers(ulbId = 1670) {
  const sql = `
    SELECT DISTINCT var_user_username
    FROM aorts_application_det a
    INNER JOIN admins.aoms_dept_mas d ON d.num_dept_id = a.num_application_deptid
    INNER JOIN admins.aoma_user_def u ON d.num_dept_id = u.num_user_deptid
    WHERE u.num_user_ulbid = :ulbId
  `;
  return executeQuery(sql, { ulbId });
}

async function repoStatusDropdown(ulbId) {
  const sql = `select distinct
(CASE WHEN var_application_status IN ('NW','AP','DL') THEN 'approved' 
         when var_application_status IN ('CP','IP','VP','PP','PS','PV') then 'Pending' 
         when var_application_status IN ('CR','DN') then 'Reject' end) as status 
from aorts_application_det where num_application_ulbid = :ulbId`;
  const result = await executeQuery(sql,{ulbId });
  return result.rows || [];
}


module.exports = {repoStatusDropdown,repoGetServices,repoGetWards,repoGetUsers}
