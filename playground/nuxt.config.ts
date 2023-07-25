export default defineNuxtConfig({
  modules: ["../src/module"],
  multiTenancy: {
    rootDomains: ["nuxtdev.local", "nuxtdev.xyz"],
  },
  devtools: { enabled: true },
});
