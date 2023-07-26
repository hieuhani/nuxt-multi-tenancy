export default defineNuxtConfig({
  modules: ["../src/module", "nuxt-gtag"],
  multiTenancy: {
    rootDomains: ["nuxtdev.local", "nuxtdev.xyz"],
  },
  devtools: { enabled: true },
  gtag: {
    id: "G-SPYZPSKBM8",
    initialConsent: false,
  },
});
