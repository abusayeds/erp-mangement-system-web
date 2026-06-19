import Link from "next/link";
import { ArrowRight, BarChart3, Layers, ShieldCheck } from "lucide-react";
import { LANDING_SETTINGS } from "@/lib/landing-data";

export default function LandingHero() {
  const sectionData = LANDING_SETTINGS.config_sections.sections.hero ?? {};

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            All-in-one ERP workspace
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance">
            {sectionData.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed text-balance">
            {sectionData.subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              {sectionData.primary_button_text}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-semibold text-foreground hover:bg-muted transition-colors w-full sm:w-auto"
            >
              {sectionData.secondary_button_text}
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Layers,
              title: "Modular stack",
              text: "Turn on only what your business needs.",
            },
            {
              icon: BarChart3,
              title: "Live reporting",
              text: "See cash flow and performance at a glance.",
            },
            {
              icon: ShieldCheck,
              title: "Secure access",
              text: "Role-based permissions for every user.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <item.icon className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
