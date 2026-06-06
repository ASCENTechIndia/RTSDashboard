const {
  repoGetTopCounts,
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

module.exports = {
  serviceGetTopCounts,
};
