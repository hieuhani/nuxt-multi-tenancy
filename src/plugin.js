import Router from 'vue-router'
import { routerOptions } from './defaultRouter'

let defaultOverride = ''
const tenants = <%= JSON.stringify(options.tenants, undefined, 2)  %>
const defaulTenant = '<%= options.defaultTenant %>'
const tenantsAlias = <%= JSON.stringify(options.tenantsAlias, undefined, 2)  %>

export function createRouter (ssrContext) {
  let tenant
  if (ssrContext) {
    tenant =
      ssrContext.req.headers.host &&
      tenants.find(tenant =>
        ssrContext.req.headers.host.startsWith(tenant)
      )
    ssrContext.nuxt.tenant = tenant
    if (tenant === undefined) {
      for (const key in tenantsAlias) {
        if (ssrContext.req.headers.host.startsWith(tenantsAlias[key].map)) {
          ssrContext.nuxt.tenant = tenantsAlias[key].target
          defaultOverride = tenantsAlias[key].target
        }
      }
    }
  } else {
    tenant = window.__NUXT__.tenant
  }
  tenant = tenant || defaultOverride || defaulTenant
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
