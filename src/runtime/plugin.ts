import { defineNuxtPlugin } from "#app";
import { useRequestURL, useRuntimeConfig } from "nuxt/app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { hostname } = useRequestURL();

  const rootDomains = (config.public.rootDomains || []) as string[];
  const rootDomain = rootDomains.find((domain) => hostname.endsWith(domain));

  if (!rootDomain) {
    return {
      provide: {
        tenant: "",
      },
    };
  }
  const idx = hostname.indexOf(rootDomain);
  const tenant = hostname.substring(0, idx - 1);

  return {
    provide: {
      tenant,
    },
  };
});
