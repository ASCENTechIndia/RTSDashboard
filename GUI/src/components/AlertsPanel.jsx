import React from "react";
import { Bell, AlertCircle, Clock, FileX, CheckCircle } from "lucide-react";

const data = [
  {
    type: "danger",
    Icon: AlertCircle,
    title: "गंभीर (15+ दिवस)",
    subtitle: "15 दिवसांपेक्षा जास्त प्रलंबित अर्ज",
    value: "252",
  },
  {
    type: "warn",
    Icon: Clock,
    title: "कालमर्यादा संपत आलेले (4-15 दिवस)",
    subtitle: "लवकर कार्यवाही अपेक्षित",
    value: "3,143",
  },
  {
    type: "info",
    Icon: FileX,
    title: "अपूर्ण कागदपत्रे",
    subtitle: "नागरिकांकडून कागदपत्रे प्रलंबित",
    value: "1,028",
  },
  {
    type: "success",
    Icon: CheckCircle,
    title: "वेळेत पूर्ण झालेल्या सेवा",
    subtitle: "यशस्वीरित्या पूर्ण सेवा",
    value: "40,215",
  },
];

const colorMap = {
  danger: { bg: "#fee2e2", color: "#ef4444" },
  warn: { bg: "#ffedd5", color: "#f97316" },
  info: { bg: "#fef9c3", color: "#eab308" },
  success: { bg: "#dcfce7", color: "#16a34a" },
};

export default function AlertsPanel() {
  return (
    <div className="card">
      <h3 className="card-title">
        <Bell
          size={14}
          strokeWidth={2}
          style={{ marginRight: 4, verticalAlign: "middle" }}
        />
        सूचना / Alerts
      </h3>
      <div className="alerts-list">
        {data.map((a, i) => {
          const { bg, color } = colorMap[a.type];
          return (
            <div className="alert-row" key={i}>
              <div className="alert-num" style={{ background: bg, color }}>
                <a.Icon size={14} strokeWidth={2} />
              </div>
              <div className="alert-body">
                <div className="alert-title" style={{ color }}>
                  {a.title}
                </div>
                <div className="alert-subtitle">{a.subtitle}</div>
              </div>
              <div className="alert-right">
                <div className="alert-value" style={{ color }}>
                  {a.value}
                </div>
                <div className="alert-link">View Details</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
