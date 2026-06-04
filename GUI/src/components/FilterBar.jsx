import React, { useState } from "react";

export default function FilterBar() {
  // ----- Separate state arrays for each dropdown's options (dummy data) -----
  const [dateOptions] = useState([
    { label: "01/04/2025 - 25/05/2025", value: "01/04/2025 - 25/05/2025" },
    { label: "अप्रैल 2025", value: "01/04/2025 - 30/04/2025" },
    { label: "मई 2025", value: "01/05/2025 - 31/05/2025" },
  ]);

  const [wardOptions] = useState([
    { label: "सर्व", value: "सर्व" },
    { label: "प्रभाग १", value: "प्रभाग १" },
    { label: "प्रभाग २", value: "प्रभाग २" },
    { label: "प्रभाग ३", value: "प्रभाग ३" },
  ]);

  const [departmentOptions] = useState([
    { label: "सर्व", value: "सर्व" },
    { label: "विभाग अ", value: "विभाग अ" },
    { label: "विभाग ब", value: "विभाग ब" },
  ]);

  const [typeOptions] = useState([
    { label: "सर्व", value: "सर्व" },
    { label: "प्रकार १", value: "प्रकार १" },
    { label: "प्रकार २", value: "प्रकार २" },
  ]);

  const [officeOptions] = useState([
    { label: "सर्व", value: "सर्व" },
    { label: "मुख्य कार्यालय", value: "मुख्य कार्यालय" },
    { label: "क्षेत्रीय कार्यालय", value: "क्षेत्रीय कार्यालय" },
  ]);

  const [officerOptions] = useState([
    { label: "सर्व", value: "सर्व" },
    { label: "अधिकारी संजय", value: "अधिकारी संजय" },
    { label: "अधिकारी प्रीति", value: "अधिकारी प्रीति" },
  ]);

  const [statusOptions] = useState([
    { label: "सर्व", value: "सर्व" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ]);

  // ----- Single form state for all selected values -----
  const [formData, setFormData] = useState({
    date: "01/04/2025 - 25/05/2025",
    ward: "सर्व",
    department: "सर्व",
    type: "सर्व",
    office: "सर्व",
    officer: "सर्व",
    status: "सर्व",
  });

  // Update handler for all selects
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset all to initial values
  const handleReset = () => {
    setFormData({
      date: "01/04/2025 - 25/05/2025",
      ward: "सर्व",
      department: "सर्व",
      type: "सर्व",
      office: "सर्व",
      officer: "सर्व",
      status: "सर्व",
    });
  };

  return (
    <form className="filter-bar">
      {/* दिनांक */}
      <div className="filter-group">
        <label className="filter-label">दिनांक</label>
        <select
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="filter-select"
        >
          {dateOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
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
          {departmentOptions.map((opt) => (
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
          {wardOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      

     

      {/* कार्यालय */}
      {/* <div className="filter-group">
        <label className="filter-label">कार्यालय</label>
        <select
          name="office"
          value={formData.office}
          onChange={handleChange}
          className="filter-select"
        >
          {officeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div> */}

      {/* अधिकारी */}
      <div className="filter-group">
        <label className="filter-label">अधिकारी</label>
        <select
          name="officer"
          value={formData.officer}
          onChange={handleChange}
          className="filter-select"
        >
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
