import React, { useState } from "react";

import Navbar from "./new-components/Navbar";
import FilterBar from "./new-components/FilterBar";
import KpiRow from "./new-components/KpiRow";
import DepartmentTable from "./new-components/DepartmentTable";
import MonthlyTrendChart from "./new-components/MonthlyTrendChart";
import TatDonut from "./new-components/TatDonut";
import StatusDonut from "./new-components/StatusDonut";
import OnTimeGauge from "./new-components/OnTimeGauge";
import TopServicesBar from "./new-components/TopServicesBar";
import DelayedServicesTable from "./new-components/DelayedServicesTable";
import WardsTable from "./new-components/WardsTable";
import OfficesTable from "./new-components/OfficesTable";
import ComplaintsList from "./new-components/ComplaintsList";
import CommissionerSummary from "./new-components/CommissionerSummary";
import AlertsPanel from "./new-components/AlertsPanel";
import Footer from "./new-components/Footer";

export default function NewDashboard() {
  const getFinancialYearDates = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Financial year starts on April 1st
    let financialYearStart;

    if (currentMonth < 3) {
      // January, February, March
      financialYearStart = new Date(currentYear - 1, 3, 1);
    } else {
      // April onwards
      financialYearStart = new Date(currentYear, 3, 1);
    }

    // Format date as dd-MON-yyyy
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");

      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];

      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    };

    return {
      fromDate: formatDate(financialYearStart),
      toDate: formatDate(today),
    };
  };

  const {
    fromDate: defaultFromDate,
    toDate: defaultToDate,
  } = getFinancialYearDates();

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
      <main className="main">
        <Navbar />

        <div className="content">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          <KpiRow filters={filters} />

          <div className="grid-table">
            <DepartmentTable filters={filters} />
            <TatDonut filters={filters} />
            <OnTimeGauge filters={filters} />
            <AlertsPanel filters={filters} />
          </div>

          <div className="grid-4">
            <MonthlyTrendChart filters={filters} />
            <StatusDonut filters={filters} />
            <TopServicesBar filters={filters} />
            <ComplaintsList />
          </div>

          <div className="grid-4">
            <WardsTable filters={filters} />
            <OfficesTable filters={filters} />
            <DelayedServicesTable filters={filters} />
            <CommissionerSummary filters={filters} />
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}