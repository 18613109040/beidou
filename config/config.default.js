'use strict';
const path = require('path');
const alias = {
  assets: path.join(__dirname, '../client/src/assets'),
  components: path.join(__dirname, '../client/src/components'),
  containers: path.join(__dirname, '../client/src/containers')
  };
module.exports= {
  keys : 'secret',
  hostapi:"https://napi.sibu.net.cn",
  webpack : {
      resolve:{
        alias
      }
  },
  //关闭scrf安全策略
  security : {
    csrf: false
  }
};


