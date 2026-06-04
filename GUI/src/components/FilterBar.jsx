import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export default function FilterBar({ filters, onFilterChange }) {
  const [wardOptions, setWardOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [officerOptions, setOfficerOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const endpoints = [
          { name: "ward", request: apiClient.get("/dropdowns/wards?ulbid=4") },
          {
            name: "type",
            request: apiClient.get("/dropdowns/services?ulbId=4"),
          },
          {
            name: "officer",
            request: apiClient.get("/dropdowns/users?ulbid=4"),
          },
          {
            name: "status",
            request: apiClient.get("/dropdowns/getStatusDropdown?ulbId=4"),
          },
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
                  value: w.WARDNAME,
                })),
              );
            } else if (endpointName === "type" && response.data?.rows) {
              setTypeOptions(
                response.data.rows.map((s) => ({
                  label: s.VAR_SERVICE_ENG_NAME,
                  value: s.VAR_SERVICE_ENG_NAME,
                })),
              );
            } else if (endpointName === "officer" && response.data?.rows) {
              setOfficerOptions(
                response.data.rows.map((u) => ({
                  label: u.VAR_USER_USERNAME,
                  value: u.VAR_USER_USERNAME,
                })),
              );
            } else if (
              endpointName === "status" &&
              Array.isArray(response.data)
            ) {
              setStatusOptions(
                response.data.map((s) => ({
                  label: s.STATUS,
                  value: s.STATUS,
                })),
              );
            } else {
              if (endpointName === "ward") setWardOptions([]);
              if (endpointName === "type") setTypeOptions([]);
              if (endpointName === "officer") setOfficerOptions([]);
              if (endpointName === "status") setStatusOptions([]);
            }
          } else {
            if (endpointName === "ward") setWardOptions([]);
            if (endpointName === "type") setTypeOptions([]);
            if (endpointName === "officer") setOfficerOptions([]);
            if (endpointName === "status") setStatusOptions([]);
          }
        });
      } catch (error) {
        console.error(error);
        setWardOptions([]);
        setTypeOptions([]);
        setOfficerOptions([]);
        setStatusOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdowns();
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
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
      onFilterChange({ ...filters, [name]: formatted });
    } else {
      onFilterChange({ ...filters, [name]: "" });
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleReset = () => {
    onFilterChange({
      fromDate: "",
      toDate: "",
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
        flexWrap: "nowrap",
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
          style={{ width: "100%" }}
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
          style={{ width: "100%" }}
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
          style={{ width: "100%" }}
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
          style={{ width: "100%" }}
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
          style={{ width: "100%" }}
        >
          <option value="">सर्व</option>
          <option value="Ho">HO</option>
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
          style={{ width: "100%" }}
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
          style={{ width: "100%" }}
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
        style={{ flex: "0 0 auto", whiteSpace: "nowrap" }}
      >
        ↻ Reset
      </button>
    </form>
  );
}
