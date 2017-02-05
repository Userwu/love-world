/**
 * 生成环境配置文件
 *  webpack.prod.config.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-02-03 16:11:03
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

var webpack = require('webpack');
var config = require('./base');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * 输出配置
 * @type {String}
 */
config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = '[id].[chunkhash:6].js';

/**
 * devtool配置
 * @type {String}
 */
//config.devtool = 'cheap-source-map';

config.devtool = 'cheap-module-source-map';

/**
 * webpack模块配置
 * @type {RegExp}
 */
config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:">1%"}')
}, {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:">1%"}!less')
},{
  test:/\.scss/,
  loader:ExtractTextPlugin.extract('style','css!autoprefixer?{browsers:">1%"}!sass?outputStyle=expanded')
});

/**
 * 插件配置
 * @type {[type]}
 */
config.plugins.push(
  // stataic目录下静态资源的复制
  new CopyWebpackPlugin([ {
      context: config.commonPath.rootPath,
      from: 'static/*',
      ignore: ['*.md']
    }
  ]),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // 公共代码分离打包
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'mainifest']
  }),
  // 若要按需加载 CSS 则请注释掉该行
  new ExtractTextPlugin('[name].[contenthash:6].css', {
    allChunks : true
  })
);

module.exports = config;
