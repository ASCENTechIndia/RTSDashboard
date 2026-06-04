import React, { useEffect, useState } from 'react';
import { commissionerSummary } from '../data/dummyData';
import apiClient from '../services/apiClient';

export default function CommissionerSummary() {

  const [summaryData, setSummaryData] = useState([]);

  const getCommissionerSummaryData = async () => {
    try {
      const response = await apiClient.get(`/rts-dashboard/getCommissionerSummary`);

      console.log(response);

      if (response.success && response.data.length > 0) {
        // const updatedData = Object.entries(response.data[0]).map(item => ({
        //   label: item[0],
        //   value: item[1]
        // }));

        // setSummaryData(updatedData);
        const data = response?.data[0];
        const updatedData = [
          {
            label: 'एकूण प्राप्त अर्ज',
            value: data?.TOTAL_APPLICATIONS
          },
          {
            label: 'निकाली अर्ज',
            value: data?.APPROVED_APPLICATIONS
          },
          {
            label: 'प्रलंबित अर्ज',
            value: data?.PENDING_APPLICATIONS
          },
          {
            label: 'विलंबित प्रकरणे (15+ दिवस)',
            value: data?.APPLICATIONS_GREATER15
          },
        ]
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCommissionerSummaryData();
  }, [])

  return (
    <div className="card">
      <h3 className="card-title">Commissioner Summary</h3>
      <div className="summary-list">
        {summaryData.map((it, i) => (
          <div className="summary-item" key={i}>
            <span className="label">• {it.label}</span>
            <span className="value">{it.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
