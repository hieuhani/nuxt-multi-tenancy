import { useNuxtApp } from '#app'

export const useTenant = () => useNuxtApp().$tenant
