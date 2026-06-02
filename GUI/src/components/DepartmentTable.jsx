import React from "react";
import { departmentRows } from "../data/dummyData";
import {
  BookOpen,
  Landmark,
  ClipboardCheck,
  HeartPulse,
  Droplets,
  LayoutGrid,
  BarChart2,
} from "lucide-react";

const iconMap = {
  bookopen: BookOpen,
  landmark: Landmark,
  clipboardcheck: ClipboardCheck,
  heartpulse: HeartPulse,
  droplets: Droplets,
  layoutgrid: LayoutGrid,
  barchart: BarChart2,
};

export default function DepartmentTable() {
  return (
    <div className="card">
      <h3 className="card-title">विभागनिहाय RTS कामगिरी</h3>
      <table className="table" style={{ borderCollapse: "collapse" }}>
        <colgroup>
          <col style={{ width: "32%" }} />
          <col style={{ width: "14%" }} />
          <col style={{ width: "14%" }} />
          <col style={{ width: "14%" }} />
          <col style={{ width: "26%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>विभाग</th>
            <th className="num" style={{ textAlign: "center" }}>
              प्राप्त अर्ज
            </th>
            <th className="num" style={{ textAlign: "center" }}>
              निकाली
            </th>
            <th className="num" style={{ textAlign: "center" }}>
              प्रलंबित
            </th>
            <th className="num" style={{ textAlign: "center" }}>
              वेळेत (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {departmentRows.map((r, i) => {
            const Icon = iconMap[r.icon];
            return (
              <tr key={i} className={r.isTotal ? "total-row" : ""}>
                <td>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {Icon && (
                      <div>
                        <Icon size={14} color="#161617" />
                      </div>
                    )}
                    {r.dept}
                  </div>
                </td>
                <td className="num">{r.received.toLocaleString("en-IN")}</td>
                <td className="num">{r.disposed.toLocaleString("en-IN")}</td>
                <td className="num">{r.pending.toLocaleString("en-IN")}</td>
                <td className="num">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      justifyContent: "flex-end",
                    }}
                  >
                    <span style={{ minWidth: 36 }}>{r.ontime.toFixed(2)}%</span>
                    <div className="bar-bg" style={{ flex: 1, maxWidth: 50 }}>
                      <div
                        className="bar-fill"
                        style={{
                          width: `${r.ontime}%`,
                          background:
                            r.ontime > 85
                              ? "#16a34a"
                              : r.ontime > 75
                                ? "#eab308"
                                : "#f59e0b",
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
