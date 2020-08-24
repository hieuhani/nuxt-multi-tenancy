import Router from 'vue-router'
import { routerOptions } from './defaultRouter'

const universities = ['neu', 'ftu']
const defaulTenant = 'home'

export function createRouter (ssrContext) {
  let tenant
  if (ssrContext) {
    tenant =
      ssrContext.req.headers.host &&
      universities.find(tenant =>
        ssrContext.req.headers.host.startsWith(tenant)
      )
    ssrContext.nuxt.tenant = tenant
  } else {
    tenant = window.__NUXT__.tenant
  }
  tenant = tenant || defaulTenant
  const routes = (routerOptions.routes || [])
    .filter(({ path }) => path.startsWith('/' + tenant))
    .map(route => ({
      ...route,
      path: route.path.slice(tenant.length + 1) || '/'
    }))
  return new Router({
    ...routerOptions,
    routes
  })
}
