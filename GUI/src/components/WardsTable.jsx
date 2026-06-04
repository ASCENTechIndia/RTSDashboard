import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";
import DataTable from "./DataTable";

const WardsTable = ({ filters }) => {
  const { setLoader } = useLoader();
  const [error, setError] = useState(null);
  const [wardsData, setWardsData] = useState([]);

  useEffect(() => {
    const fetchWardsData = async () => {
      setLoader(true);
      try {
        const params = new URLSearchParams();
        if (filters.fromDate) params.append("fromDate", filters.fromDate);
        if (filters.toDate) params.append("toDate", filters.toDate);
        if (filters.ward) params.append("wardName", filters.ward);
        if (filters.status) params.append("status", filters.status);
        if (filters.type) params.append("serviceName", filters.type);
        if (filters.officer) params.append("officerName", filters.officer);

        const queryString = params.toString();
        const endpoint = `/rts-dashboard/deptWiseApplications${queryString ? `?${queryString}` : ""}`;

        const response = await apiClient.get(endpoint);
        if (response.success && Array.isArray(response.data)) {
          const data = response.data.map((item) => ({
            WARDNAME: item.PRABHAG_NM,
            TOTAL_APPLICATIONS: item.TOTAL_APPLICATIONS,
            APPROVED_APPLICATIONS: item.APPROVED_APPLICATIONS,
            PENDING_APPLICATIONS: item.PENDING_APPLICATIONS,
            APPROVED_PERCENTAGE: item.APPROVED_PERCENTAGE,
          }));
          setWardsData(data);
        } else {
          setWardsData([]);
        }
      } catch (err) {
        setWardsData([]);
        console.error(err);
        setError(err.message);
      } finally {
        setLoader(false);
      }
    };

    fetchWardsData();
  }, [filters]);

  if (error) return <div className="card">Error: {error}</div>;

  const headers = [
    { label: "प्रभाग", align: "left" },
    { label: "प्राप्त", align: "right" },
    { label: "निकाली", align: "right" },
    { label: "प्रलंबित", align: "right" },
    { label: "वेळेत (%)", align: "right" },
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
        प्रभागनिहाय कामगिरी
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
