import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { onTime } from "../data/dummyData";

const pieData = [
  { name: "वेळेत निकाली", value: 40215, pct: "82.43%", color: "#16a34a" },
  { name: "विलंबित", value: 8537, pct: "17.57%", color: "#ef4444" },
];

export default function OnTimeGauge() {
  const gaugeData = [
    { name: "वेळेत", value: onTime.onTimePct, color: "#22a06b" },
    { name: "विलंबित", value: onTime.delayedPct, color: "#e23b3b" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <div className="card">
        <h3 className="card-title">वेळेत सेवा वितरण</h3>
        {/* Semicircle gauge */}
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
              {onTime.onTimePct}%
            </div>
          </div>
        </div>
      </div>

      {/* Pie chart + legend */}
      <div className="card">
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
