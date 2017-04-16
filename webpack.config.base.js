const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
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
      }
    ]
  },
  plugins: [
    new HtmlWebpack({
      template: path.resolve(rootDir, 'imageeditor', 'components/index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      Components: path.resolve(rootDir, 'imageeditor/components'),
      Libs: path.resolve(rootDir, 'imageeditor/libs')
    }
  }
};
