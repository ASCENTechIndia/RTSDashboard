import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";

export default function OnTimeGauge({ filters }) {
  const { setLoader } = useLoader();
  const [approved, setApproved] = useState(0);
  const [pending, setPending] = useState(0);
  const [approvedPct, setApprovedPct] = useState("0.00");
  const [pendingPct, setPendingPct] = useState("0.00");
  const [approvedPercentage, setApprovedPercentage] = useState("0.00");
  const fetchSummary = async () => {
    setLoader(true);
    try {
      const params = new URLSearchParams();
      if (filters.fromDate) params.append("fromDate", filters.fromDate);
      if (filters.toDate) params.append("toDate", filters.toDate);
      if (filters.department) params.append("wardName", filters.department);
      if (filters.status) params.append("status", filters.status);
      if (filters.type) params.append("serviceName", filters.type);
      if (filters.officer) params.append("officerName", filters.officer);
      // if (filters.ward) params.append("prabhagId", filters.ward);
      const queryString = params.toString();
      const endpoint = `/rts-dashboard/applicationStatusSummary${queryString ? `?${queryString.replaceAll("+", " ")}` : ""}`;

      const response = await apiClient.get(endpoint);
      if (response.success) {
        const apr = Number(
          response.data.resolved_pending.approved_applications || 0,
        );
        const pend = Number(
          response.data.resolved_pending.pending_applications || 0,
        );
        const approvedPercentage = response.data.approved_percentage || 0;
        setApprovedPercentage(approvedPercentage.toFixed(2));
        const total = apr + pend;
        setApproved(apr);
        setPending(pend);
        setApprovedPct(total > 0 ? ((apr / total) * 100).toFixed(2) : "0.00");
        setPendingPct(total > 0 ? ((pend / total) * 100).toFixed(2) : "0.00");
      } else {
        setApproved(0);
        setPending(0);
        setApprovedPct(0);
        setPendingPct(0);
      }
    } catch (error) {
      setApproved(0);
      setPending(0);
      setApprovedPct(0);
      setPendingPct(0);
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [filters]);

  const gaugeData = [
    { name: "वेळेत", value: parseFloat(approvedPercentage), color: "#22a06b" },
    {
      name: "विलंबित",
      value: parseFloat(100 - approvedPercentage),
      color: "#e23b3b",
    },
  ];

  const pieData = [
    {
      name: "वेळेत निकाली",
      value: approved,
      pct: `${approvedPct}%`,
      color: "#16a34a",
    },
    {
      name: "विलंबित",
      value: pending,
      pct: `${pendingPct}%`,
      color: "#ef4444",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {/* Half donut gauge */}
      <div className="card">
        <h3 className="card-title">वेळेत सेवा वितरण</h3>
        <div className="gauge-wrap">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={gaugeData}
                dataKey="value"
                cx="50%"
                cy="58%"
                startAngle={180}
                endAngle={0}
                innerRadius={55}
                outerRadius={78}
                stroke="none"
              >
                {gaugeData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="gauge-scale">
            <span>0%</span>
            <span>100%</span>
          </div>
          <div className="gauge-center">
            <div className="big" style={{ color: "#16a34a" }}>
              {approvedPercentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Pie chart + legend */}
      <div className="card" style={{height:"100%"}}>
        <h3 className="card-title">वेळेत vs विलंबित</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <PieChart width={80} height={80}>
            <Pie
              data={pieData}
              cx={35}
              cy={35}
              innerRadius={0}
              outerRadius={30}
              dataKey="value"
              strokeWidth={1}
              stroke="#fff"
            >
              {pieData.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value.toLocaleString("en-IN"), name]}
              contentStyle={{ fontSize: 11 }}
            />
          </PieChart>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {pieData.map((d, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: d.color,
                    flexShrink: 0,
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: 10.5,
                      color: "#374151",
                      fontWeight: 500,
                    }}
                  >
                    {d.name}
                  </span>
                  <span style={{ fontSize: 10.5, color: "#6b7280" }}>
                    {d.value.toLocaleString("en-IN")} ({d.pct})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
