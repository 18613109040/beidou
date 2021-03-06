'use strict';

const ip = require('ip');


const localIP = ip.address();
const domainWhiteList = [];
[6001, 6000].forEach((port) => {
  domainWhiteList.push(`http://localhost:${port}`);
  domainWhiteList.push(`http://127.0.0.1:${port}`);
  domainWhiteList.push(`http://${localIP}:${port}`);
});

module.exports = {
  // middleware : [
  //   'proxy'
  // ],
  // proxy : {
  //       match: '/api',
  //       host:"http://120.77.6.187:8080",
  //       cover:true
  // },
  proxyagent: {
    enable: true,
    package: 'egg-development-proxyagent',
  },
  static: {
    dynamic: false,
    preload: true,
  },
  security: { domainWhiteList },
};
