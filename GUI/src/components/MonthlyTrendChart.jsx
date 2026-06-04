import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { monthlyTrend } from '../data/dummyData';
import apiClient from '../services/apiClient';

export default function MonthlyTrendChart({ filters }) {
  const [monthlyTrendChartData, setMonthlyTrendChartData] = useState([]);

  const fetchTrendChartData = async () => {
    try {

      const params = new URLSearchParams();
      if (filters?.fromDate) params.append("fromDate", filters.fromDate);
      if (filters?.toDate) params.append("toDate", filters.toDate);
      if (filters?.department) params.append("wardName", filters.department);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.type) params.append("serviceName", filters.type);
      if (filters?.officer) params.append("officerName", filters.officer);

      const queryString = params.toString();
      const monthTrendUrl = `/rts-dashboard/monthwiseApplicationTrend${queryString ? `?${queryString.replaceAll("+", " ")}` : ""}`;

      const response = await apiClient.get(monthTrendUrl);

      if (response.success && response.data.length > 0) {
        const updatedChartData = response?.data.map(item => ({
          month: item?.MONTHS,
          received: item?.RECEIVED_APPLICATIONS || 0,
          disposed: item?.APPROVED_APPLICATIONS || 0
        }));
        setMonthlyTrendChartData(updatedChartData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (filters) fetchTrendChartData();
  }, [filters])

  return (
    <div className="card">
      <h3 className="card-title">मासिक अर्ज ट्रेंड</h3>
      <div style={{ flex: 1 }}>
        <ResponsiveContainer>
          <LineChart data={monthlyTrendChartData} margin={{ top: 5, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
            <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#6b7280' }} interval={0} angle={-25} textAnchor="end" height={45} />
            <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 10 }} iconSize={8} />
            <Line type="monotone" dataKey="received" name="प्राप्त अर्ज" stroke="#2563eb" strokeWidth={2} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="disposed" name="निकाली अर्ज" stroke="#16a34a" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
