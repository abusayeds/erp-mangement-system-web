"use client";

import SuperAdminGuard from "@/components/super-admin/role-guard";
import SuperAdminSidebar from "@/components/super-admin/sidebar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SuperAdminGuard>
      <div className="min-h-screen bg-background lg:flex">
        <SuperAdminSidebar />
        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </SuperAdminGuard>
  );
}
