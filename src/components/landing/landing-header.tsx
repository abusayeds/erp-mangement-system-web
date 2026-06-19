"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import BrandMark from "@/components/brand-mark";
import { LANDING_SETTINGS } from "@/lib/landing-data";

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionData =
    LANDING_SETTINGS.config_sections.sections.header ?? {};
  const navigationItems = sectionData.navigation_items ?? [];

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <BrandMark />

        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => (
            <Link
              key={item.text}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
            >
              {item.text}
            </Link>
          ))}
          {sectionData.enable_pricing_link !== false && (
            <Link
              href="#"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
            >
              Pricing
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.text}
              href={item.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.text}
            </Link>
          ))}
          {sectionData.enable_pricing_link !== false && (
            <Link
              href="#"
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Pricing
            </Link>
          )}
          <div className="flex flex-col gap-2 pt-3 border-t border-border mt-3">
            <Link
              href="/login"
              className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
