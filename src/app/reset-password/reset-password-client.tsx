"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import {
  AUTH_INPUT_CLASS,
  AUTH_SUBMIT_BUTTON_CLASS,
} from "@/lib/auth-config";
import { getTempToken } from "@/lib/auth/session";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuthError, resetPassword } from "@/store/slices/authSlice";

export default function ResetPasswordPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(clearAuthError());
    if (!getTempToken()) {
      router.replace("/forgot-password");
    }
  }, [dispatch, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    if (password !== passwordConfirmation) {
      setLocalError("Passwords do not match.");
      return;
    }

    const result = await dispatch(
      resetPassword({ password, confirmPassword: passwordConfirmation }),
    );

    if (resetPassword.fulfilled.match(result)) {
      router.replace("/login");
    }
  };

  const displayError = localError || error;

  return (
    <AuthLayout
      title="Choose a new password"
      description="Use at least 6 characters."
    >
      {displayError && (
        <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {displayError}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            autoFocus
            className={AUTH_INPUT_CLASS}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password_confirmation">Confirm password</Label>
          <Input
            id="password_confirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
            minLength={6}
            className={AUTH_INPUT_CLASS}
          />
        </div>

        <Button
          type="submit"
          className={AUTH_SUBMIT_BUTTON_CLASS}
          disabled={loading}
        >
          {loading ? "Saving..." : "Update password"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
