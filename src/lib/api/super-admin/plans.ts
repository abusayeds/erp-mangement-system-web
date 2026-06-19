import { apiRequest } from "../client";
import type { PaginationMeta } from "../types";

export type PlanModule = {
  key: string;
  label: string;
};

export type SubscriptionPlan = {
  _id: string;
  name: string;
  description?: string;
  price_monthly: number;
  price_yearly: number;
  free_plan: boolean;
  trial: boolean;
  trial_days: number;
  status: boolean;
  number_of_users: number;
  modules: string[];
  limits?: Record<string, number>;
  createdAt?: string;
};

export type PlanCatalog = {
  modules: PlanModule[];
  limit_resources: PlanModule[];
};

export type PlanPayload = {
  name: string;
  description?: string;
  price_monthly: number;
  price_yearly: number;
  free_plan: boolean;
  trial: boolean;
  trial_days: number;
  status: boolean;
  number_of_users: number;
  modules: string[];
};

export const plansApi = {
  catalog: (token: string) =>
    apiRequest<PlanCatalog>("/subscription/plans/catalog", { token }),

  list: (token: string, query?: { page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query?.page) params.set("page", String(query.page));
    if (query?.limit) params.set("limit", String(query.limit));
    const qs = params.toString();

    return apiRequest<SubscriptionPlan[]>(
      `/subscription/plans${qs ? `?${qs}` : ""}`,
      { token },
    ).then((res) => ({
      plans: res.data,
      pagination: res.pagination as PaginationMeta | undefined,
    }));
  },

  get: (token: string, id: string) =>
    apiRequest<SubscriptionPlan>(`/subscription/plans/${id}`, { token }),

  create: (token: string, payload: PlanPayload) =>
    apiRequest<SubscriptionPlan>("/subscription/plans/create", {
      method: "POST",
      token,
      body: payload,
    }),

  update: (token: string, id: string, payload: Partial<PlanPayload>) =>
    apiRequest<SubscriptionPlan>(`/subscription/plans/${id}`, {
      method: "PATCH",
      token,
      body: payload,
    }),

  remove: (token: string, id: string) =>
    apiRequest<null>(`/subscription/plans/${id}`, {
      method: "DELETE",
      token,
    }),
};
