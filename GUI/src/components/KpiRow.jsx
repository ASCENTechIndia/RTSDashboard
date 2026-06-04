import React, { useState, useEffect } from "react";
import {
  FileText,
  Check,
  Clock,
  AlertCircle,
  Target,
  Award,
  File,
  Settings,
} from "lucide-react";
import apiClient from "../services/apiClient";
import { useLoader } from "../context/LoaderContext";

const iconComponents = {
  doc: FileText,
  check: Check,
  clock: Clock,
  alert: AlertCircle,
  target: Target,
  badge: Award,
  file: File,
  gear: Settings,
};

export default function KpiRow({ filters }) {
  const { setLoader } = useLoader();
  const [kpiCards, setKpiCards] = useState([]);

  const fetchCardsData = async () => {
    setLoader(true);
    try {
      setLoader(true);
      const params = new URLSearchParams();
      if (filters.fromDate) params.append("fromDate", filters.fromDate);
      if (filters.toDate) params.append("toDate", filters.toDate);
      if (filters.ward) params.append("wardName", filters.ward);
      if (filters.status) params.append("status", filters.status);
      if (filters.type) params.append("serviceName", filters.type);
      if (filters.officer) params.append("officerName", filters.officer);

      const queryString = params.toString();
      const countsEndpoint = `/rts-dashboard/counts${queryString ? `?${queryString}` : ""}`;
      const countsResponse = await apiClient.get(countsEndpoint);

      let rtsValue = 0;
      try {
        const rtsResponse = await apiClient.get(
          "/rts-dashboard/getRTSComplaints",
        );
        if (rtsResponse.success && rtsResponse.data && rtsResponse.data[0]) {
          rtsValue = rtsResponse.data[0].RTS_COMPLAINTS || 0;
        }
      } catch (rtsErr) {
        console.error("Error fetching RTS complaints:", rtsErr);
      }

      if (countsResponse.success && countsResponse.data) {
        const d = countsResponse.data;
        const getCount = (arr) => (arr && arr[0]?.CNT) || 0;

        const updatedCards = [
          {
            id: "total",
            icon: "doc",
            label: "एकूण प्राप्त अर्ज",
            value: getCount(d.total_applications),
            color: "#2f7be3",
          },
          {
            id: "disposed",
            icon: "check",
            label: "निकाली अर्ज",
            value: getCount(d.approved_applications),
            color: "#22a06b",
          },
          {
            id: "pending",
            icon: "clock",
            label: "प्रलंबित अर्ज",
            value: getCount(d.pending_applications),
            color: "#ee8f1a",
          },
          {
            id: "delayed",
            icon: "alert",
            label: "विलंबित प्रकरणे",
            value: getCount(d.delayed_applications),
            color: "#e23b3b",
          },
          {
            id: "ontime",
            icon: "target",
            label: "वेळेत निकाली (%)",
            value: `${getCount(d.approved_percentage)}%`,
            color: "#16a34a",
          },
          {
            id: "todayReceived",
            icon: "badge",
            label: "आज प्राप्त अर्ज",
            value: d.todays_applications ?? 0,
            color: "#f0a020",
          },
          {
            id: "todayDisposed",
            icon: "file",
            label: "आज निकाली अर्ज",
            value: d.todays_approved ?? 0,
            color: "#7c3aed",
          },
          {
            id: "rts",
            icon: "gear",
            label: "RTS तक्रारी",
            value: rtsValue,
            color: "#0ea5a5",
          },
        ];
        setKpiCards(updatedCards);
      }
    } catch (error) {
      console.error("Error fetching KPI data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCardsData();
  }, [filters]);

  return (
    <div className="kpi-row">
      {kpiCards.map((k) => {
        const IconComponent = iconComponents[k.icon] || FileText;
        return (
          <div key={k.id} className="kpi" style={{ "--kpi-color": k.color }}>
            <div className="kpi-top">
              <div className="icon" style={{ background: k.color }}>
                <IconComponent size={20} color="#ffffff" strokeWidth={1.5} />
              </div>
              <div className="kpi-value">
                <span
                  className="label"
                  style={{ color: k.color, fontSize: "11px" }}
                >
                  {k.label}
                </span>
                <span className="value" style={{ color: k.color }}>
                  {k.value}
                </span>
              </div>
            </div>
            <span
              className="view-link"
              style={{ textAlign: "center", fontSize: "10px", color: k.color }}
            >
              View Details ›
            </span>
          </div>
        );
      })}
    </div>
  );
}
