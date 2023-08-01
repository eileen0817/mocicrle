module.exports = {
  devServer: {
    proxy: {
      '/cphApi': {
        // target: 'http://192.168.2.71:48080/',
        target: 'http://192.168.3.95:48080/',   
        changeOrigin: true,
        pathRewrite: {
          '^/cphApi': ''
        }
      }
    }
  },
  chainWebpack(config) {
    const webpack = require('webpack')

    config.plugin('xohu-define').use(webpack.DefinePlugin, [
      { 'vue.config': JSON.stringify(module.exports.devServer.proxy) }
    ])
  }
}