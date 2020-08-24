const { resolve } = require('path')

module.exports = function (moduleOptions) {
  const options = {
    ...moduleOptions
  }
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'router.js',
    options: {}
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
