"use strict";

const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname, '.');

module.exports = {
    debug: true,
    devServer: {
        contentBase: path.resolve(rootDir, 'build'),
        port: 9000
    },
    devtool: 'source-map',
    entry: {
        app: [
            'react-hot-loader/patch',
            './src/index.jsx'
        ]
    },
    module: {
        noParse: [
            new RegExp('node_modules/localforage/dist/localforage.js')
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|public\/)/,
                loader: "babel"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "file"
            },
            {
                test: /\.(woff|woff2)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "url?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.gif/,
                exclude: /(node_modules|bower_components)/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg/,
                exclude: /(node_modules|bower_components)/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png/,
                exclude: /(node_modules|bower_components)/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.css$/,
                exclude: /[\/\\]src[\/\\]/,
                loaders: [
                    'style?sourceMap',
                    'css'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /[\/\\](node_modules|bower_components|public\/)[\/\\]/,
                loaders: [
                    'style?sourceMap',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&sourceMap',
                    'postcss',
                    'sass'
                ]
            },
            {
                test: /\.css$/,
                exclude: /[\/\\](node_modules|bower_components|public\/)[\/\\]/,
                loaders: [
                    'style?sourceMap',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&sourceMap'
                ]
            }
        ]
    },
    output: {
        publicPath: '/',
        filename: '[name].bundle.js',
        path: path.resolve(rootDir, 'build')
    },
    plugins: [
        new HtmlWebpack({
            // filename: 'index.html',
            // inject: 'body',
            template: path.resolve(rootDir, 'src', 'index.html')
        })
    ],
    resolve: {
        extensions: [ '', '.js', '.jsx']
    }
};
