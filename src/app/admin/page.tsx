"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";

export default function AdminDashboard() {
  const totalProducts = PRODUCTS.length;
  const organicCount = PRODUCTS.filter((p) => p.isOrganic).length;
  const lowStockProducts = PRODUCTS.filter((p) => p.stockCount <= 12);
  
  // Calculate mock total earnings
  const mockRevenue = 15843.90;
  const mockOrdersCount = 248;

  const mockRecentOrders = [
    {
      id: "SB-985412",
      customer: "Meskat Rahman",
      email: "fresh@meskat.me",
      date: "2 mins ago",
      total: 34.95,
      items: "Strawberry, Avocado, Wildflower Honey",
      status: "delivered",
    },
    {
      id: "SB-346781",
      customer: "Tasnim Ahmed",
      email: "tasnim@domain.com",
      date: "1 hour ago",
      total: 78.40,
      items: "Matcha Powder, Goat Cheese, Mint",
      status: "processing",
    },
    {
      id: "SB-110295",
      customer: "Zayed Abdullah",
      email: "zayed@gmail.com",
      date: "3 hours ago",
      total: 19.99,
      items: "Olive Oil, Romaine Lettuce",
      status: "delivered",
    },
    {
      id: "SB-883471",
      customer: "Sultana Kamal",
      email: "sultana@ymail.com",
      date: "Today, 10:24 AM",
      total: 24.99,
      items: "Matcha Powder",
      status: "pending",
    },
    {
      id: "SB-774391",
      customer: "Kazi Rafiq",
      email: "rafiq@outlook.com",
      date: "Yesterday",
      total: 112.50,
      items: "Strawberries (x3), Avocados (x2), Eggs",
      status: "delivered",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      {/* Welcome Banner */}
      <div className="admin-welcome-banner">
        <div className="welcome-text">
          <h1>Welcome Back, MZPlayz! <Sparkles className="welcome-spark" size={24} /></h1>
          <p>Here is what is happening at Sotej Bazaar today. Let's grow green businesses!</p>
        </div>
        <Link href="/admin/products" className="admin-btn-primary-sm">
          <Plus size={16} /> Add New Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Revenue</span>
            <div className="stat-card-icon-box rev">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <h2>${mockRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h2>
            <span className="stat-trend trend-up">
              <TrendingUp size={14} /> +12.4% <span className="trend-lbl">vs last month</span>
            </span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Order Harvests</span>
            <div className="stat-card-icon-box ord">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <h2>{mockOrdersCount}</h2>
            <span className="stat-trend trend-up">
              <TrendingUp size={14} /> +8.2% <span className="trend-lbl">vs last week</span>
            </span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Products Catalog</span>
            <div className="stat-card-icon-box prod">
              <Package size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <h2>{totalProducts}</h2>
            <span className="stat-sub-desc">
              <strong>{organicCount}</strong> Organic Certificates Active
            </span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Active Customers</span>
            <div className="stat-card-icon-box cust">
              <Users size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <h2>1,482</h2>
            <span className="stat-trend trend-down">
              <ArrowDownRight size={14} /> -1.5% <span className="trend-lbl">vs peak season</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid split */}
      <div className="admin-dashboard-layout">
        {/* Left Side: Recent Orders */}
        <div className="dashboard-card-panel main-panel">
          <div className="panel-header">
            <h3>Recent Order Harvests</h3>
            <Link href="/admin/orders" className="panel-view-all">
              View All Orders <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items Sourced</th>
                  <th>Billing</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-bold text-white">{order.id}</td>
                    <td>
                      <div className="customer-info-cell">
                        <span className="cust-name">{order.customer}</span>
                        <span className="cust-email">{order.email}</span>
                      </div>
                    </td>
                    <td className="text-muted">{order.items}</td>
                    <td className="font-bold text-emerald-400">${order.total.toFixed(2)}</td>
                    <td className="text-muted">{order.date}</td>
                    <td>
                      <span className={`status-badge-pill ${order.status}`}>
                        {order.status === "delivered" && <CheckCircle2 size={12} />}
                        {order.status === "processing" && <Clock size={12} />}
                        {order.status === "pending" && <AlertTriangle size={12} />}
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Quick Alerts & Mini stock review */}
        <div className="dashboard-card-panel side-panel">
          <div className="panel-header">
            <h3>Stock Health</h3>
            <span className="health-indicator warning">Requires Action</span>
          </div>
          <div className="stock-health-summary">
            <div className="health-donut-stats">
              <div className="donut-circle">
                <span className="donut-number">{lowStockProducts.length}</span>
                <span className="donut-label">Low Stock</span>
              </div>
              <div className="health-details">
                <p>Items with high demand but critically low reserves in standard hydro-packs:</p>
              </div>
            </div>

            <div className="stock-alerts-list">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="stock-alert-item">
                  <div className="alert-product-img">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="alert-product-details">
                    <h4>{product.name}</h4>
                    <span>Category: {product.category}</span>
                  </div>
                  <div className="alert-stock-pill warning">
                    {product.stockCount} left
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
          animation: fadeIn 0.4s ease-out;
        }

        /* Welcome Banner */
        .admin-welcome-banner {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.05));
          border: 1px dashed rgba(34, 197, 94, 0.3);
          border-radius: 16px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .welcome-text h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #f1f5f9;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }

        .welcome-spark {
          color: #4ade80;
          animation: pulse 2s infinite ease-in-out;
        }

        .welcome-text p {
          color: #94a3b8;
          font-size: 14px;
        }

        .admin-btn-primary-sm {
          background: #22c55e;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);
        }

        .admin-btn-primary-sm:hover {
          background: #16a34a;
          transform: translateY(-1px);
        }

        /* Stats Grid */
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .admin-stat-card {
          background: #131720;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.3s;
        }

        .admin-stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(34, 197, 94, 0.2);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-card-title {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-card-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-card-icon-box.rev { background: rgba(34, 197, 94, 0.1); color: #4ade80; }
        .stat-card-icon-box.ord { background: rgba(59, 130, 246, 0.1); color: #60a5fa; }
        .stat-card-icon-box.prod { background: rgba(168, 85, 247, 0.1); color: #c084fc; }
        .stat-card-icon-box.cust { background: rgba(245, 158, 11, 0.1); color: #fbbf24; }

        .stat-card-body h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #f1f5f9;
          margin-bottom: 6px;
        }

        .stat-trend {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .stat-trend.trend-up { background: rgba(74, 222, 128, 0.1); color: #4ade80; }
        .stat-trend.trend-down { background: rgba(248, 113, 113, 0.1); color: #f87171; }
        .trend-lbl { color: #64748b; font-weight: 500; margin-left: 2px; }

        .stat-sub-desc {
          font-size: 12px;
          color: #64748b;
        }

        .stat-sub-desc strong {
          color: #4ade80;
        }

        /* Layout panels */
        .admin-dashboard-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .admin-dashboard-layout {
            grid-template-columns: 1fr;
          }
        }

        .dashboard-card-panel {
          background: #131720;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 16px;
        }

        .panel-header h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #f1f5f9;
        }

        .panel-view-all {
          color: #4ade80;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .panel-view-all:hover {
          color: #22c55e;
        }

        /* Table design */
        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          font-size: 11px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .admin-table td {
          padding: 16px;
          font-size: 13px;
          color: #94a3b8;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: middle;
        }

        .font-bold { font-weight: 600; }
        .text-white { color: #f1f5f9; }
        .text-emerald-400 { color: #4ade80; }
        .text-muted { color: #64748b; }

        .customer-info-cell {
          display: flex;
          flex-direction: column;
        }

        .cust-name {
          font-weight: 600;
          color: #f1f5f9;
        }

        .cust-email {
          font-size: 11px;
          color: #475569;
        }

        .status-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: capitalize;
          padding: 4px 10px;
          border-radius: 100px;
        }

        .status-badge-pill.delivered { background: rgba(34, 197, 94, 0.1); color: #4ade80; }
        .status-badge-pill.processing { background: rgba(59, 130, 246, 0.1); color: #60a5fa; }
        .status-badge-pill.pending { background: rgba(245, 158, 11, 0.1); color: #fbbf24; }

        /* Stock Health Right Sidebar panel */
        .health-indicator.warning {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 3px 10px;
          border-radius: 100px;
        }

        .health-donut-stats {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          padding: 16px;
          border-radius: 12px;
        }

        .donut-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 4px solid #f59e0b;
          border-left-color: rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .donut-number {
          font-size: 16px;
          font-weight: 800;
          color: #f1f5f9;
        }

        .donut-label {
          font-size: 8px;
          color: #64748b;
          text-transform: uppercase;
        }

        .health-details p {
          font-size: 12px;
          color: #94a3b8;
          line-height: 1.5;
        }

        .stock-alerts-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .stock-alert-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          transition: all 0.2s;
        }

        .stock-alert-item:hover {
          background: rgba(255,255,255,0.04);
        }

        .alert-product-img {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          overflow: hidden;
          background: #000;
          flex-shrink: 0;
        }

        .alert-product-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .alert-product-details {
          flex-grow: 1;
        }

        .alert-product-details h4 {
          font-size: 13px;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 2px;
        }

        .alert-product-details span {
          font-size: 11px;
          color: #64748b;
        }

        .alert-stock-pill.warning {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 100px;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
