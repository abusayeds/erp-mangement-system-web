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
import { getAuthFlow, getTempToken } from "@/lib/auth/session";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearAuthError,
  resendForgotOtp,
  resendRegistrationOtp,
  verifyForgotOtp,
  verifyRegistrationOtp,
} from "@/store/slices/authSlice";

export default function VerifyEmailPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, message } = useAppSelector((state) => state.auth);

  const [otp, setOtp] = useState("");
  const [flow, setFlow] = useState<"register" | "forgot" | null>(null);

  useEffect(() => {
    dispatch(clearAuthError());
    setFlow(getAuthFlow());
  }, [dispatch]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentFlow = getAuthFlow();
    if (!getTempToken() || !currentFlow) {
      router.replace(currentFlow === "forgot" ? "/forgot-password" : "/register");
      return;
    }

    if (currentFlow === "register") {
      const result = await dispatch(verifyRegistrationOtp(otp));
      if (verifyRegistrationOtp.fulfilled.match(result)) {
        router.replace("/login");
      }
      return;
    }

    const result = await dispatch(verifyForgotOtp(otp));
    if (verifyForgotOtp.fulfilled.match(result)) {
      router.replace("/reset-password");
    }
  };

  const handleResend = () => {
    const currentFlow = getAuthFlow();
    if (currentFlow === "register") {
      void dispatch(resendRegistrationOtp());
    } else if (currentFlow === "forgot") {
      void dispatch(resendForgotOtp());
    }
  };

  const title =
    flow === "forgot" ? "Enter reset code" : "Verify your email";
  const description =
    flow === "forgot"
      ? "Check your inbox for the 6-digit code."
      : "Enter the code we sent after registration.";

  return (
    <AuthLayout title={title} description={description}>
      {error && (
        <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {message && (
        <p className="mb-4 rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">Verification code</Label>
          <Input
            id="otp"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
            required
            autoFocus
            placeholder="6-digit code"
            className={AUTH_INPUT_CLASS}
          />
        </div>

        <Button
          type="submit"
          className={AUTH_SUBMIT_BUTTON_CLASS}
          disabled={loading || otp.length < 6}
        >
          {loading ? "Checking..." : "Verify code"}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={handleResend}
            className="text-primary hover:underline"
            disabled={loading}
          >
            Resend code
          </button>
          <Link href="/login" className="text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
