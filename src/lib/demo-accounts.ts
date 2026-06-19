/**
 * Seed data from backend DB (`backend/src/DB/index.ts`).
 * Use these credentials for local development and demo login buttons.
 */
export const SEED_SUPER_ADMIN = {
  name: "Super Admin",
  email: "superadmin@gmail.com",
  password: "1qazxsw2",
  role: "superadmin" as const,
};

export const SEED_COMPANY = {
  name: "Company",
  email: "company@gmail.com",
  password: "1qazxsw2",
  phone: "1234567890",
  language: "en",
  role: "company" as const,
};
