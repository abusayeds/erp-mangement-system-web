"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Edit, Plus, Trash2, X } from "lucide-react";
import PageHeader from "@/components/super-admin/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  plansApi,
  type PlanCatalog,
  type SubscriptionPlan,
} from "@/lib/api/super-admin/plans";
import { useAppSelector } from "@/store/hooks";

export default function PlansPage() {
  const { token } = useAppSelector((state) => state.auth);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [catalog, setCatalog] = useState<PlanCatalog | null>(null);
  const [pricingPeriod, setPricingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlans = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const [plansRes, catalogRes] = await Promise.all([
        plansApi.list(token, { limit: 100 }),
        plansApi.catalog(token),
      ]);
      setPlans(plansRes.plans);
      setCatalog(catalogRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPlans();
  }, [token]);

  const handleDelete = async (plan: SubscriptionPlan) => {
    if (!token) return;
    if (!window.confirm(`Delete plan "${plan.name}"?`)) return;

    try {
      await plansApi.remove(token, plan._id);
      await loadPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  const moduleLabels = new Map(
    catalog?.modules.map((m) => [m.key, m.label]) ?? [],
  );
  const allModuleKeys = catalog?.modules.map((m) => m.key) ?? [];

  return (
    <>
      <PageHeader
        title="Subscription plans"
        description="Define pricing, limits, and module access for tenants."
        action={
          <Button asChild>
            <Link href="/super-admin/plans/new">
              <Plus className="h-4 w-4" />
              New plan
            </Link>
          </Button>
        }
      />

      {error && (
        <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mb-4 flex items-center gap-2">
        <Button
          variant={pricingPeriod === "monthly" ? "default" : "outline"}
          size="sm"
          onClick={() => setPricingPeriod("monthly")}
        >
          Monthly
        </Button>
        <Button
          variant={pricingPeriod === "yearly" ? "default" : "outline"}
          size="sm"
          onClick={() => setPricingPeriod("yearly")}
        >
          Yearly
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading plans...</p>
      ) : plans.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No plans yet.</p>
            <Button asChild className="mt-4">
              <Link href="/super-admin/plans/new">Create your first plan</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <div
            className="inline-grid min-w-full gap-0 border border-border rounded-lg"
            style={{
              gridTemplateColumns: `minmax(180px, 1.2fr) repeat(${plans.length}, minmax(160px, 1fr))`,
            }}
          >
            <div className="border-b border-r border-border bg-muted/40 p-4 font-medium">
              Features
            </div>
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="border-b border-r border-border bg-muted/20 p-4 last:border-r-0"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{plan.name}</p>
                    {!plan.status && (
                      <Badge variant="secondary" className="mt-1">
                        Inactive
                      </Badge>
                    )}
                    {plan.free_plan ? (
                      <p className="mt-2 text-lg font-bold">Free</p>
                    ) : (
                      <p className="mt-2 text-lg font-bold">
                        $
                        {pricingPeriod === "monthly"
                          ? plan.price_monthly
                          : plan.price_yearly}
                        <span className="text-xs font-normal text-muted-foreground">
                          /{pricingPeriod === "monthly" ? "mo" : "yr"}
                        </span>
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {plan.number_of_users === -1
                        ? "Unlimited users"
                        : `${plan.number_of_users} users`}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/super-admin/plans/${plan._id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => void handleDelete(plan)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {allModuleKeys.map((moduleKey) => (
              <div key={moduleKey} className="contents">
                <div className="border-b border-r border-border p-3 text-sm">
                  {moduleLabels.get(moduleKey) ?? moduleKey}
                </div>
                {plans.map((plan) => (
                  <div
                    key={`${plan._id}-${moduleKey}`}
                    className="flex items-center justify-center border-b border-r border-border p-3 last:border-r-0"
                  >
                    {plan.modules.includes(moduleKey) ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/50" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
