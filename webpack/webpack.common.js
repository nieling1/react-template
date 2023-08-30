const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const __DEV__ = process.env.NODE_ENV !== 'production'

/** @type {import('webpack').Configuration} */
module.exports = {
  context: path.resolve(__dirname, '..', 'src'),
  entry: {
    index: './index',
  },
  // cache: {
  //   type: 'filesystem',
  //   store: 'pack',
  //   buildDependencies: {
  //     config: [__filename],
  //   },
  // },
  output: {
    clean: true,
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'js/[name]@[id]-[chunkhash].js',
    chunkFilename: 'js/[name]@[id]-[chunkhash].chunk.js',
    assetModuleFilename: 'assets/[name]@[hash:8][ext][query]',
  },
  externals: {},
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            include: path.resolve(__dirname, '..', 'src'),
            use: [
              {
                loader: 'babel-loader',
                options: {
                  // cacheDirectory: true,
                  // cacheCompression: false,
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
              {
                loader: 'postcss-loader',
              },
            ],
          },
          {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
              __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
              {
                loader: 'postcss-loader',
              },
              'less-loader',
            ],
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
            include: path.resolve(__dirname, '../src'),
          },
          {
            test: /\.(gif|png|jpg|jpeg|webp|svg)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
          },
          {
            test: /\.(woff2?|ttf)$/,
            type: 'asset/resource',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React开发',
      template: '../public/index.html',
      filename: 'index.html',
      chunks: ['index'],
      minify: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        APP_ENV: JSON.stringify('qwer'),
      },
    }),
    new webpack.ProvidePlugin({}),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
  },
}
