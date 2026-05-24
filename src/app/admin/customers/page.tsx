"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Award,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Leaf,
  Trash2,
  Sparkles,
} from "lucide-react";

export default function AdminCustomers() {
  const [customersList, setCustomersList] = useState([
    {
      id: "CUST-401",
      name: "Meskat Rahman",
      email: "fresh@meskat.me",
      phone: "+880 1712 345678",
      joined: "May 2026",
      ordersCount: 4,
      totalSpend: 158.33,
      carbonSaved: 12.8,
      tier: "Sotej Gold Member"
    },
    {
      id: "CUST-108",
      name: "Tasnim Ahmed",
      email: "tasnim@domain.com",
      phone: "+880 1911 223344",
      joined: "April 2026",
      ordersCount: 8,
      totalSpend: 312.45,
      carbonSaved: 28.4,
      tier: "Sotej Platinum Member"
    },
    {
      id: "CUST-305",
      name: "Zayed Abdullah",
      email: "zayed@gmail.com",
      phone: "+880 1515 998877",
      joined: "March 2026",
      ordersCount: 2,
      totalSpend: 54.90,
      carbonSaved: 6.2,
      tier: "Sotej Bronze Member"
    },
    {
      id: "CUST-802",
      name: "Sultana Kamal",
      email: "sultana@ymail.com",
      phone: "+880 1818 443322",
      joined: "January 2026",
      ordersCount: 14,
      totalSpend: 589.20,
      carbonSaved: 48.9,
      tier: "Sotej Emerald Elite"
    },
    {
      id: "CUST-223",
      name: "Kazi Rafiq",
      email: "rafiq@outlook.com",
      phone: "+880 1313 776655",
      joined: "February 2026",
      ordersCount: 5,
      totalSpend: 198.50,
      carbonSaved: 16.5,
      tier: "Sotej Silver Member"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customersList.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to retire this organic member account?")) {
      setCustomersList(customersList.filter(c => c.id !== id));
    }
  };

  return (
    <div className="customers-container">
      {/* Header */}
      <div className="customers-header">
        <div>
          <h1 className="admin-title">Boutique Members Register</h1>
          <p className="admin-subtitle">Inspect organic footprints, packaging unit offsets, and user loyalty coordinates.</p>
        </div>
      </div>

      {/* Filter and search */}
      <div className="customers-filters-bar">
        <div className="search-box-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search premium member directories by name, email coordinates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Panel table */}
      <div className="dashboard-card-panel">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Member Profile</th>
                <th>Hotline Coordinates</th>
                <th>Joined Date</th>
                <th>Order Sourcing</th>
                <th>Eco Carbon Saved</th>
                <th>Loyalty Tier</th>
                <th style={{ textAlign: "right" }}>Retire</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((cust) => (
                <tr key={cust.id}>
                  <td>
                    <div className="member-profile-cell">
                      <div className="avatar-letter">
                        {cust.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="details">
                        <span className="name">{cust.name}</span>
                        <span className="id">{cust.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="coordinates-cell">
                      <span className="email"><Mail size={10} style={{ marginRight: "4px" }} /> {cust.email}</span>
                      <span className="phone"><Phone size={10} style={{ marginRight: "4px" }} /> {cust.phone}</span>
                    </div>
                  </td>
                  <td>
                    <span className="joined-date">{cust.joined}</span>
                  </td>
                  <td>
                    <div className="spend-cell">
                      <span className="count">{cust.ordersCount} Harvests</span>
                      <span className="amount">${cust.totalSpend.toFixed(2)} total</span>
                    </div>
                  </td>
                  <td>
                    <div className="carbon-cell">
                      <Leaf size={12} className="leaf-green" />
                      <span>{cust.carbonSaved} kg CO2</span>
                    </div>
                  </td>
                  <td>
                    <span className={`tier-badge ${cust.tier.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Sparkles size={10} style={{ marginRight: "4px" }} /> {cust.tier}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="cust-retire-btn" onClick={() => handleDelete(cust.id)}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .customers-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
          animation: fadeIn 0.4s ease-out;
        }

        .customers-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .customers-filters-bar {
          display: flex;
        }

        /* Member table elements */
        .member-profile-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar-letter {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.05));
          border: 1px solid rgba(34, 197, 94, 0.2);
          color: #4ade80;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .member-profile-cell .name {
          display: block;
          font-weight: 600;
          color: #f1f5f9;
          font-size: 14px;
        }

        .member-profile-cell .id {
          display: block;
          font-size: 11px;
          color: #475569;
        }

        .coordinates-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .coordinates-cell span {
          font-size: 12px;
          color: #94a3b8;
          display: flex;
          align-items: center;
        }

        .joined-date {
          font-size: 13px;
          color: #94a3b8;
        }

        .spend-cell {
          display: flex;
          flex-direction: column;
        }

        .spend-cell .count {
          font-weight: 600;
          color: #f1f5f9;
        }

        .spend-cell .amount {
          font-size: 11px;
          color: #475569;
        }

        .carbon-cell {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.15);
          color: #4ade80;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 8px;
        }

        .leaf-green {
          color: #4ade80;
        }

        /* Tier badges */
        .tier-badge {
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .tier-badge.sotej-gold-member { background: rgba(251, 191, 36, 0.1); color: #fbbf24; border: 1px solid rgba(251,191,36,0.2); }
        .tier-badge.sotej-platinum-member { background: rgba(96, 165, 250, 0.1); color: #60a5fa; border: 1px solid rgba(96,165,250,0.2); }
        .tier-badge.sotej-bronze-member { background: rgba(202, 138, 4, 0.1); color: #ca8a04; border: 1px solid rgba(202,138,4,0.2); }
        .tier-badge.sotej-emerald-elite { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
        .tier-badge.sotej-silver-member { background: rgba(148, 163, 184, 0.1); color: #94a3b8; border: 1px solid rgba(148,163,184,0.2); }

        .cust-retire-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
          background: transparent;
          color: #64748b;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .cust-retire-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.3);
        }
      `}</style>
    </div>
  );
}
