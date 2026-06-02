const {
  repoCounts,
  repoDeptWiseApplications,
  repoTatWisePending,
  repoMonthwiseApplicationTrend
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

module.exports = {
  serviceCounts,
  serviceDeptWiseApplications,
  serviceTatWisePending,
  serviceMonthwiseApplicationTrend
};
