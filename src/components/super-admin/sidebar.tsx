"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  CreditCard,
  LayoutGrid,
  LogOut,
  Menu,
  Shield,
  X,
} from "lucide-react";
import { useState } from "react";
import BrandMark from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

const NAV_ITEMS = [
  { href: "/super-admin", label: "Dashboard", icon: LayoutGrid, exact: true },
  { href: "/super-admin/companies", label: "Companies", icon: Building2 },
  { href: "/super-admin/plans", label: "Subscription plans", icon: CreditCard },
  { href: "/super-admin/permissions", label: "Permissions", icon: Shield },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const active =
          "exact" in item && item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function SuperAdminSidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-border px-4 lg:hidden">
        <BrandMark />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/20"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu overlay"
          />
          <aside className="relative flex h-full w-72 flex-col border-r border-border bg-card">
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <BrandMark />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <NavLinks onNavigate={() => setMobileOpen(false)} />
            </div>
            <div className="border-t border-border p-4">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          </aside>
        </div>
      )}

      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-14 items-center border-b border-border px-5">
          <BrandMark />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavLinks />
        </div>
        <div className="border-t border-border p-4">
          <p className="truncate text-sm font-medium">{user?.name ?? "Admin"}</p>
          <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>
    </>
  );
}
