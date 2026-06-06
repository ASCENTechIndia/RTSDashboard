const {
  repoGetTopCounts,
  repoGetApprovedCounts,
  repoGetPendingCounts,
  repoGetDelayedCounts,
} = require('./topcounts.repository');

async function serviceGetTopCounts(filters = {}) {
  return repoGetTopCounts(
    filters.ulbId,
    filters.username,
    filters.serviceId,
    filters.wardId,
    filters.fromDate,
    filters.toDate,
    filters.status
  );
}

async function serviceGetApprovedCounts(filters = {}) {
  return repoGetApprovedCounts(
    filters.ulbId,
    filters.username,
    filters.serviceId,
    filters.wardId,
    filters.fromDate,
    filters.toDate
  );
}

async function serviceGetPendingCounts(filters = {}) {
  return repoGetPendingCounts(
    filters.ulbId,
    filters.username,
    filters.serviceId,
    filters.wardId,
    filters.fromDate,
    filters.toDate
  );
}

async function serviceGetDelayedCounts(filters = {}) {
  return repoGetDelayedCounts(
    filters.ulbId,
    filters.username,
    filters.serviceId,
    filters.wardId,
    filters.fromDate,
    filters.toDate
  );
}

module.exports = {
  serviceGetTopCounts,
  serviceGetApprovedCounts,
  serviceGetPendingCounts,
  serviceGetDelayedCounts,
};
