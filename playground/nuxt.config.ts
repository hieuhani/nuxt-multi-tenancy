const url = import.meta.env.PROD
  ? "https://nuxtdev.xyz"
  : "http://nuxtdev.local:3000";

export default defineNuxtConfig({
  modules: ["../src/module"],
  runtimeConfig: {
    public: {
      url,
    },
  },
  multiTenancy: {
    rootDomains: ["nuxtdev.local", "nuxtdev.xyz"],
  },
  devtools: { enabled: true },
});
