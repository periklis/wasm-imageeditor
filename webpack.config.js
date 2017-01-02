'use strict';

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
            path.resolve(rootDir, 'src', 'app')
        ]
    },
    module: {
        loaders: [
            { loader: 'raw', test: /\.(css|html)$/ }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(rootDir, 'build')
    },
    plugins: [
        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve(rootDir, 'src', 'index.html')
        })
    ],
    resolve: {
        extensions: [ '', '.js']
    }
};
