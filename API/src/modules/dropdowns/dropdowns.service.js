const {repoStatusDropdown} = require('./dropdowns.repo');





async function serviceStatusDropdown(ulbId) {
  return repoStatusDropdown(ulbId);
}



module.exports = {serviceStatusDropdown}