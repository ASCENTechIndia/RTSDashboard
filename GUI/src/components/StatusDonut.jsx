import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { statusWise } from "../data/dummyData";

export default function StatusDonut() {
  const total = statusWise.reduce((s, d) => s + d.value, 0);
  return (
    <div className="card">
      <h3 className="card-title">सेवा स्थिती (Status Wise)</h3>
      <div className="chart-with-legend">
        <div className="donut-wrap" style={{ width: "150px", height: "170px" }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={statusWise}
                dataKey="value"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={2}
                stroke="none"
                label={false}
                labelLine={false}
                isAnimationActive={false}
              >
                {statusWise.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">
            <div>
              <div className="small">एकूण</div>
              <div className="big">{total.toLocaleString("en-IN")}</div>
            </div>
          </div>
        </div>
        <div className="legend" style={{marginLeft: "auto"}}>
          {statusWise.map((d, i) => (
            <div className="item" key={i}>
              <div style={{ display: "flex", gap: "5px" }}>
                <span className="dot" style={{ background: d.color }} />

                <span className="name">{d.name}</span>
              </div>
              <span className="val">
                {d.value.toLocaleString("en-IN")} ({d.pct})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
