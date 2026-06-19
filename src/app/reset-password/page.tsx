import { Suspense } from "react";
import ResetPasswordPage from "./reset-password-client";

export default function ResetPasswordRoute() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordPage />
    </Suspense>
  );
}
