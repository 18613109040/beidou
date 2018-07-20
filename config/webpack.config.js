'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const pxtorem = require('postcss-pxtorem');

const imageLoaderConfig = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: '[name]-[hash:5].[ext]',
  },
};

const fileLoaderConfig = {
  test: [
    /\.ico$/,
    /\.svgz?$/,
    /\.png?$/,
    /\.jpe?$/,
    /\.gif?$/,
    /\.woff2?$/,
    /\.otf$/,
    /\.tiff?$/,
    /\.ttf$/,
    /\.eot$/,
    /\.midi?$/,
  ],
  loader: require.resolve('file-loader'),
  options: {
    name: '[name]-[hash:5].[ext]',
  },
};

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
      // pxtorem({ rootValue: 40, propWhiteList: [] }),
    ],
  },
};

const lessLoaderConfig = {
  loader: require.resolve('less-loader'),
  options: {
    javascriptEnabled: true,
  },
};

const getStyleFallbackConfig = dev => ({
  loader: require.resolve('style-loader'),
  options: {
    hmr: dev,
  },
});

function getStyleCongfigs(dev) {
  return [{
    test: /\.css$/,
    exclude: /\.module\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [getCssLoaderConfig(dev), postCssLoaderConfig],
    }),
  },
  {
    test: /\.module\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [getCssLoaderConfig(dev, true), postCssLoaderConfig],
    }),
  },
  {
    test: /\.s(c|a)ss$/,
    exclude: /\.module\.s(c|a)ss$/,
    use: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [
        getCssLoaderConfig(dev),
        postCssLoaderConfig,
        {
          loader: require.resolve('sass-loader'),
        },
      ],
    }),
  },
  {
    test: /\.module\.s(c|a)ss$/,
    use: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [
        getCssLoaderConfig(dev, true),
        postCssLoaderConfig,
        {
          loader: require.resolve('sass-loader'),
        },
      ],
    }),
  },
  {
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [getCssLoaderConfig(dev), postCssLoaderConfig, lessLoaderConfig],
    }),
  },
  {
    test: /\.module\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: getStyleFallbackConfig(dev),
      use: [
        getCssLoaderConfig(dev, true),
        postCssLoaderConfig,
        lessLoaderConfig,
      ],
    }),
  },
  ];
}

module.exports = (app, defaultConfig, dev = 'local') => ({
  ...defaultConfig,
  entry: {

    login: ['webpack-dev-server/client?http://localhost:6001/', // 资源服务器地址
      'webpack/hot/only-dev-server', path.join(__dirname, '../client/pages/login/index.jsx')],
    main: ['webpack-dev-server/client?http://localhost:6001/', // 资源服务器地址
      'webpack/hot/only-dev-server', path.join(__dirname, '../client/pages/home/index.jsx')],
  },
  module: {
    ...defaultConfig.module,
    rules: [{
      test: /\.(js|jsx|mjs)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          plugins: [
            'react-hot-loader/babel',
            'transform-decorators-legacy', ['transform-runtime', {
              polyfill: false,
            }], //= =>新增
            ['import', [{
              style: true,
              libraryName: 'antd',
            }]], //= =>新增
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
    ],

  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      client: path.join(__dirname, '../client'),
      // home: path.join(__dirname, '../client/pages/home'),
    },
  },
});
