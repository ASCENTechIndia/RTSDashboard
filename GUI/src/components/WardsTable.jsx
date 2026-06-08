import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";
import DataTable from "./DataTable";

const WardsTable = ({ filters }) => {
  const { setLoader } = useLoader();
  const ULBID = import.meta.env.VITE_ULBID;
  const [error, setError] = useState(null);
  const [wardsData, setWardsData] = useState([]);

  useEffect(() => {
    const fetchWardsData = async () => {
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
          // if (filters.ward) params.append("prabhagId", filters.ward);
        const queryString = params.toString();
        const endpoint = `/rts-dashboard/getPrabhagwiseApplications${queryString ? `?${queryString.replaceAll("+", " ")}` : ""}`;

        const response = await apiClient.get(endpoint);
        if (response.success && Array.isArray(response.data)) {
          const data = response.data.map((item, i) => ({
            srNo: i+1,
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
    {label: "Sr. No", align: "center"},
    { label: "प्रभाग", align: "left" },
    { label: "प्राप्त अर्ज", align: "right" },
    { label: "निकाली", align: "right" },
    { label: "प्रलंबित", align: "right" },
    { label: "वेळेत (%)", align: "right" },
  ];

  const keyMapping = {
    "Sr. No": "srNo",
    प्रभाग: "WARDNAME",
    "प्राप्त अर्ज": "TOTAL_APPLICATIONS",
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
        rowLimit={8}
      />
    </div>
  );
};

export default WardsTable;
