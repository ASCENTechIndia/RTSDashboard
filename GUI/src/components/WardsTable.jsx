import React, { useEffect, useState } from 'react';
import { wardsTop10 } from '../data/dummyData';
import apiClient from '../services/apiClient';

export default function WardsTable() {

  const [wardTableData, setWardTableData] = useState([]);

  const fetchWardTableData = async () => {
    try {
      const response = await apiClient.get(`/rts-dashboard/getPrabhagwiseApplications`);

      if (response.success) {
        const updatedData = response.data.map(item => ({
          ward: item?.WARDNAME,
          received: item?.TOTAL_APPLICATIONS,
          disposed: item?.APPROVED_APPLICATIONS,
          pending: item?.PENDING_APPLICATIONS,
          ontime: item?.APPROVED_PERCENTAGE
        }));

        setWardTableData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWardTableData();
  }, []);

  return (
    <div className="card">
      <h3 className="card-title">
        प्रभागनिहाय कामगिरी (Top 10)
        <span className="view">View All Prabhag ›</span>
      </h3>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        <table className="table">
          <colgroup>
            <col style={{ width: '34%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '18%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>प्रभाग</th>
              <th className="num">प्राप्त अर्ज</th>
              <th className="num">निकाली</th>
              <th className="num">प्रलंबित</th>
              <th className="num">वेळेत निकाली (%)</th>
            </tr>
          </thead>
          <tbody>
            {wardTableData.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}. {r.ward}</td>
                <td className="num">{r.received.toLocaleString('en-IN')}</td>
                <td className="num">{r.disposed.toLocaleString('en-IN')}</td>
                <td className="num">{r.pending.toLocaleString('en-IN')}</td>
                <td className="num" style={{ color: '#16a34a', fontWeight: 600 }}>{r.ontime}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
