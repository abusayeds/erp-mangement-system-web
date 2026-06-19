"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Mail, Phone } from "lucide-react";
import BrandMark from "@/components/brand-mark";
import { APP_FOOTER } from "@/lib/auth-config";
import { LANDING_SETTINGS } from "@/lib/landing-data";

export default function LandingFooter() {
  const sectionData = LANDING_SETTINGS.config_sections.sections.footer ?? {};
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setEmail("");
    }, 400);
  };

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {sectionData.description}
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                {LANDING_SETTINGS.contact_email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                {LANDING_SETTINGS.contact_phone}
              </p>
            </div>
          </div>

          {sectionData.navigation_sections?.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground">
            {sectionData.newsletter_title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {sectionData.newsletter_description}
          </p>
          <form
            onSubmit={handleNewsletter}
            className="mt-4 flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={submitting}
              className="flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={submitting}
              className="h-10 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {submitting ? "..." : sectionData.newsletter_button_text}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {APP_FOOTER}
        </p>
      </div>
    </footer>
  );
}
