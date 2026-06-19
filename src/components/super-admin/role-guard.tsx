"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { isSuperAdmin } from "@/lib/roles";

export default function SuperAdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, initialized, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!initialized || loading) {
      return;
    }

    if (!user) {
      router.replace("/login?next=/super-admin");
      return;
    }

    if (!isSuperAdmin(user.role)) {
      router.replace("/dashboard");
    }
  }, [user, initialized, loading, router]);

  if (!initialized || loading || !user || !isSuperAdmin(user.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading admin workspace...
      </div>
    );
  }

  return children;
}
