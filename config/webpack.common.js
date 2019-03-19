const path = require('path')
const webpack = require('webpack')
const DotenvPlugin = require('dotenv-webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'none',
  entry: {
    server: path.resolve('app', 'server.js'),
    cluster: path.resolve('app', 'cluster.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve('node_modules'),
          path.resolve('lib')
        ],
        query: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: true
                }
              }
            ]
          ],
          plugins: [
            '@babel/plugin-transform-runtime'
          ]
        }
      }
    ]
  },
  plugins: [
    new DotenvPlugin({
      path: path.join(__dirname, '../.env'),
      systemvars: true,
      defaults: true
    }),
    new webpack.ProvidePlugin({
      log: path.resolve('lib/logger/index.js')
    })
  ],
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, '../'),
      '@': path.resolve(__dirname, '../', 'src')
    }
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  stats: {
    colors: true
  },
  cache: false
}
