const { executeQuery } = require('../../db/queryExecutor');

// Get services by ULB
async function repoGetServices(ulbId = 1670) {
  const sql = `
    SELECT num_service_serviceid,case when var_serv_dispname is null then var_service_mar_name else var_serv_dispname end as var_service_eng_name 
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
   select num_ward_id as wardid,var_ward_name as wardname from prop.aoms_ward_mas where num_ward_ulbid=:ulbId and var_ward_activeflag='Y'
order by num_ward_orderby
  `;
  return executeQuery(sql, { ulbId });
}

// Get users by ULB
async function repoGetUsers(ulbId = 1670) {
  const sql = `
    select var_ward_officername as var_user_username from prop.aoms_ward_mas where num_ward_ulbid=:ulbId and var_ward_activeflag='Y'
order by num_ward_orderby 
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
