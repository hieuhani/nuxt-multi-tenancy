import {
  addImports,
  addPlugin,
  addTemplate,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'

export interface ModuleOptions {
  tenantDynamicRoute?: string
  rootDomains: string[]
  sites?: string[]
  customDomains?: Record<string, string>
}

const routerPatchFlag = '...configRouterOptions,'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-multi-tenancy',
    configKey: 'multiTenancy',
  },
  defaults: {
    tenantDynamicRoute: 'site',
    rootDomains: ['localhost'],
    sites: [],
    customDomains: {},
  },
  setup({ tenantDynamicRoute, rootDomains, sites, customDomains }, nuxt) {
    nuxt.options.runtimeConfig.public = {
      ...nuxt.options.runtimeConfig.public,
      rootDomains,
    }
    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))

    addTemplate({
      filename: 'tenant-router.options.mjs',
      getContents: () => `
      import { useRequestURL } from 'nuxt/app';

      const dynamicRoutePrefix = '/:${tenantDynamicRoute}()';

      const rewritePrefixRoute = (route, prefix) => {
        if (route.path.startsWith(prefix)) {
          return {
            ...route,
            path: route.path.replace(prefix, ""),
          };
        }
        return route;
      }

      const ignoreDynamicRoute = (route) => !route.path.startsWith(dynamicRoutePrefix);
      const sites = new Set(${JSON.stringify(sites)});
      const ignoreTenantSitesRoute = (route) => !sites.has(route.name);

      export default {
        routes: (routes) => {
          const { hostname } = useRequestURL();
          const customDomains = ${JSON.stringify(customDomains)};
          const customDomainRoute = customDomains[hostname];
          if (customDomainRoute) {
            return routes
              .filter(ignoreDynamicRoute)
              .filter(route => route.path.startsWith('/' + customDomainRoute))
              .map((route) => rewritePrefixRoute(route, '/' + customDomainRoute));
          }

          const rootDomain = ${JSON.stringify(
            rootDomains
          )}.find(domain => hostname.endsWith(domain));

          if (!rootDomain) {
            return routes;
          }
          if (hostname === rootDomain) {
            return routes.filter(ignoreDynamicRoute).filter(ignoreTenantSitesRoute);
          }

          const tenant = hostname.substring(0, hostname.indexOf(rootDomain) - 1);

          if (sites.has(tenant)) {
            return routes
              .filter(ignoreDynamicRoute)
              .map((route) => rewritePrefixRoute(route, '/' + tenant));
          }

          return routes
            .map((route) => rewritePrefixRoute(route, dynamicRoutePrefix))
        },
      };
      `,
    })

    nuxt.hook('app:templates', (app) => {
      const routerOptionsTemplate = app.templates.find(
        (template) => template.filename === 'router.options.mjs'
      )
      if (!routerOptionsTemplate) return

      const originalGetContents = routerOptionsTemplate.getContents

      routerOptionsTemplate.getContents = async (data) => {
        const content = await originalGetContents(data)

        const patchIndex = content.indexOf(routerPatchFlag)
        if (patchIndex === -1) {
          return content
        }
        if (content.includes('#build/tenant-router.options')) {
          return content
        }

        const newPatchPosition = patchIndex + routerPatchFlag.length

        return [
          'import tenantRouterOptions from "#build/tenant-router.options";',
          content.slice(0, newPatchPosition),
          `  ...tenantRouterOptions,${content.slice(newPatchPosition)}`,
        ].join('\n')
      }
    })

    const composables = resolver.resolve('./runtime/composables')
    addImports([{ from: composables, name: 'useTenant' }])
  },
})
