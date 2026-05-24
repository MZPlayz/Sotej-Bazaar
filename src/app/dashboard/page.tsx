"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  Settings,
  ShieldCheck,
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "settings">("overview");

  // Setting States
  const [profile, setProfile] = useState({
    name: "Meskat Rahman",
    email: "fresh@meskat.me",
    phone: "+880 1712 345678",
    address: "House 45, Road 12, Block G, Gulshan 2",
    city: "Dhaka",
    zipCode: "1212"
  });

  const [settingsSuccess, setSettingsSuccess] = useState(false);

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSuccess(true);
    setTimeout(() => {
      setSettingsSuccess(false);
    }, 3000);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const mockOrders = [
    {
      id: "SB-985412",
      date: "May 20, 2026",
      total: 34.95,
      itemsCount: 4,
      status: "delivered",
      method: "Eco-Courier Standard"
    },
    {
      id: "SB-346781",
      date: "May 12, 2026",
      total: 78.40,
      itemsCount: 8,
      status: "delivered",
      method: "Express Hydro-Pack"
    },
    {
      id: "SB-110295",
      date: "April 28, 2026",
      total: 19.99,
      itemsCount: 2,
      status: "delivered",
      method: "Eco-Courier Standard"
    },
    {
      id: "SB-883471",
      date: "Active (Today)",
      total: 24.99,
      itemsCount: 1,
      status: "processing",
      method: "Express Hydro-Pack"
    }
  ];

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "36px", fontWeight: "800", color: "var(--primary-dark)" }}>Your Sotej Account</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>Track your real-time carbon offsets, check express deliveries, and configure coordinates.</p>
      </div>

      <div className="dashboard-grid animate-fade-in">
        {/* Left Sidebar navigation */}
        <aside className="dashboard-sidebar-menu animate-slide-up">
          <div className="user-profile-summary">
            <div className="user-avatar-circle">
              MR
            </div>
            <h4>{profile.name}</h4>
            <span style={{ display: "inline-block", background: "var(--primary-light)", color: "var(--primary)", fontSize: "10px", fontWeight: "bold", padding: "4px 10px", borderRadius: "100px", marginTop: "6px", textTransform: "uppercase" }}>
              🏆 SOTEJ GOLD MEMBER
            </span>
          </div>

          <ul className="sidebar-menu-list">
            <li>
              <button
                onClick={() => setActiveTab("overview")}
                className={`menu-item-btn ${activeTab === "overview" ? "active" : ""}`}
              >
                <Compass className="menu-item-btn-icon" size={16} />
                Overview & Impact
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`menu-item-btn ${activeTab === "orders" ? "active" : ""}`}
              >
                <ShoppingBag className="menu-item-btn-icon" size={16} />
                Order Harvests ({mockOrders.length})
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("settings")}
                className={`menu-item-btn ${activeTab === "settings" ? "active" : ""}`}
              >
                <Settings className="menu-item-btn-icon" size={16} />
                Boutique Settings
              </button>
            </li>
          </ul>
        </aside>

        {/* Right Content Panel */}
        <div className="dashboard-content-box animate-slide-up">
          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="animate-fade-in">
              <h3 className="dashboard-section-title">Healthy Living Impact</h3>
              
              {/* Organic stats grid */}
              <div className="dashboard-stats-grid">
                <div className="stat-card">
                  <div className="stat-icon-wrapper">
                    <ShoppingBag size={20} />
                  </div>
                  <div className="stat-info">
                    <h5>TOTAL INVESTED</h5>
                    <p>$158.33</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="stat-info">
                    <h5>ECO PACKS SAVED</h5>
                    <p>32 pack units</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper">
                    <MapPin size={20} />
                  </div>
                  <div className="stat-info">
                    <h5>FARM CO-OPS SAVED</h5>
                    <p>4 local farms</p>
                  </div>
                </div>
              </div>

              {/* Bio summary */}
              <div style={{ backgroundColor: "var(--primary-light)", border: "1px dashed var(--accent-mint)", padding: "24px", borderRadius: "var(--radius-sm)", marginBottom: "40px" }}>
                <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "16px", marginBottom: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                  <Sparkles size={16} style={{ color: "var(--accent-mint)" }} /> Sotej Green Footprint
                </h4>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6" }}>
                  Meskat, your choices make a difference. By opting for raw wildflower honeys, organic matchas, and Horizontally aquaponic romaine lettuces, you have directly saved local Bangladeshi farm cooperatives and offset approximately 12.8 kg of industrial delivery emissions. We thank you for choosing pesticide-free health.
                </p>
              </div>

              {/* Quick overview orders */}
              <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "18px", marginBottom: "16px" }}>Recent Transactions</h4>
              <div className="history-orders-table-wrapper">
                <table className="history-orders-table">
                  <thead>
                    <tr>
                      <th>INVOICE</th>
                      <th>HARVEST DATE</th>
                      <th>BILLING</th>
                      <th>COURIER STYLE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.slice(0, 2).map((order) => (
                      <tr key={order.id}>
                        <td style={{ fontWeight: "700" }}>{order.id}</td>
                        <td>{order.date}</td>
                        <td style={{ fontWeight: "700", color: "var(--primary)" }}>${order.total.toFixed(2)}</td>
                        <td>{order.method}</td>
                        <td>
                          <span className={`order-status-badge ${order.status === "delivered" ? "status-delivered" : "status-processing"}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Orders */}
          {activeTab === "orders" && (
            <div className="animate-fade-in">
              <h3 className="dashboard-section-title">All Organic Harvest History</h3>
              
              <div className="history-orders-table-wrapper">
                <table className="history-orders-table">
                  <thead>
                    <tr>
                      <th>INVOICE ID</th>
                      <th>HARVEST DATE</th>
                      <th>ITEMS COUNT</th>
                      <th>BILLING</th>
                      <th>COURIER METHOD</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id}>
                        <td style={{ fontWeight: "700" }}>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.itemsCount} items</td>
                        <td style={{ fontWeight: "700", color: "var(--primary)" }}>${order.total.toFixed(2)}</td>
                        <td>{order.method}</td>
                        <td>
                          <span className={`order-status-badge ${order.status === "delivered" ? "status-delivered" : "status-processing"}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Settings */}
          {activeTab === "settings" && (
            <div className="animate-fade-in">
              <h3 className="dashboard-section-title">Boutique Coordinates</h3>
              
              <form onSubmit={handleSettingsSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="form-label-group">
                  <label htmlFor="name">Full Profile Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-label-group">
                  <label htmlFor="email">Registered Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-label-group">
                  <label htmlFor="phone">Hotline Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-label-group">
                  <label htmlFor="city">City Location</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={profile.city}
                    onChange={handleProfileChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-label-group col-span-2">
                  <label htmlFor="address">Physical Organic Delivery Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleProfileChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-label-group col-span-2" style={{ marginTop: "10px" }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: "14px 28px" }}>
                    Update Coordinates Securely
                  </button>
                </div>
              </form>

              {settingsSuccess && (
                <div className="animate-fade-in" style={{ backgroundColor: "var(--primary-light)", border: "1.5px solid var(--accent-mint)", color: "var(--primary-dark)", padding: "12px 18px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: "10px", marginTop: "20px", fontWeight: "600", fontSize: "14px" }}>
                  <ShieldCheck size={18} style={{ color: "var(--accent-mint)" }} />
                  <span>Success! Your physical coordinates and carbon footprint weights were updated successfully in Sotej HQs.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
