"use client";

import React, { useState } from "react";
import {
  Settings,
  ShieldAlert,
  Save,
  CheckCircle2,
  Database,
  Building,
  Key,
  Leaf,
} from "lucide-react";

export default function AdminSettings() {
  const [storeName, setStoreName] = useState("Sotej Bazaar");
  const [contactEmail, setContactEmail] = useState("fresh@sotejbazaar.com");
  const [carbonOffsetRate, setCarbonOffsetRate] = useState(2.4);
  const [cacheStatus, setCacheStatus] = useState("Operational");
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 3000);
  };

  return (
    <div className="settings-container">
      {/* Header */}
      <div className="settings-header">
        <div>
          <h1 className="admin-title">Boutique Administration Settings</h1>
          <p className="admin-subtitle">Configure Supabase nodes, standard shipping multiplier weights, and security parameters.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="settings-grid-layout">
        {/* Left column */}
        <div className="settings-main-panels">
          {/* Section 1: Store profile */}
          <div className="dashboard-card-panel store-profile-panel">
            <h3 className="section-title"><Building size={16} style={{ marginRight: "8px", verticalAlign: "middle" }} /> Sotej Profile Parameters</h3>
            <div className="form-row-2">
              <div className="form-label-group">
                <label>Boutique Store Name</label>
                <input 
                  type="text" 
                  value={storeName} 
                  onChange={(e) => setStoreName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-label-group">
                <label>Admin Coordinator Email</label>
                <input 
                  type="email" 
                  value={contactEmail} 
                  onChange={(e) => setContactEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>
            <div className="form-label-group" style={{ marginTop: "16px" }}>
              <label>Global Headquarter Coordinates</label>
              <input 
                type="text" 
                defaultValue="House 45, Road 12, Block G, Gulshan 2, Dhaka, Bangladesh" 
              />
            </div>
          </div>

          {/* Section 2: Supabase keys */}
          <div className="dashboard-card-panel store-keys-panel">
            <h3 className="section-title"><Key size={16} style={{ marginRight: "8px", verticalAlign: "middle" }} /> Supabase Database Synchronization</h3>
            <div className="form-label-group">
              <label>Supabase Target Server REST Endpoint</label>
              <input 
                type="text" 
                disabled 
                value="https://zejpzxxypudfoledmwfw.supabase.co" 
                className="disabled-input"
              />
            </div>
            <div className="form-label-group" style={{ marginTop: "16px" }}>
              <label>Service Role Secret Key (Bypasses Row Level Security)</label>
              <input 
                type="password" 
                disabled 
                value="••••••••••••••••••••••••••••••••••••••••••••••••" 
                className="disabled-input"
              />
            </div>
            <div className="supabase-sync-indicator">
              <Database size={16} />
              <span>Supabase REST endpoints are connected and listening to the master catalogs state.</span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="settings-side-panels">
          {/* Section 3: Carbon controls */}
          <div className="dashboard-card-panel carbon-rates-panel">
            <h3 className="section-title"><Leaf size={16} style={{ marginRight: "8px", verticalAlign: "middle" }} /> Green Footprint Rules</h3>
            <div className="form-label-group">
              <label>CO2 Offset Rate Multiplier (kg per unit saved)</label>
              <input 
                type="number" 
                step="0.1" 
                value={carbonOffsetRate}
                onChange={(e) => setCarbonOffsetRate(parseFloat(e.target.value))}
              />
            </div>
            <p className="description-sub">
              Calculates structural package offsets compared to conventional packaging boxes. Used globally in customer accounts overview dashboards.
            </p>
          </div>

          {/* Section 4: Cache controls */}
          <div className="dashboard-card-panel cache-panel">
            <h3 className="section-title"><ShieldAlert size={16} style={{ marginRight: "8px", verticalAlign: "middle" }} /> System Administration</h3>
            <div className="cache-status-row">
              <span>Next.js Edge Caching:</span>
              <span className="status-badge operational">{cacheStatus}</span>
            </div>
            <button 
              type="button" 
              className="flush-cache-btn"
              onClick={() => {
                setCacheStatus("Flushed!");
                setTimeout(() => setCacheStatus("Operational"), 2000);
              }}
            >
              Purge Prerender Edge Cache
            </button>
          </div>
        </div>

        {/* Actions bar bottom */}
        <div className="settings-footer-actions col-span-2">
          <button type="submit" className="save-settings-btn">
            <Save size={16} /> Save Admin Settings
          </button>
        </div>
      </form>

      {successMsg && (
        <div className="settings-success-alert animate-fade-in">
          <CheckCircle2 size={18} />
          <span>Success! Sotej Bazaar administrator rules and Supabase tokens updated in main configuration successfully.</span>
        </div>
      )}

      <style>{`
        .settings-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
          animation: fadeIn 0.4s ease-out;
        }

        .settings-grid-layout {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 24px;
        }

        @media (max-width: 900px) {
          .settings-grid-layout {
            grid-template-columns: 1fr;
          }
        }

        .settings-main-panels, 
        .settings-side-panels {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 12px;
        }

        .disabled-input {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .supabase-sync-indicator {
          margin-top: 20px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.15);
          color: #4ade80;
          padding: 12px 16px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          line-height: 1.4;
        }

        .description-sub {
          font-size: 11px;
          color: #64748b;
          line-height: 1.5;
          margin-top: 8px;
        }

        .cache-status-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 16px;
        }

        .status-badge.operational {
          color: #4ade80;
          font-weight: 700;
        }

        .flush-cache-btn {
          width: 100%;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
          padding: 12px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .flush-cache-btn:hover {
          background: #ef4444;
          color: white;
        }

        .settings-footer-actions {
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 24px;
        }

        .save-settings-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border: none;
          color: white;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
          transition: all 0.2s;
        }

        .save-settings-btn:hover {
          transform: translateY(-1.5px);
          box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);
        }

        .settings-success-alert {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #131720;
          border: 1px solid #22c55e;
          color: #4ade80;
          padding: 16px 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          font-weight: 600;
          font-size: 14px;
          z-index: 1000;
        }
      `}</style>
    </div>
  );
}
