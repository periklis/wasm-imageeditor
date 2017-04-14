'use strict';
const autoprefixer = require('autoprefixer');
const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const rootDir = path.resolve(__dirname, '.');

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(rootDir, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /[\/\\]node_modules[\/\\]/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|avg)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 8192,
            name: 'images/[name].[ext]?[hash]'
          }
        }
      },
      {
        test: /\.(woff|woff2|turf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 8192,
            name: 'fonts/[name].[ext]?[hash]'
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /[\/\\]src[\/\\]/,
        use: [
          {
            loader: 'style-loader',
            query: { sourceMap: true }
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /[\/\\]node_modules[\/\\]/,
        use: [
          {
            loader: 'style-loader',
            query: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            query: {
              camelCase: true,
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /[\/\\]node_modules[\/\\]/,
        use: [
          {
            loader: 'style-loader',
            query: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpack({
      template: path.resolve(rootDir, 'imageeditor', 'index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  }
};
