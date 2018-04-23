'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pxtorem = require('postcss-pxtorem');
const getStyleFallbackConfig = dev => ({
  loader: require.resolve('style-loader'),
  options: {
    hmr: dev,
  },
});
function getCssLoaderConfig(dev, modules = false) {
  return {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
      minimize: !dev,
      sourceMap: dev,
      modules,
      localIdentName: modules ? '[local]_[hash:base64:5]' : undefined,
    },
  };
}
const postCssLoaderConfig = {
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      }),
      pxtorem({rootValue: 100, propWhiteList: []})
    ],
  },
};
const lessLoaderConfig = {
  loader: require.resolve('less-loader'),
  options: {
    javascriptEnabled: true,
    modifyVars: {"@hd": "3px"}
  },
};
module.exports = (app, defaultConfig,dev ) => ({
  ...defaultConfig,
  module:{
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: getStyleFallbackConfig(dev),
          use: [getCssLoaderConfig(dev), postCssLoaderConfig, lessLoaderConfig],
        })
      }

    ]
  }
});
