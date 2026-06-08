import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";

export default function FilterBar({ filters, onFilterChange }) {
  const [wardOptions, setWardOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [officerOptions, setOfficerOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  // const [prabhagOptions, setPrabhagOptions] = useState([]);

  const [loading, setLoading] = useState(true);
  const { setLoader } = useLoader();
  const ULBID = import.meta.env.VITE_ULBID;

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
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
    const monthAbbr = months[parseInt(month, 10) - 1];
    return `${day}-${monthAbbr}-${year}`;
  };

  const toDateInputValue = (formattedDate) => {
    if (!formattedDate) return "";
    const parts = formattedDate.split("-");
    if (parts.length !== 3) return "";
    const day = parts[0];
    const monthAbbr = parts[1];
    const year = parts[2];
    const months = {
      JAN: "01",
      FEB: "02",
      MAR: "03",
      APR: "04",
      MAY: "05",
      JUN: "06",
      JUL: "07",
      AUG: "08",
      SEP: "09",
      OCT: "10",
      NOV: "11",
      DEC: "12",
    };
    const month = months[monthAbbr] || "01";
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        setLoader(true);
        // Clear dropdowns while fetching
        setWardOptions([]);
        setTypeOptions([]);
        setOfficerOptions([]);
        setStatusOptions([]);
        // setPrabhagOptions([]);
        const endpoints = [
          {
            name: "ward",
            request: apiClient.get(`/dropdowns/wards?ulbid=${ULBID}`),
          },
          {
            name: "type",
            request: apiClient.get(`/dropdowns/services?ulbId=${ULBID}&deptId=${filters.department}`),
          },
          {
            name: "officer",
            request: apiClient.get(`/dropdowns/users?ulbid=${ULBID}`),
          },
          {
            name: "status",
            request: apiClient.get(
              `/dropdowns/getStatusDropdown?ulbId=${ULBID}`,
            ),
          },
          //  {
          //   name: "prabhag",
          //   request: apiClient.get(
          //     `/dropdowns/prabhag?ulbid=${ULBID}`,
          //   ),
          // },
        ];

        const results = await Promise.allSettled(
          endpoints.map((e) => e.request),
        );
        results.forEach((result, index) => {
          const endpointName = endpoints[index].name;
          if (result.status === "fulfilled" && result.value?.success) {
            const response = result.value;
            if (endpointName === "ward" && response.data?.rows) {
              setWardOptions(
                response.data.rows.map((w) => ({
                  label: w.WARDNAME,
                  value: w.WARDID,
                })),
              );
            } else if (endpointName === "type" && response.data?.rows) {
              setTypeOptions(
                response.data.rows.map((s) => ({
                  label: s.VAR_SERVICE_ENG_NAME,
                  value: s.NUM_SERVICE_SERVICEID,
                })),
              );
            } else if (endpointName === "officer" && response.data?.rows) {
              setOfficerOptions(
                response.data.rows.map((u) => ({
                  label: u.VAR_USER_USERNAME,
                  value: u.VAR_USER_USERNAME,
                })),
              );
            } else if ( endpointName === "status" && Array.isArray(response.data)) {
              setStatusOptions(
                response.data.map((s) => ({
                  label: s.STATUS,
                  value: s.STATUS,
                })),
              );
            } 
            // else if (endpointName === "prabhag" && response.data?.rows) {
            //   setPrabhagOptions(
            //     response.data.rows.map((p) => ({
            //       label: p.VAR_WARD_NAME,
            //       value: p.NUM_WARD_ID,
            //     })),
            //   );
            // } 
            else {
              if (endpointName === "ward") setWardOptions([]);
              if (endpointName === "type") setTypeOptions([]);
              if (endpointName === "officer") setOfficerOptions([]);
              if (endpointName === "status") setStatusOptions([]);
              // if (endpointName === "prabhag") setPrabhagOptions([]);
            }
          } else {
            if (endpointName === "ward") setWardOptions([]);
            if (endpointName === "type") setTypeOptions([]);
            if (endpointName === "officer") setOfficerOptions([]);
            if (endpointName === "status") setStatusOptions([]);
            // if (endpointName === "prabhag") setPrabhagOptions([]);
          }
        });
      } catch (error) {
        console.error(error);
        setWardOptions([]);
        setTypeOptions([]);
        setOfficerOptions([]);
        setStatusOptions([]);
        // setPrabhagOptions([]);
      } finally {
        setLoading(false);
        setLoader(false);
      }
    };

    fetchDropdowns();
  }, [filters]);

  // const handleDateChange = (e) => {
  //   const { name, value } = e.target;
  //   if (value) {
  //     const [year, month, day] = value.split("-");
  //     const months = [
  //       "JAN",
  //       "FEB",
  //       "MAR",
  //       "APR",
  //       "MAY",
  //       "JUN",
  //       "JUL",
  //       "AUG",
  //       "SEP",
  //       "OCT",
  //       "NOV",
  //       "DEC",
  //     ];
  //     const formatted = `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
  //     onFilterChange({ ...filters, [name]: formatted });
  //   } else {
  //     onFilterChange({ ...filters, [name]: "" });
  //   }
  // };

  const handleDateChange = (e) => {
  const { name, value } = e.target;

  const currentFrom =
    name === "fromDate"
      ? value
      : toDateInputValue(filters.fromDate);

  const currentTo =
    name === "toDate"
      ? value
      : toDateInputValue(filters.toDate);

  if (
    currentFrom &&
    currentTo &&
    new Date(currentFrom) > new Date(currentTo)
  ) {
    alert("From Date cannot be greater than To Date");
    return;
  }

  if (value) {
    const [year, month, day] = value.split("-");

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

    const formatted = `${day}-${months[parseInt(month, 10) - 1]}-${year}`;

    onFilterChange({
      ...filters,
      [name]: formatted,
    });
  } else {
    onFilterChange({
      ...filters,
      [name]: "",
    });
  }
};
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const getFinancialYearDates = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    let financialYearStart;
    if (currentMonth < 3) {
      financialYearStart = new Date(currentYear - 1, 3, 1);
    } else {
      financialYearStart = new Date(currentYear, 3, 1);
    }

    // Format dates as dd-MON-yyyy
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

  const handleReset = () => {
    const { fromDate: defaultFromDate, toDate: defaultToDate } =
      getFinancialYearDates();

    onFilterChange({
      fromDate: defaultFromDate,
      toDate: defaultToDate,
      ward: "",
      department: "",
      type: "",
      officer: "",
      status: "",
    });
  };

  if (loading) return <div className="filter-bar">Loading filters...</div>;

  return (
    <form
      className="filter-bar"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        alignItems: "flex-end",
      }}
    >
      {/* From Date */}
      <div className="filter-group" style={{ flex: 1, minWidth: 0 }}>
        <label className="filter-label">From</label>
        <input
          type="date"
          name="fromDate"
          value={toDateInputValue(filters.fromDate)}
          onChange={handleDateChange}
          className="filter-select"
        />
      </div>

      {/* To Date */}
      <div className="filter-group" style={{ flex: 1, minWidth: 0 }}>
        <label className="filter-label">To</label>
        <input
          type="date"
          name="toDate"
          value={toDateInputValue(filters.toDate)}
          onChange={handleDateChange}
          className="filter-select"
        />
      </div>

      {/* विभाग */}
      <div className="filter-group" style={{ flex: 1, minWidth: 0 }}>
        <label className="filter-label">विभाग</label>
        <select
          name="department"
          value={filters.department}
          onChange={handleSelectChange}
          className="filter-select"
        >
          <option value="">सर्व</option>
          {wardOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* सेवा प्रकार */}
      <div className="filter-group" style={{ flex: 1.2, minWidth: 0 }}>
        <label className="filter-label">सेवा प्रकार</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleSelectChange}
          className="filter-select"
        >
          <option value="">सर्व</option>
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* प्रभाग */}
      <div className="filter-group" style={{ flex: 1, minWidth: 0 }}>
        <label className="filter-label">प्रभाग</label>
        <select
          name="ward"
          value={filters.ward}
          onChange={handleSelectChange}
          className="filter-select"
        >
          <option value="">सर्व</option>
          <option value="Ho">HO</option>
          {/* {prabhagOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))} */}
        </select>
      </div>

      {/* अधिकारी */}
      <div className="filter-group" style={{ flex: 1, minWidth: 0 }}>
        <label className="filter-label">अधिकारी</label>
        <select
          name="officer"
          value={filters.officer}
          onChange={handleSelectChange}
          className="filter-select"
        >
          <option value="">सर्व</option>
          {officerOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="filter-group" style={{ flex: 1, minWidth: 0 }}>
        <label className="filter-label">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleSelectChange}
          className="filter-select"
        >
          <option value="">सर्व</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset button */}
      <button
        type="button"
        className="reset-btn"
        onClick={handleReset}
      >
        ↻ Reset
      </button>
    </form>
  );
}
