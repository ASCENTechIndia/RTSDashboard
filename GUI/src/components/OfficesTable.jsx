import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import DataTable from "./DataTable";

const OfficesTable = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [officersData, setOfficersData] = useState([]);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await apiClient.get("/rts-dashboard/getOfficerWork");
        if (response.success && Array.isArray(response.data)) {
          const data = response.data.map((item) => ({
            OFFICER_NAME: item.OFFICER_NAME,
            TOTAL_APPLICATIONS: item.TOTAL_APPLICATIONS,
            APPROVED_APPLICATIONS: item.APPROVED_APPLICATIONS,
            PENDING_APPLICATIONS: item.PENDING_APPLICATIONS,
            DELAYED_APPLICATIONS: item.DELAYED_APPLICATIONS,
          }));

          setOfficersData(data); 
        } else {
          throw new Error(response.message || "Invalid data format");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficers();
  }, []);

  if (loading) return <div className="card">Loading officers data...</div>;
  if (error) return <div className="card">Error: {error}</div>;

  const headers = [
    { label: "अधिकारी नाव", align: "left" },
    { label: "नियुक्त", align: "right" },
    { label: "निकाली", align: "right" },
    { label: "प्रलंबित", align: "right" },
    { label: "विलंबित", align: "right" },
  ];

  const keyMapping = {
    "अधिकारी नाव": "OFFICER_NAME",
    नियुक्त: "TOTAL_APPLICATIONS",
    निकाली: "APPROVED_APPLICATIONS",
    प्रलंबित: "PENDING_APPLICATIONS",
    विलंबित: "DELAYED_APPLICATIONS",
  };

  return (
    <div className="card">
      <h3 className="card-title">
        अधिकारी कामगिरी
        <span className="view">View All Officers ›</span>
      </h3>
      <DataTable
        headers={headers}
        data={officersData}
        keyMapping={keyMapping}
        rowLimit={7}
      />
    </div>
  );
};

export default OfficesTable;
