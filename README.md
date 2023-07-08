# Nuxt 3 Multi-tenancy

Nuxt 3 Multi-tenancy module for doing amazing things.

## Features

- ⛰ &nbsp;Multi-tenancy Nuxt sites support by sub-domains


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

3. Create `[site]` folder under your Nuxt `pages` directory, you can check the [playground's pages folder](./playground/pages/[site]/) for referencing.

That's it! You can now use Nuxt Multi-tenancy in your Nuxt app ✨

## Options

Configure Nuxt Multi-tenancy module with the `multiTenancy` property.

```js
export default defineNuxtConfig({
  modules: ['nuxt-multi-tenancy'],
  // default options
  multiTenancy: {
    tenantDynamicRoute: 'site'
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

## License

[MIT License](./LICENSE)
