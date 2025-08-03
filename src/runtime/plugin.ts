import { defineNuxtPlugin } from "#imports";
import { useRequestURL, useRuntimeConfig } from "nuxt/app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { hostname } = useRequestURL();

  const customDomains = (config.public.customDomains || {}) as Record<string, string>;
  const customDomain = customDomains[hostname];

  if (customDomain) {
    return {
      provide: {
        tenant: customDomain
      }
    };
  }

  const rootDomains = (config.public.rootDomains || []) as string[];
  const rootDomain = rootDomains.find((domain) => hostname.endsWith(domain));

  if (!rootDomain) {
    return {
      provide: {
        tenant: "",
      },
    };
  }
  let subdomain;
  if (config.public.strictSubdomains) {
    subdomain = hostname.substring(0, hostname.indexOf(rootDomain) - 1);
  } else {
    subdomain = hostname.split(".")[0];
  }
  const tenant = subdomain;

  return {
    provide: {
      tenant,
    },
  };
});
