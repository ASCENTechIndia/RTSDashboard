import React from 'react';

const menu = [
  { icon: '🏠', label: 'Dashboard', active: true },
  { icon: '📋', label: 'RTS अर्ज स्थिती' },
  { icon: '🏢', label: 'विभागनिहाय कामगिरी' },
  { icon: '🗺', label: 'प्रभागनिहाय कामगिरी' },
  { icon: '👤', label: 'अधिकारी कामगिरी' },
  { icon: '⚙', label: 'सेवा प्रकार' },
  { icon: '⏱', label: 'TAT विश्लेषण' },
  { icon: '🔔', label: 'Alerts / सूचना' },
  { icon: '📊', label: 'Reports' },
  { icon: '⬇', label: 'Download Center' },
  { icon: '⚙', label: 'Settings' },
  { icon: '❔', label: 'Help & Support' },
  { icon: '⎋', label: 'Logout' }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="side-menu">
        {menu.map((m, i) => (
          <a key={i} className={`side-item ${m.active ? 'active' : ''}`}>
            <span className="side-icon">{m.icon}</span>
            <span className="side-label">{m.label}</span>
          </a>
        ))}
      </nav>
      <div className="side-bottom">
        <div className="side-illus">🏛</div>
        <div className="side-motto">स्वच्छ धुळे<br />सुंदर धुळे</div>
      </div>
    </aside>
  );
}
