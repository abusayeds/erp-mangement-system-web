import { Suspense } from "react";
import LoginPage from "./login-form";

export default function LoginRoute() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
