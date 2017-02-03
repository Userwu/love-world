/**
 * webpck通用配置文件
 *  base.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-02-03 13:42:38
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

'use strict'

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var rootPath = path.resolve(__dirname, '..'); //项目根目录
var srcPath = path.join(rootPath,'src'); //代码目录
var env = process.env.NODE_ENV.trim(); //当前环境 （开发环境、生产环境）

var commonPath = {
  rootPath:rootPath,
  srcPath:srcPath,
  public:path.join(rootPath,'public'), // 输出目录
  indexHtml:path.join(srcPath,'index.html'), //入口模板
  staticDir:path.join(rootPath,'static'), //静态资源（不编译）
}

module.exports = {
  commonPath:commonPath,
  entry:{
    app:path.join(srcPath,'index.js'),
    vendor:[
      'history',
      'react',
    ]
  },
  output:{
    path:commonPath.public,
    publicPath:'static/',
  },
  resolve:{
    extensions:['','.js','.jsx','.json'],
    alias:{ }
  },
  module:{
    loaders:[{
        test:/\.(js|jsx)$/,
        loaders:['react-hot','babel?cacheDirectory=true'],
        exclude:path.join(rootPath,'node_modules'),
      },{
        test:/\.json$/,
        loader:'json'
      },{
        test:/\.html$/,
        loader:'html',
      },{
        test:/\.(png|jpe?g|git|svg)$/,
        loader:'url',
        quiery:{
          limit:10240,
          name:'img/[name]-[hash:6].[ext]'
        }
      },{
        test:/.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader?limit=10240&name=[name]-[hash:6].[ext]'
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'react-mine',
      template:commonPath.indexHtml,
    }),
    new webpack.DefinePlugin({
      __DEV__:env === 'development',
      __PROD__:env === 'production',
    })
  ]
}
