"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import {
  AUTH_INPUT_CLASS,
  AUTH_SUBMIT_BUTTON_CLASS,
} from "@/lib/auth-config";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/auth/constants";
import { SEED_COMPANY, SEED_SUPER_ADMIN } from "@/lib/demo-accounts";
import { getRoleHomePath } from "@/lib/roles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuthError, login } from "@/store/slices/authSlice";

const QUICK_LOGIN_ACCOUNTS = [
  {
    label: "Super Admin",
    email: SEED_SUPER_ADMIN.email,
    password: SEED_SUPER_ADMIN.password,
    fullWidth: true,
  },
  {
    label: "Company",
    email: SEED_COMPANY.email,
    password: SEED_COMPANY.password,
  },
] as const;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState(SEED_COMPANY.email);
  const [password, setPassword] = useState(SEED_COMPANY.password);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const redirectTo = searchParams.get("next") || DEFAULT_LOGIN_REDIRECT;

  const submitLogin = async (
    loginEmail: string,
    loginPassword: string,
    rememberMe = remember,
  ) => {
    const result = await dispatch(
      login({ email: loginEmail, password: loginPassword, remember: rememberMe }),
    );

    if (login.fulfilled.match(result)) {
      const home =
        redirectTo !== "/dashboard" && redirectTo !== "/super-admin"
          ? redirectTo
          : getRoleHomePath(result.payload.user.role);
      router.replace(home);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitLogin(email, password);
  };

  return (
    <AuthLayout title="Sign in" description="Use your work email and password.">
      {error && (
        <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
            autoComplete="email"
            placeholder="you@company.com"
            className={AUTH_INPUT_CLASS}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            className={AUTH_INPUT_CLASS}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="rounded border-input"
          />
          Keep me signed in
        </label>

        <Button
          type="submit"
          className={AUTH_SUBMIT_BUTTON_CLASS}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>

        <div className="border-t border-border pt-4">
          <p className="mb-3 text-xs text-muted-foreground">Demo accounts</p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_LOGIN_ACCOUNTS.map((account) => (
              <Button
                key={account.label}
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => void submitLogin(account.email, account.password)}
                className={`h-auto py-2 text-xs ${"fullWidth" in account && account.fullWidth ? "col-span-2" : ""}`}
              >
                {account.label}
              </Button>
            ))}
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
