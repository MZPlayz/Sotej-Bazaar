"use client";

import React from "react";
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
  Leaf,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border p-4 min-h-[72px] flex flex-row items-center gap-3 overflow-hidden">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 shrink-0">
          <Leaf className="h-5 w-5" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col overflow-hidden animate-fadeIn">
            <span className="font-heading text-lg font-extrabold tracking-tight text-slate-100 whitespace-nowrap">
              Sotej
            </span>
            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
              Admin Panel
            </span>
          </div>
        )}
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="p-3">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="px-2 mb-2 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
              Main Menu
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const isActive =
                  href === "/admin"
                    ? pathname === "/admin"
                    : pathname?.startsWith(href);
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-200 border border-transparent ${
                        isActive
                          ? "bg-gradient-to-r from-green-500/15 to-green-600/5 text-green-400 border-green-500/20 shadow-sm shadow-green-500/5"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                      }`}
                      tooltip={label}
                    >
                      <Link href={href} className="flex items-center w-full">
                        <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-green-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                        {!isCollapsed && (
                          <span className="font-medium text-sm ml-3.5 flex-1">{label}</span>
                        )}
                        {!isCollapsed && isActive && (
                          <ChevronRight className="h-4 w-4 text-green-400/80 ml-auto" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div
          className={`flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] overflow-hidden ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 font-bold text-sm text-white shrink-0 shadow-md shadow-green-500/20">
            MZ
          </div>
          {!isCollapsed && (
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="font-semibold text-xs text-slate-200 truncate leading-none">
                MZPlayz
              </span>
              <span className="text-[10px] text-green-400 font-medium mt-1 uppercase tracking-wider">
                Super Admin
              </span>
            </div>
          )}
          {!isCollapsed && (
            <button
              className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer shrink-0"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
