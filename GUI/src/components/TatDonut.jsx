import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { tatDistribution } from "../data/dummyData";

export default function TatDonut() {
  const fetchTATData = async () => {
    try {
      // const 
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card">
      <h3 className="card-title">कालमर्यादा (TAT) नुसार प्रकरणे</h3>
      <div className="chart-with-legend">
        <div className="donut-wrap" style={{ width: "130px", height: 170 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={tatDistribution}
                dataKey="value"
                innerRadius={36}
                outerRadius={60}
                paddingAngle={2}
                stroke="none"
                label={false}
                labelLine={false}
                isAnimationActive={false}
              >
                {tatDistribution.map((d, i) => (
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
              <div className="big">8,537</div>
            </div>
          </div>
        </div>
        <div className="legend" style={{ marginLeft: "auto" }}>
          {tatDistribution.map((d, i) => (
            <div className="item" key={i}>
              <div
                className=""
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <span className="dot" style={{ background: d.color }} />
                <span className="name">{d.name}</span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <span className="val" style={{ fontSize: "9px" }}>
                  {d.value.toLocaleString("en-IN")} ({d.pct})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
