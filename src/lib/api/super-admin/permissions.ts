import { apiRequest } from "../client";

export type PermissionItem = {
  value: string;
  label: string;
  module: string;
};

export type PermissionModule = {
  module: string;
  moduleLabel: string;
  permissions: PermissionItem[];
};

export type PermissionAddOn = {
  addOn: string;
  label: string;
  packageName: string;
  modules: PermissionModule[];
};

export const permissionsApi = {
  catalog: (token: string) =>
    apiRequest<PermissionAddOn[]>("/permission/all-permissions", { token }),
};
