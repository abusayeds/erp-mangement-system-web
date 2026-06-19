"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BrandMark from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { isSuperAdmin } from "@/lib/roles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading, initialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (initialized && user && isSuperAdmin(user.role)) {
      router.replace("/super-admin");
    }
  }, [initialized, user, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading workspace...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <BrandMark />
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-muted-foreground">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="mt-2 text-muted-foreground">
          You are signed in as{" "}
          <span className="font-medium text-foreground">{user?.role}</span>.
          Module screens will be added in the next steps.
        </p>

        <div className="mt-8 rounded-lg border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            This is a temporary dashboard shell used to confirm authentication
            is working end-to-end.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            Back to marketing site
          </Link>
        </div>
      </main>
    </div>
  );
}
