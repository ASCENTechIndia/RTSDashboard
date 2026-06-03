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

module.exports = {
  repoGetServices
};