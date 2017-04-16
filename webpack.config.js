const autoprefixer = require('autoprefixer');
const path = require('path');
const rootDir = path.resolve(__dirname, '.');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const HtmlWebpack = require('html-webpack-plugin');

const commonConfig = {
  entry: {
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    publicPath: '/',
    filename: '[name].[hash:8].js',
    path: path.resolve(rootDir, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /[\/\\]node_modules[\/\\]/,
        enforce: 'pre',
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /[\/\\]node_modules[\/\\]/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
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
    }),
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version()
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      Components: path.resolve(rootDir, 'imageeditor/components'),
      Libs: path.resolve(rootDir, 'imageeditor/libs')
    }
  }
};

const developmentConfig = () => {
  const config = {
    devServer: {
      contentBase: path.resolve(rootDir, 'build'),
      port: process.env.HOST,
      host: process.env.PORT,
      hot: true,
      overlay: {
        errors: true,
        warnings: true
      }
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
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer
                ]
              }
            },
            {
              loader: 'sass-loader'
            },
            {
              loader: 'sasslint-loader',
              options: {
                failOnError: true
              }
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
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  };

  return webpackMerge(commonConfig, config);
};

const productionConfig = () => {
  const extractSass = new ExtractTextPlugin({
    filename: 'application.bundle.css'
  });

  const config = {
    devtool: 'cheap-module-source-map',
    entry: {
      application: [
        './imageeditor/components/index.jsx'
      ]
    },
    plugins: [
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
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    autoprefixer
                  ]
                }
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
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    autoprefixer
                  ]
                }
              }
            ]
          })
        }
      ]
    }
  };

  return webpackMerge(commonConfig, config);
};

module.exports = (env) => {
  if (env.target == 'production') {
    return productionConfig();
  }

  return developmentConfig();
};
