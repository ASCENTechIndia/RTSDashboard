const {
  serviceCounts,
  serviceDeptWiseApplications,
  serviceTatWisePending,
  serviceMonthwiseApplicationTrend,
  serviceApplicationStatusSummary,
  serviceDetailedApplicationStatus,
  serviceTopServices,
  serviceServicewiseTopDelay,
  servicePrabhagwiseApplications, serviceCommissionerSummary, serviceAlerts
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

async function getApplicationStatusSummary(req, res, next) {
  try {
    const ulbId = req.query.ulbid || req.user?.ulbId;
    const data = await serviceApplicationStatusSummary(ulbId);
    logApiSuccess(req, 200, data, 'Application Status Summary Report completed');
    auditLog({
      action: 'APPLICATION_STATUS_SUMMARY',
      actor: req.user?.userId || 'system',
      module: 'rtsDashboard',
      status: 'SUCCESS',
      details: { ulbId },
      requestMeta: requestMeta(req),
    });
    return res.ok(data);
  } catch (error) {
    logApiError(req, 500, error.message, 'Application Status Summary Report error');
    return next(error);
  }
}

async function getDetailedApplicationStatus(req, res, next) {
  try {
    const ulbId = req.query.ulbid || req.user?.ulbId;
    const data = await serviceDetailedApplicationStatus(ulbId);
    logApiSuccess(req, 200, data, 'Detailed Application Status Report completed');
    auditLog({
      action: 'DETAILED_APPLICATION_STATUS',
      actor: req.user?.userId || 'system',
      module: 'rtsDashboard',
      status: 'SUCCESS',
      details: { ulbId },
      requestMeta: requestMeta(req),
    });
    return res.ok(data);
  } catch (error) {
    logApiError(req, 500, error.message, 'Detailed Application Status Report error');
    return next(error);
  }
}

async function getTopServices(req, res, next) {
  try {
    const ulbId = req.query.ulbid || req.user?.ulbId;
    const rows = await serviceTopServices(ulbId);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, 'Top Services Report completed');
    auditLog({
      action: 'TOP_SERVICES',
      actor: req.user?.userId || 'system',
      module: 'rtsDashboard',
      status: 'SUCCESS',
      details: { ulbId, count: rows?.length || 0 },
      requestMeta: requestMeta(req),
    });
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Top Services Report error');
    return next(error);
  }
}

async function getServicewiseTopDelay(req, res, next) {
  try {
    const ulbId = req.query.ulbid || req.user?.ulbId;
    const rows = await serviceServicewiseTopDelay(ulbId);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, 'Service-wise Top Delay Report completed');
    auditLog({
      action: 'SERVICEWISE_TOP_DELAY',
      actor: req.user?.userId || 'system',
      module: 'rtsDashboard',
      status: 'SUCCESS',
      details: { ulbId, count: rows?.length || 0 },
      requestMeta: requestMeta(req),
    });
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Service-wise Top Delay Report error');
    return next(error);
  }
}

async function getPrabhagwiseApplications(req, res, next) {
  try {
    const rows = await servicePrabhagwiseApplications();
    logApiSuccess(req, 200, { count: rows?.length || 0 }, 'Prabhagwise applications completed');
    auditLog({
      action: 'PRABHAGWISE_APPLICATIONS',
      actor: req.user?.userId || 'system',
      module: 'rtsDashboard',
      status: 'SUCCESS',
      details: {  count: rows?.length || 0 },
      requestMeta: requestMeta(req),
    });
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Prabhagwise applications error');
    return next(error);
  }
}

async function getCommissionerSummary(req, res, next) {
  try {
    const rows = await serviceCommissionerSummary();
    logApiSuccess(req, 200, { count: rows?.length || 0 }, 'Commissioner summary completed');
    auditLog({
      action: 'COMMISSIONER_SUMMARY',
      actor: req.user?.userId || 'system',
      module: 'rtsDashboard',
      status: 'SUCCESS',
      details: {  count: rows?.length || 0 },
      requestMeta: requestMeta(req),
    });
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Commissioner summary error');
    return next(error);
  }
}

async function getAlerts(req, res, next) {
   try {
    const ulbId = req.query.ulbId || req.user?.ulbId;
    const rows = await serviceAlerts(ulbId);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, 'Alerts fetched');
    auditLog({
      action: 'ALERTS',
      actor: req.user?.userId || 'system',
      module: 'rtsDashboard',
      status: 'SUCCESS',
      details: { ulbId, count: rows?.length || 0 },
      requestMeta: requestMeta(req),
    });
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Alerts error');
    return next(error);
  }
}

module.exports = {
  getCounts,
  getDeptWiseApplications,
  getTatWisePending,
  getMonthwiseApplicationTrend,
  getApplicationStatusSummary,
  getDetailedApplicationStatus,
  getTopServices,
  getServicewiseTopDelay,
  getPrabhagwiseApplications, getCommissionerSummary, getAlerts
};
