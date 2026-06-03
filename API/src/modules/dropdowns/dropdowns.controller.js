const { serviceGetServices } = require('./dropdowns.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

async function getServices(req, res, next) {
  try {
    const ulbId = req.query.ulbid || 4;
    const data = await serviceGetServices(ulbId);
    logApiSuccess(req, 200, { count: data?.length || 0 }, 'Services Report completed');
    auditLog({
      action: 'GET_SERVICES',
      actor: req.user?.userId ,
      module: 'dropdowns',
      status: 'SUCCESS',
      details: { ulbId },
      requestMeta: requestMeta(req),
    });
    return res.ok(data);
  } catch (error) {
    logApiError(req, 500, error.message, 'Services Report error');
    return next(error);
  }
}

module.exports = {
  getServices
}