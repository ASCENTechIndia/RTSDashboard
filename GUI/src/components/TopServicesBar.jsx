import React, { useEffect, useState } from "react";
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
import apiClient from "../services/apiClient";

export default function TopServicesBar() {

  const [serviceBarData, setServiceBarData] = useState([]);


  const fetchServiceBarData = async () => {
    try {
      const response = await apiClient.get(`/rts-dashboard/topServices`);

      if (response.success) {
        const updatedData = response.data.map(item => ({
          name: item?.VAR_SERVICE_ENG_NAME,
          value: item?.APPROVED_APPLICATIONS,
          rank: item?.RANK_NO
        }));

        setServiceBarData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const chartHeight = serviceBarData.length * 35;

  useEffect(() => {
    fetchServiceBarData();
  }, []);

  return (
    // <div className="card">
    //   <h3 className="card-title">सेवा प्रकारानुसार वितरण (Top Services)</h3>
    //   <div style={{ width: "100%", height: 210, flex: 1 }}>
    //     <ResponsiveContainer>
    //       <BarChart
    //         data={serviceBarData}
    //         layout="vertical"
    //         margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
    //       >
    //         <CartesianGrid horizontal={false} stroke="#eef0f4" />
    //         <XAxis type="number" tick={{ fontSize: 9, fill: "#6b7280" }} />
    //         <YAxis
    //           type="category"
    //           dataKey="name"
    //           tick={{ fontSize: 9, fill: "#374151" }}
    //           width={95}
    //         />
    //         <Tooltip />
    //         <Bar
    //           dataKey="value"
    //           radius={[0, 3, 3, 0]}
    //           barSize={12}
    //           fill="#2563eb"
    //           label={{ position: "right", fontSize: 9, fill: "#374151" }}
    //         />
    //       </BarChart>
    //     </ResponsiveContainer>
    //   </div>
    // </div>

    <div className="card">
      <h3 className="card-title">सेवा प्रकारानुसार वितरण (Top Services)</h3>

      <div
        style={{
          height: 210,
          overflowY: "auto",
          overflowX: "hidden",
          paddingLeft: "5px",
          paddingRight: "5px"
        }}
      >
        <div style={{ width: "100%", height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={serviceBarData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              barCategoryGap={12}
            >
              <CartesianGrid horizontal={false} stroke="#eef0f4" />

              <XAxis
                type="number"
                tick={{ fontSize: 9, fill: "#6b7280" }}
              />

              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 9, fill: "#374151" }}
                width={140}
              />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[0, 3, 3, 0]}
                barSize={16}
                fill="#2563eb"
                label={{
                  position: "right",
                  fontSize: 9,
                  fill: "#374151",
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
