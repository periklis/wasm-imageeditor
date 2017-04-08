'use strict';
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./webpack.config.base');

const rootDir = path.resolve(__dirname, '.');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
};

module.exports = merge(config, {
  devtool: 'cheap-module-source-map',
  entry: {
    application: [
      './src/index.jsx'
    ]
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new CopyWebpackPlugin([
      {
        from: path.resolve(rootDir, 'src/images'),
        to: path.resolve(rootDir, 'build/images')
      }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin({
      filename: 'application.bundle.css',
      allChunks: true,
      disable: false
    })
  ],
  module: {
    noParse: /\.min\.js$/,
    rules: [
      {
        test: /\.scss$/,
        exclude: /[\/\\]node_modules[\/\\]/,
        include: [
          path.resolve(rootDir, 'src')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { camelCase: true, sourceMap: true } },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader', query: { outputStyle: 'compressed' } }
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: /[\/\\]node_modules[\/\\]/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  }
});
