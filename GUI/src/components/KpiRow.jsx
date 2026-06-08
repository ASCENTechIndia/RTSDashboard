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
const ULBID = import.meta.env.VITE_ULBID;
export default function KpiRow({ filters }) {
  const { setLoader } = useLoader();
  const [totalValue, setTotalValue] = useState("");
  const [disposedValue, setDisposedValue] = useState("");
  const [pendingValue, setPendingValue] = useState("");
  const [delayedValue, setDelayedValue] = useState("");
  const [ontimeValue, setOntimeValue] = useState("");
  const [todayReceivedValue, setTodayReceivedValue] = useState("");
  const [todayDisposedValue, setTodayDisposedValue] = useState("");
  const [rtsValue, setRtsValue] = useState("");

  const buildParams = () => {
    const params = {};
    if (ULBID) params.ulbId = ULBID;
    if (filters.fromDate) params.fromDate = filters.fromDate;
    if (filters.toDate) params.toDate = filters.toDate;
    if (filters.ward) params.wardName = filters.ward;
    if (filters.status) params.status = filters.status;
    if (filters.type) params.serviceId = filters.type;
    if (filters.officer) params.username = filters.officer;
    if (filters.department) params.wardId = filters.department;
    return params;
  };

  const fetchCardsData = async () => {
    setLoader(true);
    try {
      const params = buildParams();

      const endpoints = [
        // `/topcounts/totalApplications`,
        // `/topcounts/approvedApplications`,
        // `/topcounts/pendingApplications`,
        // `/topcounts/delayedApplications`,
        `/rts-dashboard/getCommissionerSummary`, // this api will used for first four card + approved percentage
        `/rts-dashboard/applicationStatusSummary`,
        `/topcounts/todaysApplications`,
        // `/topcounts/todaysApproved`,
        `/rts-dashboard/getRTSComplaints`,
      ];

      const requests = endpoints.map((url) => apiClient.get(url, { params }));
      const results = await Promise.allSettled(requests);
      // if (results[0]?.status === "fulfilled" && results[0].value?.success) {
      //   const val = results[0].value.data?.total_applications ?? 0;
      //   setTotalValue(val.toLocaleString("en-IN"));
      // } else {
      //   setTotalValue("0");
      // }

      // if (results[1]?.status === "fulfilled" && results[1].value?.success) {
      //   const val = results[1].value.data?.approved_applications ?? 0;
      //   setDisposedValue(val.toLocaleString("en-IN"));
      // } else {
      //   setDisposedValue("0");
      // }

      // if (results[2]?.status === "fulfilled" && results[2].value?.success) {
      //   const val = results[2].value.data?.pending_applications ?? 0;
      //   setPendingValue(val.toLocaleString("en-IN"));
      // } else {
      //   setPendingValue("0");
      // }

      // if (results[3]?.status === "fulfilled" && results[3].value?.success) {
      //   const val = results[3].value.data?.delayed_applications ?? 0;
      //   setDelayedValue(val.toLocaleString("en-IN"));
      // } else {
      //   setDelayedValue(0);
      // }
      if (results[0]?.status === "fulfilled" && results[0].value?.success) {
        const val = results[0].value.data?.[0].TOTAL_APPLICATIONS ?? 0;
        setTotalValue(val.toLocaleString("en-IN"));
      } else {
        setTotalValue("0");
      }

      if (results[0]?.status === "fulfilled" && results[0].value?.success) {
        const val = results[0].value.data?.[0].APPROVED_APPLICATIONS ?? 0;
        setDisposedValue(val.toLocaleString("en-IN"));
      } else {
        setDisposedValue("0");
      }

      if (results[0]?.status === "fulfilled" && results[0].value?.success) {
        const val = results[0].value.data?.[0].PENDING_APPLICATIONS ?? 0;
        setPendingValue(val.toLocaleString("en-IN"));
      } else {
        setPendingValue("0");
      }

      if (results[0]?.status === "fulfilled" && results[0].value?.success) {
        const val = results[0].value.data?.[0].APPLICATIONS_GREATER15 ?? 0;
        setDelayedValue(val.toLocaleString("en-IN"));
      } else {
        setDelayedValue(0);
      }

      if (results[0]?.status === "fulfilled" && results[0].value?.success) {
        const val = results[0].value.data?.[0].APPROVED_PERCENTAGE ?? 0;
        setOntimeValue(`${val}%`);
      } else {
        setOntimeValue("0%");
      }

      if (results[2]?.status === "fulfilled" && results[2].value?.success) {
        const val = results[2].value.data?.todays_applications ?? 0;
        setTodayReceivedValue(val.toLocaleString("en-IN"));
      } else {
        setTodayReceivedValue("0");
      }

      if (results[2]?.status === "fulfilled" && results[2].value?.success) {
        const val = results[2].value.data?.approved_applications ?? 0;
        setTodayDisposedValue(val.toLocaleString("en-IN"));
      } else {
        setTodayDisposedValue("0");
      }

      if (results[3]?.status === "fulfilled" && results[3].value?.success) {
        const val = results[3].value.data?.[0]?.RTS_COMPLAINTS ?? 0;
        setRtsValue(val.toLocaleString("en-IN"));
      } else {
        setRtsValue("0");
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

  const kpiCards = [
    {
      id: "total",
      icon: "doc",
      label: "एकूण प्राप्त अर्ज",
      value: totalValue,
      color: "#2f7be3",
    },
    {
      id: "disposed",
      icon: "check",
      label: "निकाली अर्ज",
      value: disposedValue,
      color: "#22a06b",
    },
    {
      id: "pending",
      icon: "clock",
      label: "प्रलंबित अर्ज",
      value: pendingValue,
      color: "#ee8f1a",
    },
    {
      id: "delayed",
      icon: "alert",
      label: "विलंबित प्रकरणे",
      value: delayedValue,
      color: "#e23b3b",
    },
    {
      id: "ontime",
      icon: "target",
      label: "वेळेत निकाली (%)",
      value: ontimeValue,
      color: "#16a34a",
    },
    {
      id: "todayReceived",
      icon: "badge",
      label: "आज प्राप्त अर्ज",
      value: todayReceivedValue,
      color: "#f0a020",
    },
    {
      id: "todayDisposed",
      icon: "file",
      label: "आज निकाली अर्ज",
      value: todayDisposedValue,
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

  return (
    <div className="kpi-row card">
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
                  className="kpi-row-title"
                  style={{ color: k.color, fontSize: "10px" }}
                >
                  {k.label}
                </span>
                <span className="value" style={{ color: k.color }}>
                  {k.value}
                </span>
              </div>
            </div>
            {/* <span
              className="view-link"
              style={{ textAlign: "center", fontSize: "10px", color: k.color }}
            >
              View Details ›
            </span> */}
          </div>
        );
      })}
    </div>
  );
}
