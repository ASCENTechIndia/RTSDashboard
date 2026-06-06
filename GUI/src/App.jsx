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
  const getFinancialYearDates = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    // Financial year starts on April 1st
    let financialYearStart;
    if (currentMonth < 3) { // January, February, March (0-2)
      financialYearStart = new Date(currentYear - 1, 3, 1); // April of previous year
    } else {
      financialYearStart = new Date(currentYear, 3, 1); // April of current year
    }
    
    // Format dates as dd-MON-yyyy
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };
    
    return {
      fromDate: formatDate(financialYearStart),
      toDate: formatDate(today)
    };
  };

  const { fromDate: defaultFromDate, toDate: defaultToDate } = getFinancialYearDates();

  const [filters, setFilters] = useState({
    fromDate: defaultFromDate,
    toDate: defaultToDate,
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
          <KpiRow filters={filters} /> 

          <div className="grid-table">
            <DepartmentTable filters={filters} /> 
            <TatDonut filters={filters}/>
            <OnTimeGauge filters={filters} /> 
            <AlertsPanel />
          </div>

          <div className="grid-4">
            <MonthlyTrendChart filters={filters}/>  
            <StatusDonut filters={filters}/> 
            <TopServicesBar filters={filters}/>  
            <ComplaintsList />  
          </div>

          <div className="grid-4">
            <WardsTable filters={filters}/> 
            <OfficesTable filters={filters}/>
            <DelayedServicesTable filters={filters}/>
            <CommissionerSummary filters={filters}/>
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}