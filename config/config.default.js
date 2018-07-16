'use strict';

const path = require('path');

module.exports = {
  keys: 'secret',
  middleware: ['errorHandler'],
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
  mongoose: {
    url: 'mongodb://localhost:27017/cms',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  },
};

