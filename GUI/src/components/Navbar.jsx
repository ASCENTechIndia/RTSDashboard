import React from 'react';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="logo">धुळे महानगरपालिका</div>
        <div className="logo-sub">RTS (Right to Services) Monitoring Dashboard</div>
      </div>
      <div className="navbar-right">
        <div className="pill">
          <span className="pill-icon">📅</span>
          <div className="pill-body">
            <span className="pill-label">एकूण दि व वेळ</span>
            <span className="pill-value">25 मे 2025 <span className="sub">11:30 AM</span></span>
          </div>
        </div>
        <div className="pill">
          <span className="pill-icon">📅</span>
          <div className="pill-body">
            <span className="pill-label">अहवाल वर्ष</span>
            <span className="pill-value">2024-25</span>
          </div>
        </div>
        <div className="pill">
          <span className="pill-icon">⏱</span>
          <div className="pill-body">
            <span className="pill-label">Last Updated</span>
            <span className="pill-value">25/05/2025 11:25 AM <span className="sub">(Every 15 Min)</span></span>
          </div>
        </div>
        <div className="user">
          <div className="user-avatar">👤</div>
          <div className="user-meta">
            <div className="user-role">आयुक्त / प्रशासक</div>
            <div className="user-name">Dhule Mahanagarpalika</div>
          </div>
          <span className="user-caret">▾</span>
        </div>
      </div>
    </div>
  );
}
