import { defineNuxtModule, addTemplate } from '@nuxt/kit'

export interface ModuleOptions {}

const routerPatchFlag = '...configRouterOptions,'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-multi-tenancy',
    configKey: 'multiTenancy'
  },
  defaults: {},
  setup (options, nuxt) {
    addTemplate({
      filename: 'tenant-router.options.mjs',
      getContents: () => `
      import { useRequestURL } from 'nuxt/app';
      export default {
        routes: (routes) => {
          const { hostname } = useRequestURL();
          const [site] = hostname.split(".");

          return routes.map((route) => {
            if (route.path.startsWith("/:site()")) {
              return {
                ...route,
                path: route.path.replace("/:site()", ""),
              };
            }
            return route;
          });
        },
      };
      `
    })


    nuxt.hook('app:templates', app => {
      const routerOptionsTemplateIndex = app.templates.findIndex(template => template.filename === 'router.options.mjs')
      if (app.templates[routerOptionsTemplateIndex] ) {
        const getContents = app.templates[routerOptionsTemplateIndex].getContents
        if (getContents) {
          app.templates[routerOptionsTemplateIndex].getContents = async (data: Record<string, any>) => {
            const currentContent = await getContents(data)
            const patchIndex = currentContent.indexOf(routerPatchFlag) + routerPatchFlag.length

            const alteredContent = [
              'import tenantRouterOptions from "#build/tenant-router.options";',
              currentContent.slice(0, patchIndex),
              `...tenantRouterOptions,${currentContent.slice(patchIndex)}`].join('\n')
            return alteredContent
          }
        }
      }
    })
  }
})
