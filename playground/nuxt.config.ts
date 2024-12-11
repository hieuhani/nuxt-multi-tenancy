const url = import.meta.env.PROD
  ? "https://techgoda.net"
  : "http://nuxtdev.local:3000";

export default defineNuxtConfig({
  modules: ["../src/module"],
  runtimeConfig: {
    public: {
      url,
    },
  },
  multiTenancy: {
    rootDomains: ["nuxtdev.local", "techgoda.net"],
    sites: ["jobs"],
    customDomains: {
      "news.techgoda.net": "news",
      "news.nuxtdev.local": "news",
    },
  },
  devtools: { enabled: true },
});
