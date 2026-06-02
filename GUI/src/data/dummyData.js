// Centralized dummy data. Replace these exports with API calls later.

export const kpiCards = [
  { id: 'total',     icon: 'doc',    label: 'एकूण प्राप्त अर्ज',  value: '48,752', color: '#2f7be3' },
  { id: 'disposed',  icon: 'check',  label: 'निकाली अर्ज',         value: '40,215', color: '#22a06b' },
  { id: 'pending',   icon: 'clock',  label: 'प्रलंबित अर्ज',       value: '8,537',  color: '#ee8f1a' },
  { id: 'delayed',   icon: 'alert',  label: 'विलंबित प्रकरणे',     value: '2,184',  color: '#e23b3b' },
  { id: 'ontime',    icon: 'target', label: 'वेळेत निकाली (%)',    value: '82.43%', color: '#16a34a' },
  { id: 'e6',        icon: 'badge',  label: 'अप्रा प्राप्त अर्ज',   value: '324',    color: '#f0a020' },
  { id: 'e7',        icon: 'file',   label: 'अपील प्रकरणे',         value: '276',    color: '#7c3aed' },
  { id: 'rts',       icon: 'gear',   label: 'RTS नोंदणी',           value: '186',    color: '#0ea5a5' }
];

export const departmentRows = [
  { dept: 'जन्म-मृत्यू नोंदणी विभाग',  received: 12856, disposed: 10981, pending: 1875, ontime: 85.40, icon: 'bookopen'       },
  { dept: 'मालमत्ता कर विभाग',          received: 6784,  disposed: 6276,  pending: 508,  ontime: 92.51, icon: 'landmark'       },
  { dept: 'परवानगी विभाग',              received: 5642,  disposed: 4931,  pending: 711,  ontime: 87.40, icon: 'clipboardcheck' },
  { dept: 'आरोग्य / स्वच्छता विभाग',    received: 7935,  disposed: 5842,  pending: 2093, ontime: 73.63, icon: 'heartpulse'     },
  { dept: 'पाणीपुरवठा विभाग',           received: 3926,  disposed: 3396,  pending: 530,  ontime: 86.49, icon: 'droplets'       },
  { dept: 'इतर सेवा विभाग',             received: 11609, disposed: 8789,  pending: 2820, ontime: 75.72, icon: 'layoutgrid'     },
  { dept: 'एकूण',                      received: 48752, disposed: 40215, pending: 8537, ontime: 82.43, icon: '', isTotal: true },
];
export const monthlyTrend = [
  { month: 'जाने 2025', received: 6800, disposed: 5600 },
  { month: 'फेब्रु 2025', received: 6500, disposed: 5400 },
  { month: 'मार्च 2025', received: 7200, disposed: 6100 },
  { month: 'एप्रिल 2025', received: 7400, disposed: 6500 },
  { month: 'मे 2025',     received: 7800, disposed: 6800 },
  { month: 'जून 2025',    received: 7500, disposed: 6400 },
  { month: 'जुलै 2025',   received: 7700, disposed: 6600 },
  { month: 'ऑगस्ट 2025',  received: 8000, disposed: 7000 },
  { month: 'सप्टें 2025', received: 7900, disposed: 6900 }
];

export const tatDistribution = [
  { name: '0 - 3 दिवस',  value: 32145, color: '#22a06b', pct: '65.89%' },
  { name: '4 - 7 दिवस',  value: 9254,  color: '#f4b400', pct: '18.98%' },
  { name: '8 - 15 दिवस', value: 1987,  color: '#ee8f1a', pct: '23.26%' },
  { name: '15+ दिवस',    value: 1156,  color: '#e23b3b', pct: '13.54%' },
  { name: 'अंतिम',       value: 252,   color: '#7c3aed', pct: '2.95%' }
];

export const statusWise = [
  { name: 'मंजूर',           value: 5142,  color: '#22a06b', pct: '60.23%' },
  { name: 'प्रलंबित गट',     value: 1842,  color: '#f4b400', pct: '21.57%' },
  { name: 'परत',             value: 1187,  color: '#ee8f1a', pct: '13.90%' },
  { name: 'नाकारलेले अर्ज',  value: 366,   color: '#e23b3b', pct: '4.30%' }
];

export const onTime = { onTimePct: 82.43, delayedPct: 17.57 };

