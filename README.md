//进入node_modules/beidou-webpack/config/webpack/utils.js

const pxtorem = require('postcss-pxtorem'); //==>新增

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
	  pxtorem({rootValue: 100, propWhiteList: []}) //==>新增
    ],
  },
};

const lessLoaderConfig = {
  loader: require.resolve('less-loader'),
  options: {
    javascriptEnabled: true,
    modifyVars: {"@hd": "2px"} //==>新增
  },
};

//进入node_modules/beidou-webpack/config/webpack/webpack.browser.js

  config.module.rules = [
    {
      test: /\.(js|jsx|mjs)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          plugins:[
            ["transform-runtime", { polyfill: false }], //==>新增
            ["import", [{ "style": true, "libraryName": "antd-mobile" }]],//==>新增
          ],
          presets: [require.resolve('babel-preset-beidou-client')],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: dev,
          compact: !dev,
          highlightCode: true,
        },
      },
    },
    ...getStyleCongfigs(dev),
    imageLoaderConfig,
    fileLoaderConfig,
  ];