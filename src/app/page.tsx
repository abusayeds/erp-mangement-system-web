import type { Metadata } from "next";
import LandingPage from "@/components/landing/landing-page";
import { APP_NAME } from "@/lib/auth-config";

export const metadata: Metadata = {
  title: `${APP_NAME} — Finance & operations in one place`,
  description:
    "Invoices, inventory, CRM, HR, and projects connected in a single workspace.",
};

export default function Home() {
  return <LandingPage />;
}
