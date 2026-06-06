import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";

export default function TopServicesBar({ filters }) {
  const { setLoader } = useLoader();
  const ULBID = import.meta.env.VITE_ULBID
  const [serviceBarData, setServiceBarData] = useState([]);

  const fetchServiceBarData = async () => {
    setLoader(true);
    try {
      const params = new URLSearchParams();
      if(ULBID) params.append("ulbId", ULBID)
      if (filters.fromDate) params.append("fromDate", filters.fromDate);
      if (filters.toDate) params.append("toDate", filters.toDate);
      if (filters.officer) params.append("username", filters.officer);
      if (filters.type) params.append("serviceId", filters.type);
      if(filters.department) params.append("wardId", filters.department)

      const queryString = params.toString();
      const endpoint = `/rts-dashboard/topServices${queryString ? `?${queryString.replaceAll("+", " ")}` : ""}`;

      const response = await apiClient.get(endpoint);
      if (response.success && Array.isArray(response.data)) {
        const updatedData = response.data.map((item) => ({
          name: item.SERVNM,
          value: item.APPROVED_APPLICATIONS,
          rank: item.RANK_NO,
        }));
        setServiceBarData(updatedData);
      } else {
        setServiceBarData([]);
      }
    } catch (error) {
      setServiceBarData([]);
      console.error("Error fetching top services data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchServiceBarData();
  }, [filters]);

  const chartHeight = serviceBarData.length * 35;

  return (
    <div className="card">
      <h3 className="card-title">सेवा प्रकारानुसार वितरण (Top Services)</h3>
      <div
        style={{
          height: 210,
          overflowY: "auto",
          overflowX: "hidden",
          paddingLeft: "5px",
          paddingRight: "5px",
        }}
      >
        <div style={{ width: "100%", height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={serviceBarData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              barCategoryGap={12}
            >
              <CartesianGrid horizontal={false} stroke="#eef0f4" />
              <XAxis type="number" tick={{ fontSize: 9, fill: "#6b7280" }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 9, fill: "#374151" }}
                width={140}
              />
              <Tooltip />
              <Bar
                dataKey="value"
                radius={[0, 3, 3, 0]}
                barSize={16}
                fill="#2563eb"
                label={{
                  position: "right",
                  fontSize: 9,
                  fill: "#374151",
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
