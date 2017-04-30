const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');
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
      'classnames',
      'es6-promise',
      'isomorphic-fetch',
      'lodash',
      'react',
      'react-dom',
      'react-dropzone',
      'redux',
      'react-redux',
      'react-toolbox'
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
        test: /\.jsx?$/,
        exclude: /[\/\\]node_modules[\/\\]/,
        enforce: 'pre',
        use: [
          'source-map-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: true
            }
          }
        ]
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
    extensions: ['.scss', '.ts', '.tsx', '.js', '.jsx' ],
    alias: {
      Actions: path.resolve(rootDir, 'imageeditor/actions'),
      Components: path.resolve(rootDir, 'imageeditor/components'),
      Containers: path.resolve(rootDir, 'imageeditor/containers'),
      Libs: path.resolve(rootDir, 'imageeditor/libs'),
      Reducers: path.resolve(rootDir, 'imageeditor/reducers')
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
        './imageeditor/components/index.tsx'
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
                  cssnext
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
              loader: 'css-loader',
              options: {
                import: true,
                modules: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  cssnext
                ]
              }
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
                  cssnext
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
        './imageeditor/components/index.tsx'
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(rootDir, 'imageeditor/images'),
          to: path.resolve(rootDir, 'build/images')
        }
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
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
            use: [
              {
                loader: 'css-loader',
                options: {
                  import: true,
                  modules: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    cssnext
                  ]
                }
              }
            ]
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
                    cssnext
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
