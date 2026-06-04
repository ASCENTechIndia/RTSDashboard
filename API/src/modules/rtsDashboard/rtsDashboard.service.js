const {
  repoCounts,
  repoDeptWiseApplications,
  repoTatWisePending,
  repoMonthwiseApplicationTrend,
  repoApplicationStatusSummary,
  repoDetailedApplicationStatus,
  repoTopServices,
  repoServicewiseTopDelay, repoPrabhagwiseApplications, repoCommissionerSummary, repoAlerts,
  repoComplaintStatus, repoRTSComplaints, repoOfficerWork
} = require('./rtsDashboard.repository');

async function serviceCounts(ulbId, filters = {}) {
  return repoCounts(
    ulbId,
    filters.fromDate,
    filters.toDate,
    filters.deptName,
    filters.serviceName,
    filters.wardName,
    filters.officerName,
    filters.status
  );
}

async function serviceDeptWiseApplications(ulbId) {
  return repoDeptWiseApplications(ulbId);
}

async function serviceTatWisePending( filters = {}) {
  return repoTatWisePending( filters.fromDate,
    filters.toDate,
    filters.serviceName,
    filters.wardName,
    filters.officerName,
    filters.status);
}

async function serviceMonthwiseApplicationTrend(ulbId) {
  return repoMonthwiseApplicationTrend(ulbId);
}

async function serviceApplicationStatusSummary(ulbId) {
  return repoApplicationStatusSummary(ulbId);
}

async function serviceDetailedApplicationStatus(filters = {}) {
  return repoDetailedApplicationStatus(
    filters.fromDate,
    filters.toDate,
    filters.serviceName,
    filters.wardName,
    filters.officerName,
    filters.status
  );
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

async function serviceAlerts(ulbId){
  return repoAlerts(ulbId);
}

async function serviceComplaintStatus(){
  return repoComplaintStatus();
}

async function serviceRTSComplaints(){
  return repoRTSComplaints();
}

async function serviceOfficerWork(){
  return repoOfficerWork();
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
  servicePrabhagwiseApplications, serviceCommissionerSummary, serviceAlerts,
  serviceComplaintStatus, serviceRTSComplaints, serviceOfficerWork
};
