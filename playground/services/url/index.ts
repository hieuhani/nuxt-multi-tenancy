import { useRequestURL } from "nuxt/app";

export const useBuildTenantUrl = (tenant: string) => {
  const { protocol, host } = useRequestURL();
  if (host.startsWith(tenant)) {
    return `${protocol}//${host}`;
  }
  return `${protocol}//${tenant ? `${tenant}.` : ""}${host}`;
};
