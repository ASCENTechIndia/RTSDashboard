import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";
import DataTable from "./DataTable";

export default function DelayedServicesTable({ filters }) {
  const { setLoader } = useLoader();
  const ULBID = import.meta.env.VITE_ULBID;
  const [delayedServiceTableData, setDelayedServiceTableData] = useState([]);

  const fetchDelayedServiceData = async () => {
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
      const endpoint = `/rts-dashboard/servicewiseTopDelay${queryString ? `?${queryString.replaceAll("+", " ")}` : ""}`;
      const response = await apiClient.get(endpoint);
      if (response.success && Array.isArray(response.data)) {
        const updatedData = response.data.map((item) => ({
          SERVICE_NAME: item.SERVNM,
          DELAYED_APPLICATIONS: item.PENDING_APPLICATIONS,
          AVG_DELAY_DAYS: `${Number(item.PERCENTAGE).toFixed(2)}%`,
        }));
        setDelayedServiceTableData(updatedData);
      } else {
        setDelayedServiceTableData([]);
      }
    } catch (error) {
      setDelayedServiceTableData([]);
      console.error("Error fetching delayed services:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchDelayedServiceData();
  }, [filters]);

  const headers = [
    { label: "सेवा प्रकार", align: "left" },
    { label: "विलंबित अर्ज" },
    { label: "सरासरी दिवस" },
  ];

  const keyMapping = {
    "सेवा प्रकार": "SERVICE_NAME",
    "विलंबित अर्ज": "DELAYED_APPLICATIONS",
    "सरासरी दिवस": "AVG_DELAY_DAYS",
  };

  return (
    <div className="card">
      <h3 className="card-title">अति विलंबित सेवा (15+ दिवस विलंबित)</h3>
      <div>
        <DataTable
          headers={headers}
          data={delayedServiceTableData}
          keyMapping={keyMapping}
          rowLimit={5}
        />
      </div>
    </div>
  );
}
