import React, { useState, useEffect } from "react";
import { kpiCards } from "../data/dummyData";
import {
  FileText, // doc
  Check, // check
  Clock, // clock
  AlertCircle, // alert
  Target, // target
  Award, // badge
  File, // file
  Settings, // gear
} from "lucide-react";
import apiClient from "../services/apiClient";

// Map your icon keys to Lucide components
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

export default function KpiRow() {

  const [kpiCards, setKpiCards] = useState([]);

  const fetchCardsData = async () => {
    try {
      const response = await apiClient.get(`/rts-dashboard/counts`);
      if (response.success) {
        const updatedCards = [
          { id: 'total', icon: 'doc', label: 'एकूण प्राप्त अर्ज', value: `${response?.data?.total_applications || 0}`, color: '#2f7be3' },
          { id: 'disposed', icon: 'check', label: 'निकाली अर्ज', value: `${response?.data?.approved_applications || 0}`, color: '#22a06b' },
          { id: 'pending', icon: 'clock', label: 'प्रलंबित अर्ज', value: `${response?.data?.pending_applications || 0}`, color: '#ee8f1a' },
          { id: 'delayed', icon: 'alert', label: 'विलंबित प्रकरणे', value: `${response?.data?.delayed_applications || 0}`, color: '#e23b3b' },
          { id: 'ontime', icon: 'target', label: 'वेळेत निकाली (%)', value: `${response?.data?.approved_percentage || 0}%`, color: '#16a34a' },
          { id: 'e6', icon: 'badge', label: 'आज प्राप्त अर्ज', value: `${response?.data?.todays_applications || 0}`, color: '#f0a020' },
          { id: 'e7', icon: 'file', label: 'आज निकाली अर्ज', value: `${response?.data?.todays_approved || 0}`, color: '#7c3aed' },
          { id: 'rts', icon: 'gear', label: 'RTS तक्रारी', value: '0', color: '#0ea5a5' }
        ]

        setKpiCards(updatedCards);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCardsData();
  }, [])

  return (
    <div className="kpi-row">
      {kpiCards.map((k) => {
        const IconComponent = iconComponents[k.icon] || FileText; // fallback
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
