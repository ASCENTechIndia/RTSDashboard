import React from 'react';
import { wardsTop10 } from '../data/dummyData';

export default function WardsTable() {

  

  return (
    <div className="card">
      <h3 className="card-title">
        प्रभागनिहाय कामगिरी (Top 10)
        <span className="view">View All Prabhag ›</span>
      </h3>
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
            <th className="num">प्राप्त</th>
            <th className="num">निकाली</th>
            <th className="num">प्रलंबित</th>
            <th className="num">वेळेत (%)</th>
          </tr>
        </thead>
        <tbody>
          {wardsTop10.map((r, i) => (
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
  );
}
