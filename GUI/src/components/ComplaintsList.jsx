import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export default function ComplaintsList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaintItems, setComplaintItems] = useState([]);

  useEffect(() => {
    const fetchComplaintStatus = async () => {
      try {
        const response = await apiClient.get(
          "/rts-dashboard/getComplaintStatus",
        );
        if (response.success && response.data?.length > 0) {
          const data = response.data[0];
          const items = [
            {
              icon: "👥",
              label: "प्राप्त तक्रारी",
              value: data.TOTAL_COMPLAINTS || "",
              color: "#2f7be3",
            },
            {
              icon: "✓",
              label: "निवारण झाल्या",
              value: data.RESOLVED_COMPLAINTS || "",
              color: "#22a06b",
            },
            {
              icon: "⏱",
              label: "प्रलंबित तक्रारी",
              value: data.PENDING_COMPLAINTS || "",
              color: "#ee8f1a",
            },
            {
              icon: "✓",
              label: "निवारण टक्केवारी (%)",
              value: `${data.RESOLVED_PERCENTAGE || ""}%`,
              color: "#0ea5a5",
            },
          ];
          setComplaintItems(items);
        } else {
          throw new Error(
            response.message || "Failed to load complaint status",
          );
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintStatus();
  }, []);

  if (loading) return <div className="card">Loading complaint status...</div>;
  if (error) return <div className="card">Error: {error}</div>;

  return (
    <div className="card">
      <h3 className="card-title">नागरिक तक्रार स्थिती</h3>
      <div className="summary-list">
        {complaintItems.map((it, i) => (
          <div className="summary-item" key={i}>
            <span className="label">
              <span className="bullet" style={{ background: it.color }}>
                {it.icon}
              </span>
              {it.label}
            </span>
            <span className="value">
              {typeof it.value === "number"
                ? it.value.toLocaleString("en-IN")
                : it.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
