"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
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
      <AppSidebar />
      
      <SidebarInset className="admin-main-inset">
        {/* Top Bar */}
        <header className="admin-topbar">
          <SidebarTrigger className="admin-trigger-btn" />
          <div className="admin-topbar-breadcrumb">
            <span className="admin-topbar-brand">Sotej Bazaar</span>
            <ChevronRight size={12} style={{ opacity: 0.3 }} />
            <span className="admin-topbar-page">
              {NAV_ITEMS.find(item => item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href))?.label || "Admin"}
            </span>
          </div>
          <div className="admin-topbar-actions">
            <div className="admin-topbar-avatar">MZ</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          {children}
        </main>
      </SidebarInset>

      <style>{`
        .admin-main-inset {
          background: #09090b !important;
          border: none !important;
          box-shadow: none !important;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 100vh;
        }

        /* Topbar styling */
        .admin-topbar {
          height: 72px;
          background: #09090b;
          border-bottom: 1px solid #27272a;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        /* Sidebar Trigger custom style to fit topbar - bulletproof clickability */
        .admin-trigger-btn {
          width: 32px !important;
          height: 32px !important;
          color: #a1a1aa !important;
          background: #18181b !important;
          border: 1px solid #27272a !important;
          border-radius: 6px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          position: relative !important;
          z-index: 9999 !important;
          pointer-events: auto !important;
          transition: all 0.15s !important;
        }

        .admin-trigger-btn:hover {
          background: #27272a !important;
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
          font-size: 13px;
          font-weight: 700;
          color: #71717a;
        }

        .admin-topbar-page {
          font-size: 13px;
          font-weight: 600;
          color: #fafafa;
        }

        .admin-topbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-topbar-avatar {
          width: 32px;
          height: 32px;
          background: #27272a;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
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
