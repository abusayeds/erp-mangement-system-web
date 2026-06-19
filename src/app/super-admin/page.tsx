"use client";

import Link from "next/link";
import { Building2, CreditCard, Crown } from "lucide-react";
import { useEffect, useState } from "react";
import PageHeader from "@/components/super-admin/page-header";
import StatCard from "@/components/super-admin/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { companiesApi } from "@/lib/api/super-admin/companies";
import { plansApi } from "@/lib/api/super-admin/plans";
import { useAppSelector } from "@/store/hooks";

export default function SuperAdminDashboardPage() {
  const { token } = useAppSelector((state) => state.auth);
  const [stats, setStats] = useState({
    companies: 0,
    plans: 0,
    activePlans: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function loadStats() {
      try {
        const [companiesRes, plansRes] = await Promise.all([
          companiesApi.list(token!, { page: 1, limit: 1 }),
          plansApi.list(token!, { page: 1, limit: 100 }),
        ]);

        setStats({
          companies:
            companiesRes.pagination?.totalData ?? companiesRes.companies.length,
          plans: plansRes.plans.length,
          activePlans: plansRes.plans.filter((plan) => plan.status).length,
        });
      } finally {
        setLoading(false);
      }
    }

    void loadStats();
  }, [token]);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of companies and subscription plans on FlowLedger."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total companies"
          value={loading ? "—" : stats.companies}
          hint="Registered tenant accounts"
          icon={<Building2 className="h-5 w-5" />}
          tone="orange"
        />
        <StatCard
          title="Subscription plans"
          value={loading ? "—" : stats.plans}
          hint="All plans in catalog"
          icon={<Crown className="h-5 w-5" />}
          tone="purple"
        />
        <StatCard
          title="Active plans"
          value={loading ? "—" : stats.activePlans}
          hint="Visible to companies"
          icon={<CreditCard className="h-5 w-5" />}
          tone="green"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/super-admin/companies">Manage companies</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/super-admin/plans/new">Create plan</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/super-admin/permissions">View permissions</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. Create a company account for each tenant.</p>
            <p>2. Set up subscription plans with module access.</p>
            <p>3. Review the permission catalog used across roles.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
