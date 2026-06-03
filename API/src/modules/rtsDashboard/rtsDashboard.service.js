const {
  repoCounts,
  repoDeptWiseApplications,
  repoTatWisePending,
  repoMonthwiseApplicationTrend,
  repoApplicationStatusSummary,
  repoDetailedApplicationStatus,
  repoTopServices,
  repoServicewiseTopDelay, repoPrabhagwiseApplications, repoCommissionerSummary
} = require('./rtsDashboard.repository');

async function serviceCounts(ulbId) {
  return repoCounts(ulbId);
}

async function serviceDeptWiseApplications(ulbId) {
  return repoDeptWiseApplications(ulbId);
}

async function serviceTatWisePending(ulbId) {
  return repoTatWisePending(ulbId);
}

async function serviceMonthwiseApplicationTrend(ulbId) {
  return repoMonthwiseApplicationTrend(ulbId);
}

async function serviceApplicationStatusSummary(ulbId) {
  return repoApplicationStatusSummary(ulbId);
}

async function serviceDetailedApplicationStatus(ulbId) {
  return repoDetailedApplicationStatus(ulbId);
}

async function serviceTopServices(ulbId) {
  return repoTopServices(ulbId);
}

async function serviceServicewiseTopDelay(ulbId) {
  return repoServicewiseTopDelay(ulbId);
}

async function servicePrabhagwiseApplications(){
  return repoPrabhagwiseApplications();
}

async function serviceCommissionerSummary(){
  return repoCommissionerSummary();
}

module.exports = {
  serviceCounts,
  serviceDeptWiseApplications,
  serviceTatWisePending,
  serviceMonthwiseApplicationTrend,
  serviceApplicationStatusSummary,
  serviceDetailedApplicationStatus,
  serviceTopServices,
  serviceServicewiseTopDelay,
  servicePrabhagwiseApplications, serviceCommissionerSummary
};
