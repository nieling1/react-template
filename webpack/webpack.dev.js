const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [new ReactRefreshPlugin()],
  devServer: {
    // port: 3015,
    compress: true,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        changeOrigin: true,
      },
    },
  },
}
