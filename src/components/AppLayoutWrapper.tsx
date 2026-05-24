"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface AppLayoutWrapperProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

export default function AppLayoutWrapper({
  children,
  header,
  footer,
}: AppLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="admin-root-wrapper">{children}</div>;
  }

  return (
    <div className="app-layout">
      {header}
      <main className="main-content-flow">{children}</main>
      {footer}
    </div>
  );
}
