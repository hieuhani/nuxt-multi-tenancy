import { useNuxtApp } from '#imports'

export const useTenant = () => useNuxtApp().$tenant
