const { executeQuery } = require('../../db/queryExecutor');

// Supported ULB IDs
const ALLOWED_ULB_IDS = [1670, 1610, 1750, 1710];

// Get services by ULB
async function repoGetServices(ulbId, deptId) {
  const sql = `
    select num_service_serviceid,
case when var_serv_dispname is null then var_service_mar_name else var_serv_dispname end as var_service_eng_name
from  aorts_service_def 
inner join aorts_service_config on  num_serv_servid=num_service_serviceid
where var_service_active='Y' and num_serv_ulbid= :ulbId and num_service_deptid= :deptId 
  `;
  return executeQuery(sql, { ulbId, deptId});
}



// Get wards by ULB
async function repoGetWards(ulbId) {
  const sql = `select distinct deptid as wardid,dept_marname as wardname from prop.vw_deptconfig
inner join aorts_service_def on num_service_deptid=deptid and var_service_active='Y'
inner join aorts_service_config on num_serv_ulbid=ulbid and num_serv_servid=num_service_serviceid
where ulbid=:ulbId`;
  return executeQuery(sql, { ulbId });
}

// Get wards by ULB ID with detailed information
async function repoGetWardsByUlbId(ulbId) {
  console.log('Fetching wards for ULB ID:', ulbId);
  const sql = `select num_ward_id, var_ward_name from prop.aoms_ward_mas where num_ward_ulbid=:ulbId and var_ward_activeflag='Y' order by num_ward_orderby`;
  return executeQuery(sql, { ulbId:Number(ulbId) });
}

// Get users by ULB
async function repoGetUsers(ulbId) {
  const sql = `
    SELECT DISTINCT u.VAR_USER_USERNAME
    FROM admins.aoma_user_def u
    INNER JOIN admins.aoms_dept_mas d ON d.num_dept_id = u.num_user_deptid
    INNER JOIN aorts_service_def sd ON sd.num_service_deptid = d.num_dept_id AND sd.var_service_active = 'Y'
    INNER JOIN aorts_service_config sc ON sc.num_serv_servid = sd.num_service_serviceid AND sc.num_serv_ulbid = :ulbId
    WHERE u.num_user_ulbid = :ulbId
      AND u.VAR_USER_USERNAME IS NOT NULL
    ORDER BY u.VAR_USER_USERNAME
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


module.exports = { ALLOWED_ULB_IDS, repoStatusDropdown, repoGetServices, repoGetWards, repoGetWardsByUlbId, repoGetUsers };
