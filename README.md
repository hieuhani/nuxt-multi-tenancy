# Nuxt Multi Tenancy Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

> Run multiple web applications in single NuxtJS instance

## Introduction

The module creates Vue routes based on the tenant name which can be specifiy by hostname or HTTP header, the tenant name has to match with sub-directory in pages/.

For example, we have tenant `apple` and create your Vue file tree in `pages/apple`. When visiting `apple` tenant, this module will automatically get the corresponding routes of `apple`.

## Installation

1. Add `nuxt-multi-tenancy-module` to your project

```bash
yarn add nuxt-multi-tenancy-module
```

2. Add `nuxt-multi-tenancy-module` to the `buildModules` section of `nuxt.config.js`

```js
export default {
  buildModules: ["nuxt-multi-tenancy-module"],
  multiTenancyModule: {
    tenants: ["apple", "banana"],
    defaultTenant: "home",
  },
};
```

## Options

### `tenants`

- Type: `Array[String]`
- Required

To specify the list of tenants that shoud match to sub-directories in pages/

### `defaultTenant`

- Type: `String`

To specify the default tenant when no tenant is matched

## License

MIT License

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/router/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-multi-tenancy-module
[npm-downloads-src]: https://img.shields.io/npm/v/nuxt-multi-tenancy-module/latest.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-multi-tenancy-module
