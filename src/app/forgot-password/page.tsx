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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuthError, forgotPassword } from "@/store/slices/authSlice";

export default function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await dispatch(forgotPassword(email));
    if (forgotPassword.fulfilled.match(result)) {
      router.push("/verify-email");
    }
  };

  return (
    <AuthLayout
      title="Reset password"
      description="Enter your email and we will send a verification code."
    >
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
            className={AUTH_INPUT_CLASS}
          />
        </div>

        <Button
          type="submit"
          className={AUTH_SUBMIT_BUTTON_CLASS}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send code"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Remembered it?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
