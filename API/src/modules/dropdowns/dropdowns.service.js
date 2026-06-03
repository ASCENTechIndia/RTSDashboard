const { repoGetServices ,repoStatusDropdown} = require('./dropdowns.repo');

// Get services by ULB
async function serviceGetServices(ulbId) {
  return repoGetServices(ulbId);
}



async function serviceStatusDropdown(ulbId) {
  return repoStatusDropdown(ulbId);
}



module.exports = {serviceStatusDropdown,serviceGetServices}
