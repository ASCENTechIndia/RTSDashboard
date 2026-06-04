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

async function serviceDeptWiseApplications( filters = {}) {
  return repoDeptWiseApplications( filters.fromDate,
    filters.toDate,
    filters.serviceName,
    filters.wardName,
    filters.officerName,
    filters.status);
}

async function serviceTatWisePending( filters = {}) {
  return repoTatWisePending( filters.fromDate,
    filters.toDate,
    filters.serviceName,
    filters.wardName,
    filters.officerName,
    filters.status);
}

async function serviceMonthwiseApplicationTrend(filters = {}) {
  return repoMonthwiseApplicationTrend( filters.fromDate,
    filters.toDate,
    filters.serviceName,
    filters.wardName,
    filters.officerName,
    filters.status);
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

async function serviceTopServices(filters = {}) {
  return repoTopServices(
    filters.fromDate,
    filters.toDate,
    filters.serviceName,
    filters.wardName,
    filters.officerName,
    filters.status
  );
}

async function serviceServicewiseTopDelay(filters = {}) {
  return repoServicewiseTopDelay(
    filters.fromDate,
    filters.toDate,
    filters.serviceName,
    filters.wardName,
    filters.officerName,
    filters.status
  );
}

async function servicePrabhagwiseApplications(filters = {}) {
  return repoPrabhagwiseApplications(
    filters.fromDate,
    filters.toDate,
    filters.serviceName,
    filters.wardName,
    filters.officerName,
    filters.status
  );
}

async function serviceCommissionerSummary(filters = {}) {
  return repoCommissionerSummary(
    filters.fromDate,
    filters.toDate,
    filters.serviceName,
    filters.wardName,
    filters.officerName,
    filters.status
  );
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

async function serviceOfficerWork(filters = {}){
  return repoOfficerWork(
    filters.fromDate,
    filters.toDate,
    filters.serviceName,
    filters.wardName,
    filters.officerName,
    filters.status
  );
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
