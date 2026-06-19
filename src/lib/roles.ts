export const ROLES = {
  superadmin: "superadmin",
  company: "company",
  staff: "staff",
  hr: "hr",
  customer: "customer",
  vendor: "vendor",
} as const;

export type AppRole = (typeof ROLES)[keyof typeof ROLES];

export function getRoleHomePath(role?: string | null) {
  if (role === ROLES.superadmin) {
    return "/super-admin";
  }
  return "/dashboard";
}

export function isSuperAdmin(role?: string | null) {
  return role === ROLES.superadmin;
}
