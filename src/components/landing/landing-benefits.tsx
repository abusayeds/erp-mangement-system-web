"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { LANDING_SETTINGS } from "@/lib/landing-data";

export default function LandingBenefits() {
  const sectionData = LANDING_SETTINGS.config_sections.sections.benefits ?? {};
  const benefits = sectionData.benefits ?? [];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="benefits" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground">
          {sectionData.title}
        </h2>

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
          {benefits.map((benefit, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={benefit.title}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground">
                    {benefit.title}
                  </span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 shrink-0 text-primary" />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
