"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/super-admin/page-header";
import PlanForm from "@/components/super-admin/plan-form";
import { plansApi, type SubscriptionPlan } from "@/lib/api/super-admin/plans";
import { useAppSelector } from "@/store/hooks";

export default function EditPlanPage() {
  const params = useParams<{ id: string }>();
  const { token } = useAppSelector((state) => state.auth);
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !params.id) return;

    plansApi
      .get(token, params.id)
      .then((res) => setPlan(res.data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Plan not found."),
      );
  }, [token, params.id]);

  if (error) {
    return (
      <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {error}
      </p>
    );
  }

  if (!plan) {
    return (
      <p className="text-sm text-muted-foreground">Loading plan...</p>
    );
  }

  return (
    <>
      <PageHeader
        title={`Edit ${plan.name}`}
        description="Update pricing, limits, and included modules."
      />
      <PlanForm planId={params.id} initialPlan={plan} />
    </>
  );
}
