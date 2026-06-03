const { executeQuery } = require('../../db/queryExecutor');

// Get services by ULB
async function repoGetServices(ulbId = 4) {
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





async function repoStatusDropdown(ulbId) {
  const sql = `select distinct
(CASE WHEN var_application_status IN ('NW','AP','DL') THEN 'approved' 
         when var_application_status IN ('CP','IP','VP','PP','PS','PV') then 'Pending' 
         when var_application_status IN ('CR','DN') then 'Reject' end) as status 
from aorts_application_det where num_application_ulbid = :ulbId`;
  const result = await executeQuery(sql,{ulbId });
  return result.rows || [];
}


module.exports = {repoStatusDropdown,repoGetServices}
