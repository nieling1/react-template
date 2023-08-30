const __DEV__ = process.env.NODE_ENV === 'development'

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/react',
    ['@babel/typescript'],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    __DEV__ && 'react-refresh/babel',
  ].filter(Boolean),
}
