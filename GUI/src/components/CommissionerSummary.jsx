import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export default function CommissionerSummary() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryItems, setSummaryItems] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await apiClient.get(
          "/rts-dashboard/getCommissionerSummary",
        );
        if (response.success && response.data?.length > 0) {
          const data = response.data[0];
          const items = [
            { label: "एकूण प्राप्त अर्ज", value: data.TOTAL_APPLICATIONS },
            { label: "निकाली अर्ज", value: data.APPROVED_APPLICATIONS },
            { label: "प्रलंबित अर्ज", value: data.PENDING_APPLICATIONS },
            {
              label: "विलंबित प्रकरणे (15+ दिवस)",
              value: data.APPLICATIONS_GREATER15,
            },
            {
              label: "वेळेत निकाली (%)",
              value: `${data.APPROVED_PERCENTAGE}%`,
            },
          ];
          setSummaryItems(items);
        } else {
          throw new Error(response.message || "Failed to load summary");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <div className="card">Loading summary...</div>;
  if (error) return <div className="card">Error: {error}</div>;

  return (
    <div className="card">
      <h3 className="card-title">Commissioner Summary</h3>
      <div className="summary-list">
        {summaryItems.map((item, idx) => (
          <div className="summary-item" key={idx}>
            <span className="label">• {item.label}</span>
            <span className="value">{item.value?.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
