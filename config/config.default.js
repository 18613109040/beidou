'use strict';

const path = require('path');

module.exports = {
  keys: 'secret',
  hostapi: 'https://napi.sibu.net.cn',
  isomorphic: {
    babel: {
      plugins: [
        require.resolve('babel-plugin-dynamic-import-node'),
        [require.resolve('babel-plugin-import-inspector'), {
          serverSideRequirePath: true,
        }],
      ],
    },
  },

  webpack: {
    custom: {
      configPath: path.join(__dirname, './webpack.config.js'),
    },
  },
  logger: {
    level: 'DEBUG',
  },
  router: {
    root: '/pages',
    entry: 'page',
  },
  react: {
    static: true,
  },
  // 关闭scrf安全策略
  security: {
    csrf: false,
  },
};

