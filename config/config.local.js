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
  react: {
    static: true,
  },
  security: { domainWhiteList },
};

