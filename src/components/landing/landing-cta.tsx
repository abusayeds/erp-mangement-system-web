import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LANDING_SETTINGS } from "@/lib/landing-data";

export default function LandingCTA() {
  const sectionData = LANDING_SETTINGS.config_sections.sections.cta ?? {};

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 sm:px-12 sm:py-14">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent/10 blur-2xl" />

          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {sectionData.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{sectionData.subtitle}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {sectionData.primary_button}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-6 text-sm font-semibold text-foreground hover:bg-muted"
              >
                {sectionData.secondary_button}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
