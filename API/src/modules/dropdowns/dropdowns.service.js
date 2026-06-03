const { repoGetServices } = require('./dropdowns.repo');

// Get services by ULB
async function serviceGetServices(ulbId) {
  return repoGetServices(ulbId);
}

module.exports = {
  serviceGetServices
};