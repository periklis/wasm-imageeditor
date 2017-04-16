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

const extractSass = new ExtractTextPlugin({
  filename: 'application.bundle.css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = merge(config, {
  devtool: 'cheap-module-source-map',
  entry: {
    application: [
      './imageeditor/components/index.jsx'
    ]
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new CopyWebpackPlugin([
      {
        from: path.resolve(rootDir, 'imageeditor/images'),
        to: path.resolve(rootDir, 'build/images')
      }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        /* eslint-disable camelcase */
        screw_ie8: true
        /* eslint-enable camelcase */
      },
      output: {
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    extractSass
  ],
  module: {
    noParse: /\.bundle\.js$/,
    rules: [
      {
        test: /\.scss$/,
        exclude: /[\/\\]node_modules[\/\\]/,
        include: [
          path.resolve(rootDir, 'imageeditor')
        ],
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                camelCase: true,
                import: true,
                minimize: true,
                modules: true,
                sourceMap: false,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
                includePaths: [
                  path.resolve(rootDir, 'imageeditor/Components')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: /[\/\\]src[\/\\]/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
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
