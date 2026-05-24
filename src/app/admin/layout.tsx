"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider className="dark" defaultOpen={true}>
      <div className="admin-shell">
        <AppSidebar />
        
        <SidebarInset className="admin-main-inset">
          {/* Top Bar */}
          <header className="admin-topbar">
            <SidebarTrigger className="admin-trigger-btn" />
            <div className="admin-topbar-breadcrumb">
              <span className="admin-topbar-brand">Sotej Bazaar</span>
              <ChevronRight size={14} style={{ opacity: 0.4 }} />
              <span className="admin-topbar-page">
                {NAV_ITEMS.find(item => item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href))?.label || "Admin"}
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
        </SidebarInset>
      </div>

      <style>{`
        /* Admin Shell styling integration */
        .admin-shell {
          display: flex;
          min-height: 100vh;
          background: #0f1117;
          width: 100%;
          color: #e2e8f0;
          font-family: var(--font-body);
        }

        .admin-main-inset {
          background: #0f1117 !important;
          border: none !important;
          box-shadow: none !important;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* Topbar styling */
        .admin-topbar {
          height: 72px;
          background: #131720;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        /* Sidebar Trigger custom style to fit topbar */
        .admin-trigger-btn {
          width: 38px !important;
          height: 38px !important;
          color: #94a3b8 !important;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 10px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: all 0.2s !important;
        }

        .admin-trigger-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          color: white !important;
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
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
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
          background: rgba(255, 255, 255, 0.08);
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

        /* Content spacing */
        .admin-content {
          flex-grow: 1;
          padding: 32px;
          overflow-y: auto;
        }

        /* Mobile specific layouts */
        @media (max-width: 768px) {
          .admin-content {
            padding: 20px;
          }
        }
      `}</style>
    </SidebarProvider>
  );
}
