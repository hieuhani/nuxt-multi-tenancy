import { defineNuxtModule, addTemplate, addPlugin, createResolver, addImports } from "@nuxt/kit";

export interface ModuleOptions {
  tenantDynamicRoute?: string;
}

const routerPatchFlag = "...configRouterOptions,";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-multi-tenancy",
    configKey: "multiTenancy",
  },
  defaults: {
    tenantDynamicRoute: "site",
  },
  setup({ tenantDynamicRoute }, nuxt) {
    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))

    addTemplate({
      filename: "tenant-router.options.mjs",
      getContents: () => `
      import { useRequestURL } from 'nuxt/app';
      export default {
        routes: (routes) => {
          const { hostname } = useRequestURL();
          let [site] = hostname.split(".");
          if (site === hostname) {
            return routes
          }
          const tenantRoutePrefix = \`/:${tenantDynamicRoute}()\`
          return routes.map((route) => {
            if (route.path.startsWith(tenantRoutePrefix)) {
              return {
                ...route,
                path: route.path.replace(tenantRoutePrefix, ""),
              };
            }
            return route;
          });
        },
      };
      `,
    });

    nuxt.hook("app:templates", (app) => {
      const routerOptionsTemplateIndex = app.templates.findIndex(
        (template) => template.filename === "router.options.mjs"
      );
      if (app.templates[routerOptionsTemplateIndex]) {
        const getContents =
          app.templates[routerOptionsTemplateIndex].getContents;
        if (getContents) {
          app.templates[routerOptionsTemplateIndex].getContents = async (
            data: Record<string, any>
          ) => {
            const currentContent = await getContents(data);
            const patchIndex =
              currentContent.indexOf(routerPatchFlag) + routerPatchFlag.length;

            const alteredContent = [
              'import tenantRouterOptions from "#build/tenant-router.options";',
              currentContent.slice(0, patchIndex),
              `...tenantRouterOptions,${currentContent.slice(patchIndex)}`,
            ].join("\n");
            return alteredContent;
          };
        }
      }
    });

    const composables = resolver.resolve('./runtime/composables')
    addImports([
      { from: composables, name: 'useTenant' },
    ])
  },
});
