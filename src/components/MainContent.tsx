"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <main className={isAdmin ? "" : "main-content-flow"}>
      {children}
    </main>
  );
}
