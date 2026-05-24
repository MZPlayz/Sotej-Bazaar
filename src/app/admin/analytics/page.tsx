"use client";

import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Award,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  Calendar,
  Layers,
  Leaf,
} from "lucide-react";

export default function AdminAnalytics() {
  const [timeframe, setTimeframe] = useState("This Month");

  const monthlySales = [
    { month: "Jan", sales: 4200, orders: 120, carbonSaved: 85 },
    { month: "Feb", sales: 5100, orders: 145, carbonSaved: 98 },
    { month: "Mar", sales: 7800, orders: 190, carbonSaved: 140 },
    { month: "Apr", sales: 6900, orders: 175, carbonSaved: 110 },
    { month: "May", sales: 9854, orders: 248, carbonSaved: 185 },
    { month: "Jun", sales: 12000, orders: 310, carbonSaved: 240 }
  ];

  const categoryShare = [
    { name: "Fruits", share: 40, color: "#22c55e" },
    { name: "Vegetables", share: 25, color: "#10b981" },
    { name: "Dairy & Eggs", share: 15, color: "#fbbf24" },
    { name: "Pantry & Groceries", share: 12, color: "#c084fc" },
    { name: "Herbs & Drinks", share: 8, color: "#60a5fa" }
  ];

  const maxSales = Math.max(...monthlySales.map((m) => m.sales));

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <div>
          <h1 className="admin-title">Carbon & Revenue Analytics</h1>
          <p className="admin-subtitle">Monitor financial metrics, sustainable metrics, and regional environmental footprint impact.</p>
        </div>
        <div className="timeframe-select">
          <Calendar size={16} />
          <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
            <option>This Week</option>
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Overview impact cards */}
      <div className="analytics-metrics-grid">
        <div className="metrics-card">
          <div className="card-top">
            <span>CO2 Carbon Offsets</span>
            <Leaf size={18} className="leaf-green" />
          </div>
          <h3>858 kg</h3>
          <p className="trend positive">
            <TrendingUp size={14} /> +24% <span className="lbl">vs last period</span>
          </p>
        </div>

        <div className="metrics-card">
          <div className="card-top">
            <span>Gourmet Basket Size</span>
            <Layers size={18} className="icon-purple" />
          </div>
          <h3>$64.80</h3>
          <p className="trend positive">
            <TrendingUp size={14} /> +12.5% <span className="lbl">average value</span>
          </p>
        </div>

        <div className="metrics-card">
          <div className="card-top">
            <span>Co-Op Harvest Yield</span>
            <Award size={18} className="icon-gold" />
          </div>
          <h3>98.4%</h3>
          <p className="trend positive">
            <TrendingUp size={14} /> +1.2% <span className="lbl">successful harvests</span>
          </p>
        </div>
      </div>

      {/* Visual Chart Sections */}
      <div className="analytics-charts-grid">
        {/* Sales Performance Visualizer Bar Chart */}
        <div className="dashboard-card-panel sales-chart-panel">
          <div className="panel-top">
            <div>
              <h3>Monthly Harvesting Sales</h3>
              <p>Combined revenue and organic orders catalog performance.</p>
            </div>
            <span className="premium-label"><Sparkles size={12} /> High Yield</span>
          </div>

          <div className="chart-bar-visualizer">
            <div className="bars-y-axis">
              <span>${(maxSales).toLocaleString()}</span>
              <span>${(maxSales/2).toLocaleString()}</span>
              <span>$0</span>
            </div>
            
            <div className="bars-container">
              {monthlySales.map((data, idx) => {
                const heightPercentage = (data.sales / maxSales) * 100;
                return (
                  <div key={idx} className="chart-bar-column">
                    <div className="bar-wrapper">
                      <div className="bar-tooltip">
                        <span>Sales: ${data.sales.toLocaleString()}</span>
                        <span>Orders: {data.orders}</span>
                      </div>
                      <div 
                        className="bar-fill"
                        style={{ height: `${heightPercentage}%` }}
                      />
                    </div>
                    <span className="bar-label">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Share & Carbon Saved panel */}
        <div className="dashboard-card-panel categories-donut-panel">
          <div className="panel-top">
            <h3>Boutique Categories Market Share</h3>
          </div>

          <div className="categories-list-progress">
            {categoryShare.map((cat, idx) => (
              <div key={idx} className="category-progress-row">
                <div className="category-info-lbl">
                  <span className="dot" style={{ background: cat.color }} />
                  <span className="name">{cat.name}</span>
                  <span className="share-pct">{cat.share}%</span>
                </div>
                <div className="progress-bar-track">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${cat.share}%`, background: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="carbon-offset-info-box">
            <div className="offset-icon">
              <Leaf size={24} />
            </div>
            <div className="offset-details">
              <h4>Green Shipping Contribution</h4>
              <p>Every delivery made via our standard packaging saves roughly 2.4kg of packaging emissions compared to standard e-commerce setups.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .analytics-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
          animation: fadeIn 0.4s ease-out;
        }

        .analytics-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .timeframe-select {
          background: #131720;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #94a3b8;
        }

        .timeframe-select select {
          background: transparent;
          border: none;
          color: #f1f5f9;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }

        /* Overview cards */
        .analytics-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }

        .metrics-card {
          background: #131720;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
        }

        .leaf-green { color: #22c55e; }
        .icon-purple { color: #c084fc; }
        .icon-gold { color: #fbbf24; }

        .metrics-card h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #f1f5f9;
        }

        .trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 700;
        }

        .trend.positive { color: #4ade80; }
        .trend .lbl { color: #64748b; font-weight: 500; }

        /* Charts grid */
        .analytics-charts-grid {
          display: grid;
          grid-template-columns: 2fr 1.2fr;
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .analytics-charts-grid {
            grid-template-columns: 1fr;
          }
        }

        .panel-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .panel-top h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 4px;
        }

        .panel-top p {
          font-size: 13px;
          color: #64748b;
        }

        .premium-label {
          background: rgba(34, 197, 94, 0.1);
          color: #4ade80;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 10px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Custom bar chart */
        .chart-bar-visualizer {
          display: flex;
          height: 240px;
          gap: 20px;
          padding-top: 10px;
        }

        .bars-y-axis {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 10px;
          color: #475569;
          text-align: right;
          width: 50px;
          padding-bottom: 24px;
        }

        .bars-container {
          flex-grow: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 4px;
        }

        .chart-bar-column {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
        }

        .bar-wrapper {
          width: 32px;
          height: 100%;
          display: flex;
          align-items: flex-end;
          position: relative;
          cursor: pointer;
        }

        .bar-fill {
          width: 100%;
          background: linear-gradient(to top, #16a34a, #4ade80);
          border-radius: 6px 6px 0 0;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bar-wrapper:hover .bar-fill {
          filter: brightness(1.2);
          box-shadow: 0 0 12px rgba(74, 222, 128, 0.4);
        }

        .bar-tooltip {
          position: absolute;
          bottom: 105%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: #0f1117;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          z-index: 10;
          width: max-content;
          transition: all 0.2s;
        }

        .bar-wrapper:hover .bar-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .bar-tooltip span {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
        }

        .bar-tooltip span:first-child {
          color: #4ade80;
          font-weight: 700;
        }

        .bar-label {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          margin-top: 8px;
        }

        /* Categories Share details list */
        .categories-list-progress {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .category-progress-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .category-info-lbl {
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: 600;
        }

        .category-info-lbl .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
        }

        .category-info-lbl .name {
          color: #94a3b8;
          flex-grow: 1;
        }

        .category-info-lbl .share-pct {
          color: #f1f5f9;
        }

        .progress-bar-track {
          height: 6px;
          background: rgba(255,255,255,0.04);
          border-radius: 99px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 99px;
        }

        .carbon-offset-info-box {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(255,255,255,0.01));
          border: 1px dashed rgba(34, 197, 94, 0.2);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          gap: 12px;
        }

        .offset-icon {
          color: #4ade80;
          flex-shrink: 0;
        }

        .offset-details h4 {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 4px;
        }

        .offset-details p {
          font-size: 11px;
          color: #94a3b8;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
