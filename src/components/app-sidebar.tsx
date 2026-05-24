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
    <Sidebar collapsible="icon" className="border-r border-zinc-800 bg-zinc-950 text-zinc-200">
      {/* Header */}
      <SidebarHeader className="border-b border-zinc-800 p-4 min-h-[72px] flex flex-row items-center gap-3 overflow-hidden">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-zinc-950 shrink-0">
          <Leaf className="h-5 w-5" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col overflow-hidden animate-fadeIn">
            <span className="font-heading text-sm font-bold tracking-tight text-white whitespace-nowrap">
              Sotej Bazaar
            </span>
            <span className="text-[9px] font-semibold text-zinc-500 tracking-wider uppercase">
              Management Portal
            </span>
          </div>
        )}
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="p-2.5">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="px-2 mb-2 text-[9px] font-bold text-zinc-500 tracking-widest uppercase">
              Application
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
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
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 border border-transparent ${
                        isActive
                          ? "bg-zinc-800 text-white font-medium shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                      }`}
                      tooltip={label}
                    >
                      <Link href={href} className="flex items-center w-full">
                        <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-white" : "text-zinc-400"}`} />
                        {!isCollapsed && (
                          <span className="text-xs ml-3 flex-1">{label}</span>
                        )}
                        {!isCollapsed && isActive && (
                          <ChevronRight className="h-3.5 w-3.5 text-zinc-500 ml-auto" />
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
      <SidebarFooter className="border-t border-zinc-800 p-3">
        <div
          className={`flex items-center gap-2.5 p-2 rounded-lg bg-zinc-900/50 border border-zinc-800/40 overflow-hidden ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-800 text-xs font-bold text-white shrink-0">
            MZ
          </div>
          {!isCollapsed && (
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="font-bold text-xs text-zinc-200 truncate leading-none">
                MZPlayz
              </span>
              <span className="text-[9px] text-zinc-500 font-medium mt-1 uppercase tracking-wider">
                Super Admin
              </span>
            </div>
          )}
          {!isCollapsed && (
            <button
              className="p-1 rounded text-zinc-500 hover:text-white transition-all cursor-pointer shrink-0"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
