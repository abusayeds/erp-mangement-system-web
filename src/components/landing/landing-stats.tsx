import { LANDING_SETTINGS } from "@/lib/landing-data";

export default function LandingStats() {
  const sectionData = LANDING_SETTINGS.config_sections.sections.stats ?? {};
  const stats = sectionData.stats ?? [];

  return (
    <section className="bg-surface border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card px-4 py-5 text-center sm:px-6"
            >
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-2 text-2xl sm:text-3xl font-bold text-primary">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
