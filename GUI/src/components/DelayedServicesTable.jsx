import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";
import DataTable from "./DataTable";

export default function DelayedServicesTable({ filters }) {
  const { setLoader } = useLoader();
  const [delayedServiceTableData, setDelayedServiceTableData] = useState([]);

  const fetchDelayedServiceData = async () => {
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
      const endpoint = `/rts-dashboard/servicewiseTopDelay${queryString ? `?${queryString}` : ""}`;

      const response = await apiClient.get(endpoint);
      if (response.success && Array.isArray(response.data)) {
        const updatedData = response.data.map((item) => ({
          SERVICE_NAME: item.SERVNM,
          DELAYED_APPLICATIONS: item.DELAYED_APPLICATIONS,
          AVG_DELAY_DAYS: item.AVG_DELAY_DAYS,
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
    { label: "प्रलंबित अर्ज" },
    { label: "सरासरी दिवस" },
  ];

  const keyMapping = {
    "सेवा प्रकार": "SERVICE_NAME",
    "प्रलंबित अर्ज": "DELAYED_APPLICATIONS",
    "सरासरी दिवस": "AVG_DELAY_DAYS",
  };

  return (
    <div className="card">
      <h3 className="card-title">Top Delayed Services (15+ दिवस प्रलंबित)</h3>
      <div>
        <DataTable
          headers={headers}
          data={delayedServiceTableData}
          keyMapping={keyMapping}
        />
      </div>
    </div>
  );
}
