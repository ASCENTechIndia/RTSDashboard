import React from 'react';

export default function Navbar() {
  const today = new Date();

  const currentDate = today.toLocaleDateString("mr-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentTime = today.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });


  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 0 = Jan
  const day = today.getDay();

  const monthsName = [
    "",
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ]

  const financialYear =
    month >= 3
      ? `${year}-${String(year + 1).slice(-2)}`
      : `${year - 1}-${String(year).slice(-2)}`;


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
            <span className="pill-label">दिनांक व वेळ</span>
            <span className="pill-value">{day} {monthsName[month]} {year} <span className="sub">{currentTime}</span></span>
          </div>
        </div>
        <div className="pill">
          <span className="pill-icon">📅</span>
          <div className="pill-body">
            <span className="pill-label">आर्थिक वर्ष</span>
            <span className="pill-value">{financialYear}</span>
          </div>
        </div>
        <div className="pill">
          <span className="pill-icon">⏱</span>
          <div className="pill-body">
            <span className="pill-label">Last Updated</span>
            <span className="pill-value">{day}/{month}/{year} {currentTime} <span className="sub">(Every 15 Min)</span></span>
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
