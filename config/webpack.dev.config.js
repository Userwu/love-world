/**
 * webpack开发模式配置文件
 *  webpack.dev.config.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-02-03 13:57:28
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

'use strict';

var path = require('path');
var webpack = require('webpack');
var config = require('./base');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var rootPath = config.commonPath.rootPath; //项目根目录
var srcPath = config.commonPath.srcPath;
var publicPath = config.commonPath.public;

/**
 * 输出配置
 * @type {String}
 */
config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';
config.output.publicPath = '/';

/**
 * devtool 配置
 * @type {String}
 */
config.devtool = 'cheap-eval-source-map';

/**
 * 入口配置
 * @type {Array}
 */
config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  'webpack/hot/only-dev-server',
  path.join(srcPath,'index.js'),
];

/**
 * webpack-sev-server 配置
 * @type {Object}
 */
config.devServer = {
  historyApiFallback:true,
  hot:true,
  inline:true,
  contentBase:publicPath,
  port:4000,
  stats:{color:true},
}

/**
 * loader 配置
 * @type {RegExp}
 */
config.module.loaders.push({
  test:/\.css$/,
  loader:'style!css!autoprefixer?{browsers:">1%"}',
},{
  test:/\.less$/,
  loader:'style!css!autoprefixer?{browsers:">1%"}!less',
},{
  test:/\.scss/,
  loader:'style!css!autoprefixer?{browsers:">1%"}!sass?outputStyle=expanded'
})

config.plugins.push(
  new webpack.DllReferencePlugin({
    context:__dirname,
    manifest:require(path.resolve(publicPath,'react-manifest.json')),
    name:'react-library',
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new ExtractTextPlugin('[name].css'),
  new BrowserSyncPlugin({
    host:'127.0.0.1',
    port:9090,
    proxy:'http://127.0.0.1:9000/',
    logConnections:false,
    notify:false,
  },{
    reload:false,
  })
);

module.exports = config;
