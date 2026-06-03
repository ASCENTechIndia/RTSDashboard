import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import DataTable from "./DataTable";

const WardsTable = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wardsData, setWardsData] = useState([]);

  useEffect(() => {
    const fetchWardsData = async () => {
      try {
        const response = await apiClient.get(
          "/rts-dashboard/getPrabhagwiseApplications",
        );
        if (response.success && Array.isArray(response.data)) {
          const sorted = [...response.data].sort(
            (a, b) => b.TOTAL_APPLICATIONS - a.TOTAL_APPLICATIONS,
          );
          const top10 = sorted.slice(0, 10);
          setWardsData(top10);
        } else {
          alert("Data not available");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWardsData();
  }, []);

  if (loading) return <div className="card">Loading प्रभाग data...</div>;
  if (error) return <div className="card">Error: {error}</div>;

  const headers = [
    { label: "प्रभाग", align: "left" },
    { label: "प्राप्त" },
    { label: "निकाली" },
    { label: "प्रलंबित" },
    { label: "वेळेत (%)" },
  ];

  const keyMapping = {
    प्रभाग: "WARDNAME",
    प्राप्त: "TOTAL_APPLICATIONS",
    निकाली: "APPROVED_APPLICATIONS",
    प्रलंबित: "PENDING_APPLICATIONS",
    "वेळेत (%)": "APPROVED_PERCENTAGE",
  };

  return (
    <div className="card">
      <h3 className="card-title">
        प्रभागनिहाय कामगिरी (Top 10)
        <span className="view">View All Prabhag ›</span>
      </h3>
      <DataTable
        headers={headers}
        data={wardsData}
        keyMapping={keyMapping}
        rowLimit={7}
      />
    </div>
  );
};

export default WardsTable;
