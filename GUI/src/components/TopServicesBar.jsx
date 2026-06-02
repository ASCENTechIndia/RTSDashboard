import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { topServices } from "../data/dummyData";

export default function TopServicesBar() {
  return (
    <div className="card">
      <h3 className="card-title">सेवा प्रकारानुसार वितरण (Top Services)</h3>
      <div style={{ width: "100%", height: 210, flex: 1 }}>
        <ResponsiveContainer>
          <BarChart
            data={topServices}
            layout="vertical"
            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid horizontal={false} stroke="#eef0f4" />
            <XAxis type="number" tick={{ fontSize: 9, fill: "#6b7280" }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 9, fill: "#374151" }}
              width={95}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              radius={[0, 3, 3, 0]}
              barSize={12}
              fill="#2563eb"
              label={{ position: "right", fontSize: 9, fill: "#374151" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
