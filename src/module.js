const { resolve } = require('path')

module.exports = function () {
  const options = this.options.multiTenancyModule
  if (options) {
    if (!Array.isArray(options.tenants)) {
      console.error(
        'multiTenancyModule tenants must be an array of tenant names'
      )
      return
    }
    if (!options.defaultTenant) {
      console.warn('multiTenancyModule default tenant has not been specified')
    }
    if (typeof options.tenantsAlias !== 'object') {
      console.warn('multiTenancyModule tenants alias tenant must be an object with target & map')
    }
  } else {
    console.error('multiTenancyModule option must be specified in Nuxt config')
    return
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'router.js',
    options
  })

  let defaultRouter

  try {
    defaultRouter = require.resolve('@nuxt/vue-app/template/router')
  } catch (err) {
    try {
      defaultRouter = require.resolve('@nuxt/vue-app-edge/template/router')
    } catch (err) {
      /* istanbul ignore next */
      defaultRouter = require.resolve('nuxt/lib/app/router')
    }
  }

  this.addTemplate({
    fileName: 'defaultRouter.js',
    src: defaultRouter
  })
}
