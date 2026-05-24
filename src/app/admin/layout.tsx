"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Leaf,
  Bell,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>Sotej Admin Panel</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, fontFamily: "'Inter', sans-serif", background: "#0f1117", color: "#e2e8f0" }}>
        <div className="admin-shell">
          {/* Mobile overlay */}
          {mobileSidebarOpen && (
            <div className="admin-mobile-overlay" onClick={() => setMobileSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <aside className={`admin-sidebar ${sidebarOpen ? "expanded" : "collapsed"} ${mobileSidebarOpen ? "mobile-open" : ""}`}>
            {/* Logo */}
            <div className="admin-sidebar-logo">
              <div className="admin-logo-icon">
                <Leaf size={20} />
              </div>
              {sidebarOpen && (
                <div className="admin-logo-text">
                  <span className="admin-logo-brand">Sotej</span>
                  <span className="admin-logo-sub">Admin Panel</span>
                </div>
              )}
              <button
                className="admin-sidebar-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>

            {/* Navigation */}
            <nav className="admin-nav">
              <div className="admin-nav-label">{sidebarOpen && "MAIN MENU"}</div>
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`admin-nav-item ${isActive ? "active" : ""}`}
                    title={!sidebarOpen ? label : undefined}
                  >
                    <span className="admin-nav-icon">
                      <Icon size={18} />
                    </span>
                    {sidebarOpen && <span className="admin-nav-label-text">{label}</span>}
                    {sidebarOpen && isActive && <ChevronRight size={14} className="admin-nav-arrow" />}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom user */}
            <div className="admin-sidebar-bottom">
              <div className={`admin-user-card ${!sidebarOpen ? "compact" : ""}`}>
                <div className="admin-user-avatar">MZ</div>
                {sidebarOpen && (
                  <div className="admin-user-info">
                    <span className="admin-user-name">MZPlayz</span>
                    <span className="admin-user-role">Super Admin</span>
                  </div>
                )}
                {sidebarOpen && (
                  <button className="admin-logout-btn" title="Logout">
                    <LogOut size={15} />
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="admin-main">
            {/* Top Bar */}
            <header className="admin-topbar">
              <button className="admin-mobile-menu-btn" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
                <Menu size={20} />
              </button>
              <div className="admin-topbar-breadcrumb">
                <span className="admin-topbar-brand">Sotej Bazaar</span>
                <ChevronRight size={14} style={{ opacity: 0.4 }} />
                <span className="admin-topbar-page">
                  {NAV_ITEMS.find(item => item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href))?.label || "Admin"}
                </span>
              </div>
              <div className="admin-topbar-actions">
                <button className="admin-topbar-btn">
                  <Bell size={18} />
                  <span className="admin-topbar-notif-dot" />
                </button>
                <div className="admin-topbar-avatar">MZ</div>
              </div>
            </header>

            {/* Page Content */}
            <main className="admin-content">
              {children}
            </main>
          </div>
        </div>

        <style>{`
          /* Admin Shell */
          .admin-shell {
            display: flex;
            min-height: 100vh;
            background: #0f1117;
          }

          /* Sidebar */
          .admin-sidebar {
            width: 260px;
            min-width: 260px;
            background: #131720;
            border-right: 1px solid rgba(255,255,255,0.06);
            display: flex;
            flex-direction: column;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: fixed;
            top: 0; left: 0;
            height: 100vh;
            z-index: 100;
            overflow: hidden;
          }

          .admin-sidebar.collapsed {
            width: 72px;
            min-width: 72px;
          }

          .admin-sidebar-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 20px 16px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            min-height: 72px;
          }

          .admin-logo-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
          }

          .admin-logo-text {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: hidden;
          }

          .admin-logo-brand {
            font-family: 'Outfit', sans-serif;
            font-size: 18px;
            font-weight: 800;
            color: #f1f5f9;
            white-space: nowrap;
          }

          .admin-logo-sub {
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            white-space: nowrap;
          }

          .admin-sidebar-toggle {
            background: rgba(255,255,255,0.05);
            border: none;
            color: #94a3b8;
            cursor: pointer;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            flex-shrink: 0;
            transition: all 0.2s;
          }

          .admin-sidebar-toggle:hover {
            background: rgba(255,255,255,0.1);
            color: white;
          }

          .admin-nav {
            flex-grow: 1;
            padding: 16px 10px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            overflow-y: auto;
          }

          .admin-nav-label {
            font-size: 10px;
            font-weight: 700;
            color: #475569;
            letter-spacing: 0.8px;
            padding: 0 8px;
            margin-bottom: 8px;
            white-space: nowrap;
            overflow: hidden;
            min-height: 16px;
          }

          .admin-nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 10px;
            border-radius: 10px;
            text-decoration: none;
            color: #94a3b8;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
            white-space: nowrap;
            position: relative;
          }

          .admin-nav-item:hover {
            background: rgba(255,255,255,0.06);
            color: #f1f5f9;
          }

          .admin-nav-item.active {
            background: linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.08));
            color: #4ade80;
            border: 1px solid rgba(34, 197, 94, 0.2);
          }

          .admin-nav-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .admin-nav-label-text {
            flex-grow: 1;
          }

          .admin-nav-arrow {
            opacity: 0.6;
          }

          /* Sidebar Bottom */
          .admin-sidebar-bottom {
            padding: 16px 10px;
            border-top: 1px solid rgba(255,255,255,0.06);
          }

          .admin-user-card {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            border-radius: 10px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.06);
          }

          .admin-user-card.compact {
            justify-content: center;
          }

          .admin-user-avatar {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            color: white;
            flex-shrink: 0;
          }

          .admin-user-info {
            flex-grow: 1;
            overflow: hidden;
          }

          .admin-user-name {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: #f1f5f9;
            white-space: nowrap;
          }

          .admin-user-role {
            display: block;
            font-size: 11px;
            color: #4ade80;
            white-space: nowrap;
          }

          .admin-logout-btn {
            background: transparent;
            border: none;
            color: #64748b;
            cursor: pointer;
            padding: 4px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            transition: all 0.2s;
          }

          .admin-logout-btn:hover {
            color: #f87171;
          }

          /* Main Content Area */
          .admin-main {
            flex-grow: 1;
            margin-left: 260px;
            transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .admin-sidebar.collapsed ~ .admin-main {
            margin-left: 72px;
          }

          /* Topbar */
          .admin-topbar {
            height: 72px;
            background: #131720;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 0 32px;
            position: sticky;
            top: 0;
            z-index: 50;
          }

          .admin-mobile-menu-btn {
            display: none;
            background: transparent;
            border: none;
            color: #94a3b8;
            cursor: pointer;
          }

          .admin-topbar-breadcrumb {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-grow: 1;
          }

          .admin-topbar-brand {
            font-family: 'Outfit', sans-serif;
            font-size: 14px;
            font-weight: 700;
            color: #64748b;
          }

          .admin-topbar-page {
            font-size: 14px;
            font-weight: 600;
            color: #f1f5f9;
          }

          .admin-topbar-actions {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .admin-topbar-btn {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.08);
            color: #94a3b8;
            width: 38px;
            height: 38px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            transition: all 0.2s;
          }

          .admin-topbar-btn:hover {
            background: rgba(255,255,255,0.08);
            color: white;
          }

          .admin-topbar-notif-dot {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 7px;
            height: 7px;
            background: #4ade80;
            border-radius: 50%;
            border: 1.5px solid #131720;
          }

          .admin-topbar-avatar {
            width: 38px;
            height: 38px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            color: white;
            cursor: pointer;
          }

          /* Content */
          .admin-content {
            flex-grow: 1;
            padding: 32px;
            overflow-y: auto;
          }

          /* Mobile */
          @media (max-width: 768px) {
            .admin-sidebar {
              transform: translateX(-100%);
              width: 260px !important;
            }

            .admin-sidebar.mobile-open {
              transform: translateX(0);
            }

            .admin-main {
              margin-left: 0 !important;
            }

            .admin-mobile-menu-btn {
              display: flex;
            }

            .admin-mobile-overlay {
              position: fixed;
              inset: 0;
              background: rgba(0,0,0,0.6);
              z-index: 99;
            }

            .admin-content {
              padding: 20px;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
