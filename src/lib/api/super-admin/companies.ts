import { apiRequest } from "../client";
import type { PaginationMeta } from "../types";

export type CompanyUser = {
  _id: string;
  name?: string;
  email: string;
  phone?: string;
  language?: string;
  role: string;
  login?: boolean;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type CreateCompanyPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  language?: string;
  role?: "company";
};

export const companiesApi = {
  list: (token: string, query?: { page?: number; limit?: number; search?: string }) => {
    const params = new URLSearchParams();
    if (query?.page) params.set("page", String(query.page));
    if (query?.limit) params.set("limit", String(query.limit));
    if (query?.search) params.set("searchTerm", query.search);

    const qs = params.toString();
    return apiRequest<CompanyUser[]>(`/user/all-user${qs ? `?${qs}` : ""}`, {
      token,
    }).then((res) => ({
      companies: res.data,
      pagination: res.pagination as PaginationMeta | undefined,
      message: res.message,
    }));
  },

  create: (token: string, payload: CreateCompanyPayload) =>
    apiRequest<CompanyUser>("/user/create-company-by-superadmin", {
      method: "POST",
      token,
      body: { ...payload, role: "company" },
    }),

  block: (token: string, userId: string) =>
    apiRequest<null>("/user/block-user", {
      method: "POST",
      token,
      body: { userId },
    }),

  remove: (token: string, id: string) =>
    apiRequest<null>(`/user/delete/${id}`, {
      method: "DELETE",
      token,
    }),
};
