import { defineNuxtPlugin } from '#app'
import { useRequestURL } from 'nuxt/app';

export default defineNuxtPlugin(() => {
  const { hostname } = useRequestURL();
  let [tenant] = hostname.split(".");
  if (tenant === hostname) {
    tenant = ''
  }
  return {
    provide: {
      tenant
    }
  }
})
