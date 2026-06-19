"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { LANDING_SETTINGS } from "@/lib/landing-data";

export default function LandingModules() {
  const sectionData = LANDING_SETTINGS.config_sections.sections.modules ?? {};
  const modules = sectionData.modules ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeModule = modules[activeIndex];

  return (
    <section id="modules" className="scroll-mt-20 bg-surface py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {sectionData.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{sectionData.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {modules.map((module, index) => (
              <button
                key={module.key}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex shrink-0 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                  activeIndex === index
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-muted"
                }`}
              >
                <span>{module.label}</span>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>
            ))}
          </div>

          {activeModule && (
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {activeModule.label}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">
                {activeModule.title}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {activeModule.description}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-16 rounded-lg bg-muted border border-border"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
