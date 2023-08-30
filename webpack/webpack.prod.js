const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  cache: {
    type: 'filesystem',
    store: 'pack',
    buildDependencies: {
      config: [__filename],
    },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      reportTitle: 'bundle-analyzer-report.html',
      openAnalyzer: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css',
    }),
    new WebpackManifestPlugin({
      filter(file) {
        return true
      },
    }),
    new CompressionPlugin({
      test: /(\.js$)|(\.css)|(\.html)/,
      algorithm: 'gzip',
      threshold: 1024,
      minRatio: 0.8,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '..', 'public'),
          to: path.resolve(__dirname, '..', 'dist'),
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_debugger: true,
            // pure_funcs: ['console.log'],
          },
          format: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin({
        test: /(\.less$)|(\.css$)/,
      }),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      maxAsyncRequests: 20,
      maxInitialRequests: 20,
      enforceSizeThreshold: 200000,
      minSize: 20000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'custom-vendor',
          enforce: true,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
        },
        antd: {
          test: /[\\/]node_modules[\\/](antd|@ant-design|rc-.+)/,
          name: 'antd',
          enforce: true,
        },
      },
    },
  },
}
