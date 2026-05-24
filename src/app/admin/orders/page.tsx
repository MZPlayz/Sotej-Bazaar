"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Truck,
  Eye,
  Filter,
  Search,
  Download,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: "SB-985412",
      customer: "Meskat Rahman",
      email: "fresh@meskat.me",
      phone: "+880 1712 345678",
      date: "May 20, 2026",
      total: 34.95,
      itemsCount: 4,
      status: "delivered",
      method: "Eco-Courier Standard",
      items: [
        { name: "Fresh Organic Strawberries", qty: 1, price: 6.99 },
        { name: "Premium Hass Avocados", qty: 2, price: 7.49 },
        { name: "Crisp Organic Romaine Lettuce", qty: 1, price: 3.49 }
      ]
    },
    {
      id: "SB-346781",
      customer: "Tasnim Ahmed",
      email: "tasnim@domain.com",
      phone: "+880 1911 223344",
      date: "May 12, 2026",
      total: 78.40,
      itemsCount: 8,
      status: "delivered",
      method: "Express Hydro-Pack",
      items: [
        { name: "Ceremonial Grade Matcha Powder", qty: 2, price: 24.99 },
        { name: "Artisanal Goat Cheese Log", qty: 3, price: 8.99 }
      ]
    },
    {
      id: "SB-110295",
      customer: "Zayed Abdullah",
      email: "zayed@gmail.com",
      phone: "+880 1515 998877",
      date: "April 28, 2026",
      total: 19.99,
      itemsCount: 2,
      status: "delivered",
      method: "Eco-Courier Standard",
      items: [
        { name: "Cold-Pressed Extra Virgin Olive Oil", qty: 1, price: 19.99 }
      ]
    },
    {
      id: "SB-883471",
      customer: "Sultana Kamal",
      email: "sultana@ymail.com",
      phone: "+880 1818 443322",
      date: "Today, 10:24 AM",
      total: 24.99,
      itemsCount: 1,
      status: "processing",
      method: "Express Hydro-Pack",
      items: [
        { name: "Ceremonial Grade Matcha Powder", qty: 1, price: 24.99 }
      ]
    },
    {
      id: "SB-661298",
      customer: "Kazi Rafiq",
      email: "rafiq@outlook.com",
      phone: "+880 1313 776655",
      date: "Yesterday",
      total: 45.96,
      itemsCount: 5,
      status: "pending",
      method: "Eco-Courier Standard",
      items: [
        { name: "Fresh Organic Strawberries", qty: 4, price: 6.99 },
        { name: "Premium Heirloom Tomatoes", qty: 3, price: 5.99 }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="orders-admin-container">
      {/* Header section */}
      <div className="orders-admin-header">
        <div>
          <h1 className="admin-title">Order Harvest Registry</h1>
          <p className="admin-subtitle">Track, package, and authorize premium deliveries across co-op networks.</p>
        </div>
        <button className="export-report-btn">
          <Download size={16} /> Export Logistics Manifest
        </button>
      </div>

      {/* Filter and Search */}
      <div className="orders-filters-bar">
        <div className="search-box-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by invoice ID, customer name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="status-tabs">
          {["all", "pending", "processing", "delivered", "cancelled"].map((status) => (
            <button
              key={status}
              className={`status-tab-btn ${statusFilter === status ? "active" : ""}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="orders-split-layout">
        {/* Table of Orders */}
        <div className="dashboard-card-panel orders-table-panel">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Customer Coordinates</th>
                  <th>Courier Method</th>
                  <th>Harvest billing</th>
                  <th>Delivery Status</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className={`order-row-item ${selectedOrder?.id === order.id ? "selected" : ""}`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="font-bold text-white">{order.id}</td>
                    <td>
                      <div className="cust-cell">
                        <span className="name">{order.customer}</span>
                        <span className="email">{order.email}</span>
                      </div>
                    </td>
                    <td>
                      <span className="shipping-badge">{order.method}</span>
                    </td>
                    <td className="font-bold text-emerald-400">${order.total.toFixed(2)}</td>
                    <td>
                      <select
                        className={`status-select-pill ${order.status}`}
                        value={order.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button className="view-details-btn" onClick={() => setSelectedOrder(order)}>
                        <Eye size={14} /> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Order Detail Sidebar Panel */}
        <div className="dashboard-card-panel order-details-panel">
          {selectedOrder ? (
            <div className="order-details-content animate-fade-in">
              <div className="details-header">
                <div>
                  <span className="details-invoice-lbl">ORDER INVOICE</span>
                  <h3>{selectedOrder.id}</h3>
                </div>
                <span className={`status-badge-pill ${selectedOrder.status}`}>
                  {selectedOrder.status}
                </span>
              </div>

              <div className="detail-section">
                <h4>Customer Coordinates</h4>
                <div className="detail-info-block">
                  <p><strong>Name:</strong> {selectedOrder.customer}</p>
                  <p><strong>Email:</strong> {selectedOrder.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                  <p><strong>Courier style:</strong> {selectedOrder.method}</p>
                  <p><strong>Authorized Date:</strong> {selectedOrder.date}</p>
                </div>
              </div>

              <div className="detail-section">
                <h4>Sourced Farm Assets</h4>
                <div className="items-list-box">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="sourced-item-row">
                      <div className="item-name-info">
                        <span className="name">{item.name}</span>
                        <span className="qty">Qty: {item.qty}</span>
                      </div>
                      <span className="price">${(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="details-billing-summary">
                <div className="billing-row">
                  <span>Subtotal Sourced:</span>
                  <span>${(selectedOrder.total - 5.0).toFixed(2)}</span>
                </div>
                <div className="billing-row">
                  <span>Carbon-Offset courier:</span>
                  <span>$5.00</span>
                </div>
                <div className="billing-row total">
                  <span>Grand Total:</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="action-button-group">
                {selectedOrder.status !== "delivered" && (
                  <button 
                    className="details-action-btn complete"
                    onClick={() => handleStatusChange(selectedOrder.id, "delivered")}
                  >
                    <CheckCircle2 size={16} /> Mark as Delivered
                  </button>
                )}
                {selectedOrder.status !== "cancelled" && (
                  <button 
                    className="details-action-btn cancel"
                    onClick={() => handleStatusChange(selectedOrder.id, "cancelled")}
                  >
                    <XCircle size={16} /> Cancel Order
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="no-order-selected">
              <ShoppingBag size={48} className="empty-shopping-bag" />
              <h3>No Order Selected</h3>
              <p>Select any order row from the register database to configure logistics status and detail lists.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .orders-admin-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
          animation: fadeIn 0.4s ease-out;
        }

        .orders-admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .export-report-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          color: #f1f5f9;
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .export-report-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: #22c55e;
        }

        /* Filter bar */
        .orders-filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .status-tabs {
          display: flex;
          background: #131720;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 100px;
          padding: 4px;
        }

        .status-tab-btn {
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 12px;
          font-weight: 700;
          text-transform: capitalize;
          padding: 8px 16px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .status-tab-btn:hover {
          color: #f1f5f9;
        }

        .status-tab-btn.active {
          background: rgba(34, 197, 94, 0.1);
          color: #4ade80;
        }

        /* Split layout */
        .orders-split-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .orders-split-layout {
            grid-template-columns: 1fr;
          }
        }

        .cust-cell {
          display: flex;
          flex-direction: column;
        }

        .cust-cell .name {
          font-weight: 600;
          color: #f1f5f9;
        }

        .cust-cell .email {
          font-size: 11px;
          color: #475569;
        }

        .shipping-badge {
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .order-row-item {
          cursor: pointer;
          transition: all 0.2s;
        }

        .order-row-item:hover {
          background: rgba(255,255,255,0.02);
        }

        .order-row-item.selected {
          background: rgba(34, 197, 94, 0.04);
          border-left: 3px solid #22c55e;
        }

        .status-select-pill {
          background: transparent;
          border: 1px solid transparent;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }

        .status-select-pill.pending { background: rgba(245, 158, 11, 0.1); color: #fbbf24; border-color: rgba(245,158,11,0.2); }
        .status-select-pill.processing { background: rgba(59, 130, 246, 0.1); color: #60a5fa; border-color: rgba(59,130,246,0.2); }
        .status-select-pill.delivered { background: rgba(34, 197, 94, 0.1); color: #4ade80; border-color: rgba(34,197,94,0.2); }
        .status-select-pill.cancelled { background: rgba(239, 68, 68, 0.1); color: #f87171; border-color: rgba(239,68,68,0.2); }

        .view-details-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          color: #94a3b8;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .view-details-btn:hover {
          background: rgba(34, 197, 94, 0.08);
          color: #4ade80;
        }

        /* Order Details Right Panel */
        .order-details-panel {
          min-height: 400px;
          display: flex;
          flex-direction: column;
        }

        .no-order-selected {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          text-align: center;
          padding: 40px 20px;
          color: #475569;
        }

        .empty-shopping-bag {
          color: #1e293b;
          margin-bottom: 16px;
        }

        .no-order-selected h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #94a3b8;
          margin-bottom: 6px;
        }

        .no-order-selected p {
          font-size: 12px;
          max-width: 240px;
          line-height: 1.6;
        }

        .order-details-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .details-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 16px;
        }

        .details-invoice-lbl {
          font-size: 10px;
          font-weight: 700;
          color: #475569;
          letter-spacing: 0.5px;
        }

        .details-header h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #f1f5f9;
        }

        .detail-section h4 {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }

        .detail-info-block {
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 10px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-info-block p {
          font-size: 13px;
          color: #94a3b8;
        }

        .detail-info-block strong {
          color: #64748b;
          font-weight: 500;
          margin-right: 4px;
        }

        .items-list-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sourced-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          border-radius: 8px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
        }

        .item-name-info {
          display: flex;
          flex-direction: column;
        }

        .item-name-info .name {
          font-size: 13px;
          font-weight: 600;
          color: #f1f5f9;
        }

        .item-name-info .qty {
          font-size: 11px;
          color: #475569;
        }

        .sourced-item-row .price {
          font-size: 13px;
          font-weight: 600;
          color: #4ade80;
        }

        .details-billing-summary {
          border-top: 1px dashed rgba(255,255,255,0.08);
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .billing-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #64748b;
        }

        .billing-row.total {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 8px;
          font-size: 16px;
          font-weight: 800;
          color: #f1f5f9;
        }

        .billing-row.total span:last-child {
          color: #4ade80;
        }

        .action-button-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 10px;
        }

        .details-action-btn {
          border: none;
          padding: 12px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .details-action-btn.complete {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
        }

        .details-action-btn.complete:hover {
          background: #22c55e;
          color: white;
        }

        .details-action-btn.cancel {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
        }

        .details-action-btn.cancel:hover {
          background: #ef4444;
          color: white;
        }
      `}</style>
    </div>
  );
}
