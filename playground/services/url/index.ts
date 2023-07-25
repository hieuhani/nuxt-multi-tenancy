import { useRequestURL } from "nuxt/app";

export const useBuildTenantUrl = (tenant: string) => {
  const { protocol, host } = useRequestURL();
  return `${protocol}//${tenant ? `${tenant}.` : ""}${host}`;
};
