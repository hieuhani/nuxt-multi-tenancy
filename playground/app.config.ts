import { defineAppConfig } from "#imports";

export default defineAppConfig({
  name: "Nuxt Multi Tenant",
  description: "Multi-tenancy Nuxt sites support by sub-domains",
  url: import.meta.env.PROD ? "https://nuxtdev.xyz" : "http://localhost:3000",
  author: {
    name: "hieuhani",
    link: "https://github.com/hieuhani",
  },
});
