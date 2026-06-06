import React, { useState, useEffect } from "react";
import { Bell, AlertCircle, Clock, FileX, CheckCircle } from "lucide-react";
import apiClient from "../services/apiClient";

const colorMap = {
  danger: { bg: "#fee2e2", color: "#ef4444" },
  warn: { bg: "#ffedd5", color: "#f97316" },
  info: { bg: "#fef9c3", color: "#eab308" },
  success: { bg: "#dcfce7", color: "#16a34a" },
};

export default function AlertsPanel() {
  const [loading, setLoading] = useState(true);
  const ULBID = import.meta.env.VITE_ULBID
  const [error, setError] = useState(null);
  const [alertsData, setAlertsData] = useState({
    critical: 0,     
    warning: 0,      
    approved: 0,     
  });

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await apiClient.get(`/rts-dashboard/getAlerts?ulbId=${ULBID}`);
        console.log("res ", response)
        if (response.success && response.data) {
          const pendingBuckets = response.data.pendingBuckets || [];
          const approved = response.data.approvedApplications || 0;

          let critical = 0;
          let warning = 0;
          pendingBuckets.forEach((bucket) => {
            if (bucket.DAYS_BUCKET === "15+ days") {
              critical = bucket.APPLICATIONS_COUNT || 0;
            } else if (bucket.DAYS_BUCKET === "4-15 days") {
              warning = bucket.APPLICATIONS_COUNT || 0;
            }
          });

          setAlertsData({ critical, warning, approved });
        } else {
          throw new Error(response.message || "Invalid data");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) return <div className="card">Loading alerts...</div>;
  if (error) return <div className="card">Error: {error}</div>;

  const alertItems = [
    {
      type: "danger",
      Icon: AlertCircle,
      title: "गंभीर (15+ दिवस)",
      subtitle: "15 दिवसांपेक्षा जास्त प्रलंबित अर्ज",
      value: alertsData.critical.toLocaleString("en-IN"),
    },
    {
      type: "warn",
      Icon: Clock,
      title: "कालमर्यादा संपत आलेले (4-15 दिवस)",
      subtitle: "लवकर कार्यवाही अपेक्षित",
      value: alertsData.warning.toLocaleString("en-IN"),
    },
    {
      type: "success",
      Icon: CheckCircle,
      title: "वेळेत पूर्ण झालेल्या सेवा",
      subtitle: "यशस्वीरित्या पूर्ण सेवा",
      value: alertsData.approved.toLocaleString("en-IN"),
    },
  ];

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
        {alertItems.map((a, i) => {
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