import { useRequestURL } from "nuxt/app";
import { useTenant } from "#imports";

export const useBuildTenantUrl = (tenant: string) => {
  const { protocol, host } = useRequestURL();
  const currentTenant = useTenant();

  if (currentTenant === tenant) {
    return "";
  }
  if (host.startsWith(tenant)) {
    return `${protocol}//${host}`;
  }
  return `${protocol}//${tenant ? `${tenant}.` : ""}${host}`;
};
