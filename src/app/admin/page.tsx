"use client";

import React from "react";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Select a section from the sidebar menu to begin managing Sotej Bazaar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</span>
          <span className="text-lg font-semibold text-white">System Active</span>
          <p className="text-zinc-500 text-xs mt-1">Database and API services are online.</p>
        </div>

        <div className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Role</span>
          <span className="text-lg font-semibold text-white">Super Admin</span>
          <p className="text-zinc-500 text-xs mt-1">You have full read/write management access.</p>
        </div>

        <div className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Build</span>
          <span className="text-lg font-semibold text-white">Production Ready</span>
          <p className="text-zinc-500 text-xs mt-1">All compiled static and dynamic pages are live.</p>
        </div>
      </div>
    </div>
  );
}
