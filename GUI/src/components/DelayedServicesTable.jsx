import React from "react";
import { delayedServicesClean } from "../data/dummyData";

export default function DelayedServicesTable() {
  const max = Math.max(...delayedServicesClean.map((r) => r.delayedPct));
  return (
    <div className="card">
      <h3 className="card-title">Top Delayed Services (15+ दिवस प्रलंबित)</h3>
      <table className="table">
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "40%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>सेवा प्रकार</th>
            <th className="num">प्राप्त</th>
            <th className="num">विलंबित (%)</th>
          </tr>
        </thead>
        <tbody>
          {delayedServicesClean.map((r, i) => (
            <tr key={i}>
              <td>{r.service}</td>
              <td className="num">{r.received.toLocaleString("en-IN")}</td>
              <td className="num">
                <div
                  style={{
                    textAlign: "center",
                    // display: "flex",
                    // alignItems: "center",
                    // gap: 4,
                    // justifyContent: "flex-end",
                  }}
                >
                  {/* <div className="bar-bg" style={{ flex: 1, maxWidth: 60 }}>
                    <div className="bar-fill" style={{ width: `${(r.delayedPct / max) * 100}%`, background: '#ef4444' }} />
                  </div> */}
                  <span style={{ fontWeight: 600, minWidth: 32 }}>
                    {r.delayedPct}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
