import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";

export default function MonthlyTrendChart({ filters }) {
  const { setLoader } = useLoader();
  const ULBID = import.meta.env.VITE_ULBID;
  const [monthlyTrendChartData, setMonthlyTrendChartData] = useState([]);

  const fetchTrendChartData = async () => {
    setLoader(true);
    try {
      const params = new URLSearchParams();
      if (ULBID) params.append("ulbId", ULBID);
      if (filters?.officer) params.append("username", filters.officer);
      if (filters?.type) params.append("serviceId", filters.type);
      if (filters?.department) params.append("wardId", filters.department);
      if (filters.fromDate) params.append("fromDate", filters.fromDate);
        if (filters.toDate) params.append("toDate", filters.toDate);
      const queryString = params.toString();
      const monthTrendUrl = `/rts-dashboard/monthwiseApplicationTrend${queryString ? `?${queryString.replaceAll("+", " ")}` : ""}`;
      const response = await apiClient.get(monthTrendUrl);
      if (
        response.success &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        const updatedChartData = response.data.map((item) => ({
          month: item?.MONTHS,
          received: item?.RECEIVED_APPLICATIONS || 0,
          disposed: item?.APPROVED_APPLICATIONS || 0,
        }));
        setMonthlyTrendChartData(updatedChartData);
      } else {
        setMonthlyTrendChartData([]);
      }
    } catch (error) {
      console.error("Error fetching monthly trend:", error);
      setMonthlyTrendChartData([]);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (filters) fetchTrendChartData();
  }, [filters]);

  if (!monthlyTrendChartData.length) {
    return (
      <div className="card">
        <h3
          className="card-title"
          style={{ fontFamily: "Mangal", fontSize: "11px" }}
        >
          मासिक अर्ज ट्रेंड
        </h3>
        <div
          style={{
            height: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>No data available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3
        className="card-title"
        style={{ fontFamily: "Mangal", fontSize: "11px" }}
      >
        मासिक अर्ज ट्रेंड
      </h3>
      <div style={{ height: 200 }}>
        {" "}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={monthlyTrendChartData}
            margin={{ top: 5, right: 8, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 9, fill: "#6b7280" }}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={45}
            />
            <YAxis tick={{ fontSize: 9, fill: "#6b7280" }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 10 }} iconSize={8} />
            <Line
              type="monotone"
              dataKey="received"
              name="प्राप्त अर्ज"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="disposed"
              name="निकाली अर्ज"
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
