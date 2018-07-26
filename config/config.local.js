'use strict';


const domainWhiteList = [];
// [6001, 6000].forEach(port => {
//   domainWhiteList.push(`http://localhost:${port}`);
//   domainWhiteList.push(`http://127.0.0.1:${port}`);
//   domainWhiteList.push(`http://${localIP}:${port}`);
//   domainWhiteList.push(`http://120.77.6.187:8080`);
// });
// domainWhiteList.push(`http://testxws.sibumbg.com`);
module.exports = {
  proxyagent: {
    enable: true,
    package: 'egg-development-proxyagent',
  },
  // webpack: {
  //   devServer: {
  //     disableHostCheck: true, // 由于绑定了host, webpack-dev-server 校验header时抛出错误, 可以通过修改devServer配置关闭header校验:
  //   },
  // },
  mongoose: {
    url: 'mongodb://localhost:27017/cms',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  },
  security: { domainWhiteList },
};