export const topServices = [
  { name: 'मालमत्ता कर NOC',          value: 9842 },
  { name: 'जन्म दाखला',                value: 6384 },
  { name: 'मृत्यू दाखला',              value: 5933 },
  { name: 'नळ जोडणी',                  value: 4366 },
  { name: 'बांधकाम परवानगी',           value: 3401 },
  { name: 'पाणी कनेक्शन / NOC',        value: 2876 },
  { name: 'व्यवसाय परवाना',            value: 2154 }
];

export const delayedServices = [
  { service: 'बांधकाम परवानगी',     received: 982,  delayed: 211 },
  { service: 'मालमत्ता कर NOC',     received: 587,  delayed: 18.7 + 169 - 169 + 169 }, // 187 ~ display 18.7
  { service: 'पाणी / जोडणी NOC',    received: 356,  delayed: 17.2 + 105 - 105 + 105 },
  { service: 'व्यवसाय परवाना',      received: 184,  delayed: 96 },
  { service: 'आरोग्य परवाना',       received: 96,   delayed: 22.8 + 50 - 50 + 50 }
];

// Cleaner delayed services (overriding the above messy calc)
export const delayedServicesClean = [
  { service: 'बांधकाम परवानगी',     received: 982,  delayed: 211, delayedPct: 21.4 },
  { service: 'मालमत्ता कर NOC',     received: 587,  delayed: 110, delayedPct: 18.7 },
  { service: 'पाणी / जोडणी NOC',    received: 356,  delayed: 61,  delayedPct: 17.2 },
  { service: 'व्यवसाय परवाना',      received: 184,  delayed: 36,  delayedPct: 19.6 },
  { service: 'आरोग्य परवाना',       received: 96,   delayed: 22,  delayedPct: 22.8 }
];

export const officesTop10 = [
  { office: 'कार्यालय 1', received: 6214, disposed: 5276, pending: 938, ontime: 84.90 },
  { office: 'कार्यालय 2', received: 5982, disposed: 5121, pending: 861, ontime: 85.60 },
  { office: 'कार्यालय 3', received: 5648, disposed: 4823, pending: 825, ontime: 85.39 },
  { office: 'कार्यालय 4', received: 5324, disposed: 4472, pending: 852, ontime: 83.99 },
  { office: 'कार्यालय 5', received: 4987, disposed: 4182, pending: 805, ontime: 83.88 }
];

export const wardsTop10 = [
  { ward: 'प्रभाग क्र. 6', received: 6214, disposed: 5276, pending: 938, ontime: 84.90 },
  { ward: 'प्रभाग क्र. 4', received: 5982, disposed: 5121, pending: 861, ontime: 85.60 },
  { ward: 'प्रभाग क्र. 3', received: 5648, disposed: 4823, pending: 825, ontime: 85.39 },
  { ward: 'प्रभाग क्र. 1', received: 5324, disposed: 4472, pending: 852, ontime: 83.99 },
  { ward: 'प्रभाग क्र. 2', received: 4987, disposed: 4182, pending: 805, ontime: 83.88 }
];

export const complaintStatus = [
  { label: 'एकूण तक्रारी',   value: 186, color: '#2f7be3' },
  { label: 'निकाली तक्रारी', value: 146, color: '#22a06b' },
  { label: 'प्रलंबित तक्रारी', value: 40, color: '#ee8f1a' },
  { label: 'विलंबित प्रकरणे', value: 40215, isLarge: true, color: '#0ea5a5' }
];

export const commissionerSummary = [
  { label: 'एकूण प्राप्त अर्ज',         value: '48,752' },
  { label: 'निकाली अर्ज',               value: '40,215' },
  { label: 'प्रलंबित अर्ज',             value: '8,537' },
  { label: 'विलंबित प्रकरणे (15+ दिवस)', value: '2,184' },
  { label: 'वेळेत निकाली (%)',          value: '82.43%' }
];

export const alerts = [
  { type: 'danger', text: '15 विभागात लक्ष ठेवणे आवश्यक' },
  { type: 'info',   text: 'मालमत्ता कर NOC मध्ये 3,143 प्रलंबित' },
  { type: 'warn',   text: 'अनुक्रमे सर्वाधिक प्रलंबित अर्ज: 1,026' }
];
