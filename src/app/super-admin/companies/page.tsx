"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import PageHeader from "@/components/super-admin/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  companiesApi,
  type CompanyUser,
} from "@/lib/api/super-admin/companies";
import { AUTH_INPUT_CLASS } from "@/lib/auth-config";
import { useAppSelector } from "@/store/hooks";

type CreateForm = {
  name: string;
  email: string;
  password: string;
  phone: string;
  language: string;
};

const EMPTY_FORM: CreateForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  language: "en",
};

export default function CompaniesPage() {
  const { token } = useAppSelector((state) => state.auth);
  const [companies, setCompanies] = useState<CompanyUser[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<CreateForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const loadCompanies = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const response = await companiesApi.list(token, {
        page,
        limit: 10,
        search: search.trim() || undefined,
      });
      setCompanies(response.companies);
      const total = response.pagination?.totalData ?? response.companies.length;
      const limit = response.pagination?.limit ?? 10;
      setTotalPages(Math.max(1, Math.ceil(total / limit)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load companies.");
    } finally {
      setLoading(false);
    }
  }, [token, page, search]);

  useEffect(() => {
    void loadCompanies();
  }, [loadCompanies]);

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) return;

    setSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      await companiesApi.create(token, form);
      setMessage("Company created successfully.");
      setForm(EMPTY_FORM);
      setShowCreate(false);
      setPage(1);
      await loadCompanies();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create company.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (company: CompanyUser) => {
    if (!token) return;
    if (!window.confirm(`Delete ${company.name ?? company.email}?`)) return;

    setError(null);
    try {
      await companiesApi.remove(token, company._id);
      setMessage("Company removed.");
      await loadCompanies();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  return (
    <>
      <PageHeader
        title="Companies"
        description="Create and manage tenant company accounts."
        action={
          <Button onClick={() => setShowCreate((open) => !open)}>
            <Plus className="h-4 w-4" />
            Add company
          </Button>
        }
      />

      {error && (
        <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {message && (
        <p className="mb-4 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
          {message}
        </p>
      )}

      {showCreate && (
        <Card className="mb-6">
          <CardContent className="pt-5">
            <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company name</Label>
                <Input
                  id="company-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className={AUTH_INPUT_CLASS}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-email">Email</Label>
                <Input
                  id="company-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className={AUTH_INPUT_CLASS}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-password">Password</Label>
                <Input
                  id="company-password"
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  minLength={4}
                  className={AUTH_INPUT_CLASS}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-phone">Phone</Label>
                <Input
                  id="company-phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={AUTH_INPUT_CLASS}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="company-language">Language</Label>
                <Input
                  id="company-language"
                  value={form.language}
                  onChange={(e) =>
                    setForm({ ...form, language: e.target.value })
                  }
                  className={AUTH_INPUT_CLASS}
                />
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating..." : "Create company"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="max-w-sm"
            />
            <p className="text-sm text-muted-foreground">
              {loading ? "Loading..." : `${companies.length} on this page`}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Name</th>
                  <th className="pb-3 pr-4 font-medium">Email</th>
                  <th className="pb-3 pr-4 font-medium">Phone</th>
                  <th className="pb-3 pr-4 font-medium">Login</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company._id} className="border-b border-border/70">
                    <td className="py-3 pr-4 font-medium">
                      {company.name ?? "—"}
                    </td>
                    <td className="py-3 pr-4">{company.email}</td>
                    <td className="py-3 pr-4">{company.phone ?? "—"}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={company.login === false ? "destructive" : "success"}>
                        {company.login === false ? "Disabled" : "Enabled"}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => void handleDelete(company)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {!loading && companies.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No companies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
