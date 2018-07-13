'use strict';

const path = require('path');

module.exports = (app, defaultConfig /* , dev */) => ({
  ...defaultConfig,
  // entry: {
  //   main: [path.join(__dirname, '../client/index.jsx')],
  // },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      client: path.join(__dirname, '../client'),
    },
  },
});
