'use strict';
const path = require('path');

module.exports= {
  keys : 'secret',
  hostapi:"https://napi.sibu.net.cn",

  //关闭scrf安全策略
  security : {
    csrf: false
  }
};


