import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { tatDistribution } from "../data/dummyData";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";

const colors = ["#22a06b", "#f4b400", "#ee8f1a", "#e23b3b", "#7c3aed"];

export default function TatDonut({ filters }) {
  const { setLoader } = useLoader();
  const ULBID = import.meta.env.VITE_ULBID;
  const [tatData, setTatData] = useState([]);
  const [tatTotal, setTatTotal] = useState("");

  const fetchTATData = async () => {
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
      if (filters?.ward) params.append("prabhagId", filters.ward);

      const queryString = params.toString();
      const tatUrl = `/rts-dashboard/tatWisePending${queryString ? `?${queryString.replaceAll("+", " ")}` : ""}`;

      const response = await apiClient.get(tatUrl);

      if (response?.success) {
        const total = response?.data?.totalPending;
        const updatedData = response?.data?.buckets.map((item, idx) => ({
          name: item?.DAYS_BUCKET,
          value: item?.PENDING_APPLICATIONS,
          color: colors[idx % colors.length],
          pct:
            String(
              Number((item?.PENDING_APPLICATIONS / total) * 100).toFixed(2),
            ) + "%",
        }));
        setTatTotal(total);
        setTatData(updatedData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (filters) fetchTATData();
  }, [filters]);

  return (
    <div className="card">
      <h3 className="card-title">कालमर्यादा (TAT) नुसार प्रकरणे</h3>
      <div className="chart-with-legend">
        <div className="donut-wrap" style={{ width: "130px", height: 170 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={tatData}
                dataKey="value"
                innerRadius={36}
                outerRadius={60}
                paddingAngle={2}
                stroke="none"
                label={false}
                labelLine={false}
                isAnimationActive={false}
              >
                {tatData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">
            <div>
              <div className="small" style={{ fontSize: "9px" }}>
                एकूण प्रलंबित
              </div>
              <div className="big">{tatTotal}</div>
            </div>
          </div>
        </div>
        <div className="legend" style={{ marginLeft: "auto " }}>
          {tatData.map((d, i) => (
            <div className="item" key={i}>
              <div
                className=""
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <span className="dot" style={{ background: d?.color }} />
                <span className="name">{d?.name}</span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <span className="val" style={{ fontSize: "9px" }}>
                  {d?.value?.toLocaleString("en-IN")} ({d?.pct})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
