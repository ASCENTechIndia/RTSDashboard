import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";
import DataTable from "./DataTable";

const OfficesTable = ({ filters }) => {
  const { setLoader } = useLoader();
  const ULBID = import.meta.env.VITE_ULBID;
  const [error, setError] = useState(null);
  const [officersData, setOfficersData] = useState([]);

  useEffect(() => {
    const fetchOfficers = async () => {
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
        const endpoint = `/rts-dashboard/getOfficerWork${queryString ? `?${queryString}` : ""}`;

        const response = await apiClient.get(endpoint);
        if (response.success && Array.isArray(response.data)) {
          const data = response.data.map((item) => ({
            OFFICER_NAME: item.OFFICER_NAME,
            TOTAL_APPLICATIONS: item.TOTAL_APPLICATIONS,
            APPROVED_APPLICATIONS: item.APPROVED_APPLICATIONS,
            PENDING_APPLICATIONS: item.PENDING_APPLICATIONS,
            DELAYED_APPLICATIONS: item.DELAYED_APP,
          }));
          setOfficersData(data);
        } else {
          setOfficersData([]);
          throw new Error(response.message || "Invalid data format");
        }
      } catch (err) {
        setOfficersData([]);
        console.error(err);
        setError(err.message);
      } finally {
        setLoader(false);
      }
    };

    fetchOfficers();
  }, [filters]);

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
        अधिकारी कामगिरी (टॉप 10)
        {/* <span className="view">View All Officers ›</span> */}
      </h3>
      <DataTable
        headers={headers}
        data={officersData}
        keyMapping={keyMapping}
        rowLimit={8}
      />
    </div>
  );
};

export default OfficesTable;
