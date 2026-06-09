import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { statusWise } from "../data/dummyData";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";

export default function StatusDonut({ filters }) {
  const { setLoader } = useLoader();
  const ULBID = import.meta.env.VITE_ULBID;
  const [statusChartData, setStatusChartData] = useState([]);
  const [statusTotal, setStatusTotal] = useState("");

  const fetchStatusChartData = async () => {
    try {
      setLoader(true);
      const params = new URLSearchParams();
      if (ULBID) params.append("ulbId", ULBID);
      if (filters?.fromDate) params.append("fromDate", filters.fromDate);
      if (filters?.toDate) params.append("toDate", filters.toDate);
      if (filters?.department) params.append("wardName", filters.department);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.type) params.append("serviceName", filters.type);
      if (filters?.officer) params.append("officerName", filters.officer);
      // if (filters?.ward) params.append("prabhagId", filters.ward);

      const queryString = params.toString();
      const statusUrl = `/rts-dashboard/detailedApplicationStatus${queryString ? `?${queryString.replaceAll("+", " ")}` : ""}`;
      const response = await apiClient.get(statusUrl);

      if (response.success) {
        const total1 = Object.values(response.data).reduce(
          (sum, row) => (sum += row),
          0,
        );
        const updatedData = [
          {
            name: "Approved",
            value: response?.data?.APPROVED_APPLICATIONS || 0,
            color: "#22a06b",
            pct:
              String(
                (
                  (response?.data?.APPROVED_APPLICATIONS / total1) *
                  100
                ).toFixed(2),
              ) + "%",
          },
          {
            name: "Pending",
            value: response?.data?.PENDING_APPLICATIONS || 0,
            color: "#f4b400",
            pct:
              String(
                ((response?.data?.PENDING_APPLICATIONS / total1) * 100).toFixed(
                  2,
                ),
              ) + "%",
          },
          {
            name: "Rejected",
            value: response?.data?.REJECT_APPLICATIONS || 0,
            color: "#e23b3b",
            pct:
              String(
                ((response?.data?.REJECT_APPLICATIONS / total1) * 100).toFixed(
                  2,
                ),
              ) + "%",
          },
        ];
        setStatusTotal(total1);
        setStatusChartData(updatedData);
      } else {
        setStatusTotal(0);
        setStatusChartData([]);
      }
    } catch (error) {
      console.error("Error fetching status chart data:", error);
      setStatusTotal(0);
      setStatusChartData([]);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (filters) fetchStatusChartData();
  }, [filters]);

  return (
    <div className="card">
      <h3 className="card-title">सेवा स्थिती (Status Wise)</h3>
      <div className="chart-with-legend">
        <div className="donut-wrap" style={{ width: "150px", height: "170px" }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={statusChartData}
                dataKey="value"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={2}
                stroke="none"
                label={false}
                labelLine={false}
                isAnimationActive={false}
              >
                {statusChartData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">
            <div>
              <div className="small">एकूण</div>
              <div className="big">{statusTotal?.toLocaleString("en-IN")}</div>
            </div>
          </div>
        </div>
        <div className="legend" style={{ marginLeft: "auto" }}>
          {statusChartData.map((d, i) => (
            <div className="item" key={i}>
              <div style={{ display: "flex", gap: "5px" }}>
                <span className="dot" style={{ background: d.color }} />

                <span className="name">{d.name}</span>
              </div>
              <span className="val">
                {d?.value?.toLocaleString("en-IN")} ({d.pct})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
