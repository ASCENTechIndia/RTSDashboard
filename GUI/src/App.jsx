import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import KpiRow from './components/KpiRow';
import DepartmentTable from './components/DepartmentTable';
import MonthlyTrendChart from './components/MonthlyTrendChart';
import TatDonut from './components/TatDonut';
import StatusDonut from './components/StatusDonut';
import OnTimeGauge from './components/OnTimeGauge';
import TopServicesBar from './components/TopServicesBar';
import DelayedServicesTable from './components/DelayedServicesTable';
import WardsTable from './components/WardsTable';
import OfficesTable from './components/OfficesTable';
import ComplaintsList from './components/ComplaintsList';
import CommissionerSummary from './components/CommissionerSummary';
import AlertsPanel from './components/AlertsPanel';
import Footer from './components/Footer';

export default function App() {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    ward: "",
    department: "",
    type: "",
    officer: "",
    status: "",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Filters changed:", newFilters);
  };

  return (
    <div className="layout">
      {/* <Sidebar /> */}
      <main className="main">
        <Navbar />
        <div className="content">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          <KpiRow filters={filters} />

          {/* Row 1 — Dept Table | TAT donut | OnTime gauge | Alerts */}
          <div className="grid-table">
            <DepartmentTable />
            <TatDonut />
            <OnTimeGauge />
            <AlertsPanel />
          </div>

          {/* Row 2 — Monthly trend | Status donut | Top services | Complaints */}
          <div className="grid-4">
            <MonthlyTrendChart />
            <StatusDonut />
            <TopServicesBar />
            <ComplaintsList />
          </div>

          {/* Row 3 — Wards | Offices | Delayed services | Commissioner Summary */}
          <div className="grid-4">
            <WardsTable />
            <OfficesTable />
            <DelayedServicesTable filters={filters}/>
            <CommissionerSummary />
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}