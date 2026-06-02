import React from 'react';
import { commissionerSummary } from '../data/dummyData';

export default function CommissionerSummary() {
  return (
    <div className="card">
      <h3 className="card-title">Commissioner Summary</h3>
      <div className="summary-list">
        {commissionerSummary.map((it, i) => (
          <div className="summary-item" key={i}>
            <span className="label">• {it.label}</span>
            <span className="value">{it.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
