const {
  serviceGetTopCounts,
} = require('./topcounts.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

async function getTopCounts(req, res, next) {
  try {
    const ulbId = req.query.ulbId ||  null;
    const filters = {
      ulbId: ulbId ? parseInt(ulbId) : null,
      username: req.query.username || null,
      serviceId: req.query.serviceId ? parseInt(req.query.serviceId) : null,
      wardId: req.query.wardId ? parseInt(req.query.wardId) : null,
      fromDate: req.query.fromDate || null,
      toDate: req.query.toDate || null,
      status: req.query.status || null,
    };

    const data = await serviceGetTopCounts(filters);

    logApiSuccess(req, 200, data, 'Total Applications Count Report completed');
    auditLog({
      action: 'TOP_COUNTS_APPLICATIONS',
      actor: req.user?.userId || 'system',
      module: 'topcounts',
      status: 'SUCCESS',
      details: { filters, result: data },
      requestMeta: requestMeta(req),
    });

    return res.ok(data);
  } catch (error) {
    logApiError(req, 500, error.message, 'Total Applications Count Report error');
    return next(error);
  }
}

module.exports = {
  getTopCounts,
};
