import React from 'react';

const items = [
  { icon: '👥', label: 'प्राप्त तक्रारी',          value: '186',     color: '#2f7be3' },
  { icon: '✓',  label: 'निवारण झाल्या',         value: '146',     color: '#22a06b' },
  { icon: '⏱', label: 'प्रलंबित तक्रारी',        value: '40',      color: '#ee8f1a' },
  // { icon: '⚠', label: 'विलंबित प्रकरणे एकूण',   value: '40,215',  color: '#e23b3b' },
  { icon: '%',  label: 'निवारण टक्केवारी (%)',          value: '78.49%',  color: '#0ea5a5' }
];

export default function ComplaintsList() {
  return (
    <div className="card">
      <h3 className="card-title">नागरिक तक्रार स्थिती</h3>
      <div className="summary-list">
        {items.map((it, i) => (
          <div className="summary-item" key={i}>
            <span className="label">
              <span className="bullet" style={{ background: it.color }}>{it.icon}</span>
              {it.label}
            </span>
            <span className="value">{it.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
