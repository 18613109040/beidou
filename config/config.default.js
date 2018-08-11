'use strict';

const path = require('path');

module.exports = {
  keys: '1513779989145_1674',
  // 七牛云服务配置
  qiniu: {
    ak: 'YGmMh1K9fVVf77Ry6RGKLajeqErxwcZyTR1AYHld',
    sk: 'az5IPgfDJx2fQco5w5cvyKDPaRN86a4IrEwRtYyb',
    bucket: 'igola-dev-files',
    baseUrl: 'http://ovycf8zkv.bkt.clouddn.com/',
    zone: 'Zone_z0',
    app: true,
    agent: false,
  },
  middleware: ['errorHandler'],
  // https://github.com/alibaba/beidou/blob/master/packages/beidou-isomorphic/README.md
  // isomorphic: {
  //   babel: {
  //     presets: ['babel-preset-beidou-server'].map(require.resolve),
  //     plugins: [
  //       // 解决服务端不能识别import
  //       require.resolve('babel-plugin-dynamic-import-node'), [require.resolve('babel-plugin-import-inspector'), {
  //         serverSideRequirePath: true,
  //       }],
  //     ],
  //     extensions: ['.js', '.jsx', '.mjs'],
  //   },
  //   polyfill: true,
  // },
  isomorphic: {
    babel: {
      plugins: [
        require.resolve('babel-plugin-dynamic-import-node'),
        [require.resolve('babel-plugin-import-inspector'), {
          serverSideRequirePath: true,
        }],
      ],
      extensions: ['.js', '.jsx', '.mjs'],
    },
  },
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
  mongoose: {
    url: 'mongodb://localhost:27017/cms',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  },
  jwt: {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  },
};
