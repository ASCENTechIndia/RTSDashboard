import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export default function FilterBar() {
  const [wardOptions, setWardOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [officerOptions, setOfficerOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    ward: "",
    department: "",
    type: "",
    office: "",
    officer: "",
    status: "",
  });

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
          endpoints.map((e) => e.request)
        );

        results.forEach((result, index) => {
          const endpointName = endpoints[index].name;
          if (result.status === "fulfilled" && result.value?.success) {
            const response = result.value;
            if (endpointName === "ward" && response.data?.rows) {
              const wards = response.data.rows.map((w) => ({
                label: w.WARDNAME,
                value: w.WARDID,
              }));
              setWardOptions(wards);
            } else if (endpointName === "type" && response.data?.rows) {
              const services = response.data.rows.map((s) => ({
                label: s.VAR_SERVICE_ENG_NAME,
                value: s.NUM_SERVICE_SERVICEID,
              }));
              setTypeOptions(services);
            } else if (endpointName === "officer" && response.data?.rows) {
              const users = response.data.rows.map((u) => ({
                label: u.VAR_USER_USERNAME,
                value: u.VAR_USER_USERNAME,
              }));
              setOfficerOptions(users);
            } else if (
              endpointName === "status" &&
              Array.isArray(response.data)
            ) {
              const statuses = response.data.map((s) => ({
                label: s.STATUS,
                value: s.STATUS,
              }));
              setStatusOptions(statuses);
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const formatted = formatDate(value);
    setFormData((prev) => ({ ...prev, [name]: formatted }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
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
    <form className="filter-bar">
      {/* From Date */}
      <div className="filter-group">
        <label className="filter-label">From</label>
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate ? formData.fromDate.split("-").reverse().join("-") : ""}
          onChange={handleDateChange}
          className="filter-select"
        />
      </div>

      {/* To Date */}
      <div className="filter-group">
        <label className="filter-label">To</label>
        <input
          type="date"
          name="toDate"
          value={formData.toDate ? formData.toDate.split("-").reverse().join("-") : ""}
          onChange={handleDateChange}
          className="filter-select"
        />
      </div>

      {/* विभाग */}
      <div className="filter-group">
        <label className="filter-label">विभाग</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">-- Select Department --</option>
          {wardOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* सेवा प्रकार */}
      <div className="filter-group">
        <label className="filter-label">सेवा प्रकार</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">-- Select Type --</option>
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* प्रभाग */}
      <div className="filter-group">
        <label className="filter-label">प्रभाग</label>
        <select
          name="ward"
          value={formData.ward}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">-- Select Ward --</option>
          <option value="Ho">HO</option>
        </select>
      </div>

      {/* अधिकारी */}
      <div className="filter-group">
        <label className="filter-label">अधिकारी</label>
        <select
          name="officer"
          value={formData.officer}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">-- Select Officer --</option>
          {officerOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="filter-group">
        <label className="filter-label">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">-- Select Status --</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset button */}
      <button type="button" className="reset-btn" onClick={handleReset}>
        ↻ Reset
      </button>
    </form>
  );
}