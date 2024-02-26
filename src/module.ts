import {
  defineNuxtModule,
  addTemplate,
  addPlugin,
  createResolver,
  addImports,
} from "@nuxt/kit";

export interface ModuleOptions {
  tenantDynamicRoute?: string;
  rootDomains: string[];
}

const routerPatchFlag = "...configRouterOptions,";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-multi-tenancy",
    configKey: "multiTenancy",
  },
  defaults: {
    tenantDynamicRoute: "site",
    rootDomains: ["localhost"],
  },
  setup({ tenantDynamicRoute, rootDomains }, nuxt) {
    nuxt.options.runtimeConfig.public = {
      ...nuxt.options.runtimeConfig.public,
      rootDomains,
    };
    const resolver = createResolver(import.meta.url);
    addPlugin(resolver.resolve("./runtime/plugin"));

    addTemplate({
      filename: "tenant-router.options.mjs",
      getContents: () => `
      import { useRequestURL } from 'nuxt/app';
      export default {
        routes: (routes) => {
          const { hostname } = useRequestURL();
          const rootDomain = ${JSON.stringify(
            rootDomains
          )}.find(domain => hostname.endsWith(domain));
          if (!rootDomain) {
            return routes;
          }
          const subDomain = hostname === rootDomain ? "@" : hostname.replace(\`.\${rootDomain}\`, "");
          const subDomainRoutePrefix = \`/\${subDomain}\`;
          if (routes.some((route) => route.path.startsWith(subDomainRoutePrefix))) {
            return routes
              .filter((route) => route.path.startsWith(subDomainRoutePrefix))
              .map((route) => {
                return {
                  ...route,
                  path: route.path.replace(subDomainRoutePrefix, "")
                };
              });
          }
          const tenantRoutePrefix = \`/:${tenantDynamicRoute}()\`;
          return routes
            .filter((route) => route.path.startsWith(tenantRoutePrefix))
            .map((route) => {
              return {
                ...route,
                path: route.path.replace(tenantRoutePrefix, "")
              };
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

    const composables = resolver.resolve("./runtime/composables");
    addImports([{ from: composables, name: "useTenant" }]);
  },
});
