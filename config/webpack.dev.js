const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
var WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = merge(common, {
  entry: [ path.resolve('app/server.js') ],
  output: {
    path: path.resolve('.dev'),
    filename: 'server.js'
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: [`nodemon --watch ${path.resolve('.dev', 'server.js')} ${path.resolve('.dev', 'server.js')}`]
    })
  ],
  watch: true,
  watchOptions: {
    poll: true
  }
})
