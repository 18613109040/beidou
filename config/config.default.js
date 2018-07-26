'use strict';

const path = require('path');

module.exports = {
  keys: 'secret',
  middleware: ['errorHandler'],
  // https://github.com/alibaba/beidou/blob/master/packages/beidou-isomorphic/README.md
  // isomorphic: {
  //   babel: {
  //     presets: ['babel-preset-beidou-server'].map(require.resolve),
  //     plugins: [
  //       require.resolve('babel-plugin-dynamic-import-node'), [require.resolve('babel-plugin-import-inspector'), {
  //         serverSideRequirePath: true,
  //       }],
  //     ],
  //     extensions: ['.js', '.jsx', '.mjs'],
  //   },
  //   polyfill: true,
  // },
  webpack: {
    custom: {
      configPath: path.join(__dirname, './webpack.config.js'),
    },
  },

  bcrypt: {
    saltRounds: 10, // default 10
  },
  logger: {
    level: 'DEBUG',
  },
  // router: {
  //   root: '/pages',
  //   entry: 'page',
  // },
  react: {
    static: true,
  },
  // 关闭scrf安全策略
  security: {
    csrf: false,
  },
  jwt: {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  },
};
