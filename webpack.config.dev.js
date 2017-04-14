'use strict';

const config = require('./webpack.config.base');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const rootDir = path.resolve(__dirname, '.');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('development')
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
};

module.exports = merge(config, {
  devServer: {
    contentBase: path.resolve(rootDir, 'build'),
    port: 9000
  },
  devtool: 'source-map',
  entry: {
    application: [
      'react-hot-loader/patch',
      './imageeditor/components/index.jsx'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS)
  ]
});
