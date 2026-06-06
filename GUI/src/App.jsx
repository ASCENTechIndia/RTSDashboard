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
  };

  return (
    <div className="layout">
      {/* <Sidebar /> */}
      <main className="main">
        <Navbar />
        <div className="content">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          {/* <KpiRow filters={filters} /> done */}

          <div className="grid-table">
            {/* <DepartmentTable filters={filters} /> done */}
            {/* <TatDonut filters={filters}/>  done */}
            {/* <OnTimeGauge filters={filters} /> done */}
            {/* <AlertsPanel /> */}
          </div>

          <div className="grid-4">
            {/* <MonthlyTrendChart filters={filters}/>  done*/}
            {/* <StatusDonut filters={filters}/> done */}
            {/* <TopServicesBar filters={filters}/>  done */}
            {/* <ComplaintsList /> */}  
          </div>

          <div className="grid-4">
            {/* <WardsTable filters={filters}/> done */}
            {/* <OfficesTable filters={filters}/> done */}
            {/* <DelayedServicesTable filters={filters}/> done */}
            <CommissionerSummary filters={filters}/>
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}