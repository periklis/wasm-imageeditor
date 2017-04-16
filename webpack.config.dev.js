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
  module: {
    rules: [
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
              importLoaders: 1,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS)
  ]
});
