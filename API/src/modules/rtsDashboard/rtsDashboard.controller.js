const {
  serviceCounts,
  serviceDeptWiseApplications,
  serviceTatWisePending,
  serviceMonthwiseApplicationTrend
} = require('./rtsDashboard.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

async function getCounts(req, res, next) {
  try {
    const ulbId = req.query.ulbid || req.user?.ulbId;
    const data = await serviceCounts(ulbId);
    logApiSuccess(req, 200, data, 'Dashboard Counts Report completed');
    auditLog({
      action: 'DASHBOARD_COUNTS',
      actor: req.user?.userId || 'system',
      module: 'rtsDashboard',
      status: 'SUCCESS',
      details: { ulbId },
      requestMeta: requestMeta(req),
    });
    return res.ok(data);
  } catch (error) {
    logApiError(req, 500, error.message, 'Dashboard Counts Report error');
    return next(error);
  }
}

async function getDeptWiseApplications(req, res, next) {
  try {
    const ulbId = req.query.ulbid || req.user?.ulbId;
    const rows = await serviceDeptWiseApplications(ulbId);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, 'Department-wise Applications Report completed');
    auditLog({
      action: 'DEPT_WISE_APPLICATIONS',
      actor: req.user?.userId || 'system',
      module: 'rtsDashboard',
      status: 'SUCCESS',
      details: { ulbId, count: rows?.length || 0 },
      requestMeta: requestMeta(req),
    });
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Department-wise Applications Report error');
    return next(error);
  }
}

async function getTatWisePending(req, res, next) {
  try {
    const ulbId = req.query.ulbid || req.user?.ulbId;
    const rows = await serviceTatWisePending(ulbId);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, 'TAT-wise Pending Applications Report completed');
    auditLog({
      action: 'TAT_WISE_PENDING',
      actor: req.user?.userId || 'system',
      module: 'rtsDashboard',
      status: 'SUCCESS',
      details: { ulbId, count: rows?.length || 0 },
      requestMeta: requestMeta(req),
    });
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'TAT-wise Pending Applications Report error');
    return next(error);
  }
}

async function getMonthwiseApplicationTrend(req, res, next) {
  try {
    const ulbId = req.query.ulbid || req.user?.ulbId;
    const rows = await serviceMonthwiseApplicationTrend(ulbId);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, 'Monthwise Application Trend Report completed');
    auditLog({
      action: 'MONTHWISE_APPLICATION_TREND',
      actor: req.user?.userId || 'system',
      module: 'rtsDashboard',
      status: 'SUCCESS',
      details: { ulbId, count: rows?.length || 0 },
      requestMeta: requestMeta(req),
    });
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Monthwise Application Trend Report error');
    return next(error);
  }
}

module.exports = {
  getCounts,
  getDeptWiseApplications,
  getTatWisePending,
  getMonthwiseApplicationTrend
};
