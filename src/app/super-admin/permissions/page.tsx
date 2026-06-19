"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/super-admin/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  permissionsApi,
  type PermissionAddOn,
} from "@/lib/api/super-admin/permissions";
import { useAppSelector } from "@/store/hooks";

export default function PermissionsPage() {
  const { token } = useAppSelector((state) => state.auth);
  const [catalog, setCatalog] = useState<PermissionAddOn[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    permissionsApi
      .catalog(token)
      .then((res) => {
        setCatalog(res.data);
        if (res.data[0]) {
          setActiveTab(res.data[0].addOn);
        }
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load permissions."),
      )
      .finally(() => setLoading(false));
  }, [token]);

  const activeAddOn = useMemo(
    () => catalog.find((item) => item.addOn === activeTab),
    [catalog, activeTab],
  );

  const filteredModules = useMemo(() => {
    if (!activeAddOn) return [];
    const query = search.toLowerCase();
    return activeAddOn.modules.filter(
      (module) =>
        module.moduleLabel.toLowerCase().includes(query) ||
        module.module.toLowerCase().includes(query) ||
        module.permissions.some(
          (perm) =>
            perm.label.toLowerCase().includes(query) ||
            perm.value.toLowerCase().includes(query),
        ),
    );
  }, [activeAddOn, search]);

  const totalPermissions = catalog.reduce(
    (sum, addOn) =>
      sum +
      addOn.modules.reduce(
        (moduleSum, module) => moduleSum + module.permissions.length,
        0,
      ),
    0,
  );

  return (
    <>
      <PageHeader
        title="Permissions"
        description="System-wide permission catalog. New companies receive the full permission set on creation."
      />

      {error && (
        <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="secondary">{catalog.length} add-ons</Badge>
        <Badge variant="secondary">{totalPermissions} permissions</Badge>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading catalog...</p>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-2 border-b border-border pb-3">
            {catalog.map((addOn) => (
              <button
                key={addOn.addOn}
                type="button"
                onClick={() => setActiveTab(addOn.addOn)}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  activeTab === addOn.addOn
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {addOn.label}
              </button>
            ))}
          </div>

          <Input
            placeholder="Search modules or permissions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 max-w-md"
          />

          <div className="space-y-4">
            {filteredModules.map((module) => (
              <Card key={module.module}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{module.moduleLabel}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {module.permissions.map((permission) => (
                      <div
                        key={permission.value}
                        className="rounded-md border border-border px-3 py-2 text-sm"
                      >
                        <p className="font-medium">{permission.label}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {permission.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredModules.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No permissions match your search.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}
