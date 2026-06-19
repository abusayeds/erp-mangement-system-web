"use client";

import { FormEvent, useState } from "react";
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
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/auth/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePassword } from "@/store/slices/authSlice";

export default function ConfirmPasswordPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, message } = useAppSelector((state) => state.auth);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    if (newPassword !== confirmPassword) {
      setLocalError("New passwords do not match.");
      return;
    }

    const result = await dispatch(
      changePassword({ oldPassword, newPassword, confirmPassword }),
    );

    if (changePassword.fulfilled.match(result)) {
      router.replace(DEFAULT_LOGIN_REDIRECT);
    }
  };

  const displayError = localError || error;

  return (
    <AuthLayout
      title="Confirm password"
      description="Re-enter your password to continue to a protected area."
    >
      {displayError && (
        <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {displayError}
        </p>
      )}
      {message && (
        <p className="mb-4 rounded-md border border-border bg-muted px-3 py-2 text-sm">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="oldPassword">Current password</Label>
          <Input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            required
            autoFocus
            className={AUTH_INPUT_CLASS}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            minLength={6}
            className={AUTH_INPUT_CLASS}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
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
          <Link href={DEFAULT_LOGIN_REDIRECT} className="text-primary hover:underline">
            Back to dashboard
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
