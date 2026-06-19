"use client";

import Link from "next/link";
import { type PropsWithChildren } from "react";
import BrandMark from "@/components/brand-mark";
import { APP_FOOTER } from "@/lib/auth-config";

interface AuthLayoutProps {
  title: string;
  description: string;
  footerText?: string;
}

export default function AuthLayout({
  children,
  title,
  description,
  footerText = APP_FOOTER,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
      <aside className="hidden lg:flex flex-col justify-between border-r border-border bg-muted/40 p-10">
        <BrandMark showTagline />

        <div className="max-w-sm space-y-4">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            Workspace access
          </p>
          <h2 className="text-2xl font-semibold leading-snug text-foreground">
            Sign in to manage invoices, stock, and your team.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Use the email and password your administrator shared with you.
          </p>
        </div>

        <p className="text-xs text-muted-foreground">{footerText}</p>
      </aside>

      <div className="flex min-h-screen flex-col bg-background">
        <header className="border-b border-border p-5 lg:hidden">
          <BrandMark showTagline />
        </header>

        <main className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 sm:p-6">
              {children}
            </div>

            <p className="mt-5 text-center text-xs text-muted-foreground lg:hidden">
              {footerText}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
