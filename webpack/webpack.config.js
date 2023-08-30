const {merge} = require('webpack-merge')

const commonConfig = require('./webpack.common')

module.exports = function (env) {
  const {config} = env
  const envConfig = require(`./webpack.${config}.js`)
  return merge(commonConfig, envConfig)
}
