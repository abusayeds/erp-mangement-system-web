"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  plansApi,
  type PlanCatalog,
  type PlanPayload,
  type SubscriptionPlan,
} from "@/lib/api/super-admin/plans";
import { AUTH_INPUT_CLASS } from "@/lib/auth-config";
import { useAppSelector } from "@/store/hooks";

type PlanFormProps = {
  planId?: string;
  initialPlan?: SubscriptionPlan;
};

const DEFAULT_FORM: PlanPayload = {
  name: "",
  description: "",
  price_monthly: 0,
  price_yearly: 0,
  free_plan: false,
  trial: false,
  trial_days: 14,
  status: true,
  number_of_users: 5,
  modules: [],
};

export default function PlanForm({ planId, initialPlan }: PlanFormProps) {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);
  const isEdit = Boolean(planId);

  const [catalog, setCatalog] = useState<PlanCatalog | null>(null);
  const [form, setForm] = useState<PlanPayload>(() =>
    initialPlan
      ? {
          name: initialPlan.name,
          description: initialPlan.description ?? "",
          price_monthly: initialPlan.price_monthly,
          price_yearly: initialPlan.price_yearly,
          free_plan: initialPlan.free_plan,
          trial: initialPlan.trial,
          trial_days: initialPlan.trial_days,
          status: initialPlan.status,
          number_of_users: initialPlan.number_of_users,
          modules: initialPlan.modules ?? [],
        }
      : DEFAULT_FORM,
  );
  const [moduleSearch, setModuleSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    plansApi
      .catalog(token)
      .then((res) => setCatalog(res.data))
      .catch(() => setCatalog({ modules: [], limit_resources: [] }));
  }, [token]);

  const filteredModules = useMemo(() => {
    if (!catalog) return [];
    const query = moduleSearch.toLowerCase();
    return catalog.modules.filter(
      (item) =>
        item.label.toLowerCase().includes(query) ||
        item.key.toLowerCase().includes(query),
    );
  }, [catalog, moduleSearch]);

  const toggleModule = (key: string) => {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.includes(key)
        ? prev.modules.filter((m) => m !== key)
        : [...prev.modules, key],
    }));
  };

  const toggleAllModules = (checked: boolean) => {
    if (!catalog) return;
    setForm((prev) => ({
      ...prev,
      modules: checked ? catalog.modules.map((m) => m.key) : [],
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      if (isEdit && planId) {
        await plansApi.update(token, planId, form);
      } else {
        await plansApi.create(token, form);
      }
      router.push("/super-admin/plans");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-12">
      {error && (
        <p className="lg:col-span-12 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="space-y-4 lg:col-span-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quick settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <label className="flex items-center justify-between gap-3">
              <span>Active</span>
              <input
                type="checkbox"
                checked={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.checked })
                }
                className="rounded border-input"
              />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span>Trial</span>
              <input
                type="checkbox"
                checked={form.trial}
                onChange={(e) => setForm({ ...form, trial: e.target.checked })}
                className="rounded border-input"
              />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span>Free plan</span>
              <input
                type="checkbox"
                checked={form.free_plan}
                onChange={(e) =>
                  setForm({ ...form, free_plan: e.target.checked })
                }
                className="rounded border-input"
              />
            </label>
          </CardContent>
        </Card>

        {form.trial && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Trial</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="trial-days" className="text-xs">
                Trial days
              </Label>
              <Input
                id="trial-days"
                type="number"
                min={0}
                value={form.trial_days}
                onChange={(e) =>
                  setForm({
                    ...form,
                    trial_days: Number(e.target.value) || 0,
                  })
                }
                className={`mt-1 ${AUTH_INPUT_CLASS}`}
              />
            </CardContent>
          </Card>
        )}

        {!form.free_plan && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label htmlFor="price-monthly" className="text-xs">
                  Monthly
                </Label>
                <Input
                  id="price-monthly"
                  type="number"
                  min={0}
                  value={form.price_monthly}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price_monthly: Number(e.target.value) || 0,
                    })
                  }
                  className={`mt-1 ${AUTH_INPUT_CLASS}`}
                />
              </div>
              <div>
                <Label htmlFor="price-yearly" className="text-xs">
                  Yearly
                </Label>
                <Input
                  id="price-yearly"
                  type="number"
                  min={0}
                  value={form.price_yearly}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price_yearly: Number(e.target.value) || 0,
                    })
                  }
                  className={`mt-1 ${AUTH_INPUT_CLASS}`}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-4 lg:col-span-9">
        <Card>
          <CardHeader>
            <CardTitle>Plan information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="plan-name">Plan name</Label>
              <Input
                id="plan-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className={AUTH_INPUT_CLASS}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-users">Max users (-1 = unlimited)</Label>
              <Input
                id="max-users"
                type="number"
                value={form.number_of_users}
                onChange={(e) =>
                  setForm({
                    ...form,
                    number_of_users: Number(e.target.value),
                  })
                }
                className={AUTH_INPUT_CLASS}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="plan-description">Description</Label>
              <Textarea
                id="plan-description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle>Modules</CardTitle>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toggleAllModules(true)}
              >
                Select all
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toggleAllModules(false)}
              >
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search modules..."
              value={moduleSearch}
              onChange={(e) => setModuleSearch(e.target.value)}
              className="mb-4 max-w-sm"
            />
            <div className="grid max-h-72 gap-2 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
              {filteredModules.map((module) => (
                <label
                  key={module.key}
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={form.modules.includes(module.key)}
                    onChange={() => toggleModule(module.key)}
                    className="rounded border-input"
                  />
                  {module.label}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update plan" : "Create plan"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/super-admin/plans">Cancel</Link>
          </Button>
        </div>
      </div>
    </form>
  );
}
