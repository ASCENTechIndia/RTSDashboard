import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";

export default function CommissionerSummary({ filters }) {
  const { setLoader } = useLoader();
  const ULBID = import.meta.env.VITE_ULBID;
  const [error, setError] = useState(null);
  const [summaryItems, setSummaryItems] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoader(true);
      try {
        const params = new URLSearchParams();
        if (ULBID) params.append("ulbId", ULBID);
        if (filters.fromDate) params.append("fromDate", filters.fromDate);
        if (filters.toDate) params.append("toDate", filters.toDate);
        if (filters.type) params.append("serviceId", filters.type);
        if (filters.officer) params.append("username", filters.officer);
        if (filters.department) params.append("wardId", filters.department);
        if (filters.status) params.append("status", filters.status);
        if (filters.ward) params.append("prabhagId", filters.ward);
        const queryString = params.toString();
        const endpoint = `/rts-dashboard/getCommissionerSummary${queryString ? `?${queryString.replaceAll("+", " ")}` : ""}`;
        const response = await apiClient.get(endpoint);
        if (response.success && response.data?.length > 0) {
          const data = response.data[0];
          const items = [
            { label: "एकूण प्राप्त अर्ज", value: data.TOTAL_APPLICATIONS ?? 0 },
            { label: "निकाली अर्ज", value: data.APPROVED_APPLICATIONS ?? 0 },
            { label: "प्रलंबित अर्ज", value: data.PENDING_APPLICATIONS ?? 0 },
            {
              label: "वेळेत निकाली (%)",
              value: `${data.APPROVED_PERCENTAGE ?? 0}%`,
            },
            {
              label: "विलंबित प्रकरणे (15+ दिवस)",
              value: data.APPLICATIONS_GREATER15 ?? 0 ,
            },
          ];
          setSummaryItems(items);
        } else {
          setSummaryItems([]);
        }
      } catch (err) {
        setSummaryItems([]);
        console.error(err);
        setError(err.message);
      } finally {
        setLoader(false);
      }
    };

    fetchSummary();
  }, [filters]);

  if (error) return <div className="card">Error: {error}</div>;

  return (
    <div className="card">
      <h3 className="card-title">आयुक्त सारांश</h3>
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
