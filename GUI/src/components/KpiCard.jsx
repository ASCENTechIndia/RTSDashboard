import React from 'react';

const icons = {
  doc: '📄', check: '✓', clock: '⌛', alert: 'L', target: '◎',
  badge: 'E6', file: 'E7', gear: '⚙'
};

export default function KpiCard({ icon, label, value, color }) {
  return (
    <div className="kpi" style={{ '--kpi-color': color }}>
      <div className="kpi-top">
        <div className="icon" style={{ background: color }}>{icons[icon] || '•'}</div>
        <span className="label">{label}</span>
      </div>
      <span className="value">{value}</span>
      <span className="view-link">View Details ›</span>
    </div>
  );
}
