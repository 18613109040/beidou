'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');
const postcssOpts = {
    ident: 'postcss', 
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
        pxtorem({rootValue: 100, propWhiteList: []})
    ],
    cssnano
};
module.exports = (app, defaultConfig ) => ({
  ...defaultConfig,
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias : {
      assets: path.join(__dirname, '../client/src/assets'),
      components: path.join(__dirname, '../client/src/components'),
      containers: path.join(__dirname, '../client/src/containers')
    }
  },
  module:{
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader', 
            use: [
                'css-loader', 
                {
                    loader: 'postcss-loader',
                    options: postcssOpts
                },
                {
                    loader: 'less-loader'
                }]
        })
    }

    ]
  }
});
