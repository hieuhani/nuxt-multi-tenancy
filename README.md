# Nuxt 3 Multi-tenancy

Nuxt 3 Multi-tenancy module for building multi-tenant applications on Nuxt 3

<p>
  <a href="#features"><strong>Features</strong></a> ·
  <a href="https://techgoda.net"><strong>Demo</strong></a> ·
  <a href="#quick-setup"><strong>Quick Setup</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>

## Features

⛰ &nbsp;Multi-tenancy Nuxt dynamic tenant sites support by subdomains

🌻 &nbsp;Multiple Nuxt app sites in pages folder

🦄 &nbsp;Custom domain for each tenant route in pages folder

✨ &nbsp;A fully functional sample playground deployed on Vercel



## Quick Setup

1. Add `nuxt-multi-tenancy` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-multi-tenancy

# Using yarn
yarn add --dev nuxt-multi-tenancy

# Using npm
npm install --save-dev nuxt-multi-tenancy
```

2. Add `nuxt-multi-tenancy` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-multi-tenancy'
  ]
})
```

3. If you want to use dynamic tenants, create `[site]` folder under your Nuxt `pages` directory, you can check the [playground's pages folder](./playground/pages/[site]/) for referencing.

That's it! You can now use Nuxt Multi-tenancy in your Nuxt app ✨

4. If you want to have some additional system sites to be serving as a sub domain, for example: [jobs page](./playground/pages/jobs/)

Configure the sites property to add the list of tenant you want to be serving as system sites.
```js
export default defineNuxtConfig({
  modules: ['nuxt-multi-tenancy'],
  multiTenancy: {
    tenantDynamicRoute: 'site',
    rootDomains: ["nuxtdev.local", "techgoda.net"],
    sites: ['jobs']
  },
})
```

5. If you are using a hoster that provides preview environments with temporary domains including subdomains (e.g. `jobs.project-name-hash.example-hoster.com`), you can also disable the strict subdomain check, so only the first subdomain is used as the tenant (e.g. `foo.bar.baz.dev` → `foo`) and an exact match is not required (i.e. site + root domain).

```js
export default defineNuxtConfig({
  modules: ['nuxt-multi-tenancy'],
  multiTenancy: {
    tenantDynamicRoute: 'site',
    rootDomains: ["nuxtdev.local", "techgoda.net", "example-hoster.com"],
    strictSubdomains: false
    sites: ['jobs']
  },
})
```


6. If you want to custom domain for each tenant route, configure the `customDomains` property a map with key of domain and value of mapping tenant route. For example: `nuxtnews.com` to `news` route.

```js
export default defineNuxtConfig({
  modules: ['nuxt-multi-tenancy'],
  multiTenancy: {
    tenantDynamicRoute: 'site',
    rootDomains: ["nuxtdev.local", "techgoda.net"],
    customDomains: {
      "nuxtnews.com": "news"
    }
  },
})
```

## Options

Configure Nuxt Multi-tenancy module with the `multiTenancy` property.

```js
export default defineNuxtConfig({
  modules: ['nuxt-multi-tenancy'],
  // default options
  multiTenancy: {
    tenantDynamicRoute: 'site',
    rootDomains: ["nuxtdev.local", "techgoda.net"],
    strictSubdomains: true,
    sites: [],
    customDomains: {},
  },
})
```

## useTenant composition API

Use useTenant() to get the tenant ID

```js
import { useTenant } from '#imports'
const tenant = useTenant()
```


## Development

```bash
# Install dependencies
yarn install

# Generate type stubs
yarn dev:prepare

# Develop with the playground
yarn dev

# Build the playground
yarn dev:build

# Run ESLint
yarn lint

# Run Vitest
yarn test
yarn test:watch

# Release new version
yarn release
```

## Demo

You can view the demo at [techgoda.net](https://techgoda.net)

Features:

- A home page to list top first 30 articles from dev.to
- Tenant detail page. For example: [The Dev Team organization](https://dnse.techgoda.net)
- A custom static tenant page.
- An article detail page



## Contributing

- [Open an issue](https://github.com/hieuhani/nuxt-multi-tenancy/issues) if you believe you've encountered a bug with the module.

## License

[MIT License](./LICENSE)
