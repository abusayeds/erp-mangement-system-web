import {
  Building2,
  Calculator,
  CreditCard,
  FolderOpen,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LANDING_SETTINGS } from "@/lib/landing-data";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Calculator,
  Users,
  CreditCard,
  UserCheck,
  FolderOpen,
};

export default function LandingFeatures() {
  const sectionData = LANDING_SETTINGS.config_sections.sections.features ?? {};
  const features = sectionData.features ?? [];

  return (
    <section id="features" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {sectionData.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{sectionData.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = ICONS[feature.icon] ?? Building2;
            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-4 h-0.5 w-0 bg-primary transition-all group-hover:w-10" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
