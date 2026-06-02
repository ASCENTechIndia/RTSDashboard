import React, { useEffect, useState } from "react";
import { departmentRows } from "../data/dummyData";
import {
  BookOpen,
  Landmark,
  ClipboardCheck,
  HeartPulse,
  Droplets,
  LayoutGrid,
  BarChart2,
  Handshake,
  Road,
  ShoppingCart,
  Hotel,
  HandHeart,
  Flame
} from "lucide-react";
import apiClient from "../services/apiClient";

const iconMap = {
  bookopen: BookOpen,
  landmark: Landmark,
  clipboardcheck: ClipboardCheck,
  heartpulse: HeartPulse,
  droplets: Droplets,
  layoutgrid: LayoutGrid,
  barchart: BarChart2,
};

const newIconMap = {
  landmark: Landmark,
  bookopen: BookOpen,
  handshake: Handshake,
  road: Road,
  clipboardcheck: ClipboardCheck,
  heartpulse: HeartPulse,
  shoppingcart: ShoppingCart,
  hotel: Hotel,
  handheart: HandHeart,
  flame: Flame,
  droplets: Droplets,
}

export default function DepartmentTable() {

  const [departmentWiseData, setDepartmentWiseData] = useState([]);

  const fetchDepartmentWiseData = async () => {
    try {
      const response = await apiClient.get(`/rts-dashboard/deptWiseApplications`);

      if (response.success && response.data.length > 0) {
        const iconkeys = Object.keys(newIconMap);
        const DeptRows = response.data.map((item, idx) => ({
          dept: item?.VAR_DEPT_ENGNAME,
          received: item?.TOTAL_APPLICATIONS,
          disposed: item?.APPROVED_APPLICATIONS,
          pending: item?.PENDING_APPLICATIONS,
          ontime: item?.APPROVED_PERCENTAGE,
          icon: iconkeys[idx % iconkeys.length]
        }));


        const totals = DeptRows.reduce(
          (acc, row) => {
            acc.received += Number(row.received || 0);
            acc.disposed += Number(row.disposed || 0);
            acc.pending += Number(row.pending || 0);
            acc.ontimeSum += Number(row.ontime || 0);
            return acc;
          },
          {
            received: 0,
            disposed: 0,
            pending: 0,
            ontimeSum: 0,
          }
        );

        const totalRow = {
          dept: "Total",
          received: totals.received,
          disposed: totals.disposed,
          pending: totals.pending,
          ontime: Number((totals.ontimeSum / DeptRows.length).toFixed(2)),
          isTotal: true,
        };
        setDepartmentWiseData([...DeptRows, totalRow]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDepartmentWiseData();
  }, []);


  return (
    <div className="card">
      <h3 className="card-title">विभागनिहाय RTS कामगिरी</h3>
      <div style={{ maxHeight: "270px", overflowY: "auto" }}>
        <table className="table" style={{ borderCollapse: "collapse", overflowY: "auto" }}>
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
            {departmentWiseData.map((r, i) => {
              const Icon = newIconMap[r.icon];
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
    </div>
  );
}
