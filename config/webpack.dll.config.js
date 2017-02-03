/**
 * 预打包配置
 *  webpack.dll.config.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-02-03 15:31:44
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

var webpack = require('webpack');
var path = require('path');
var publicPath = path.resolve(__dirname, '../public/');
var dependencies = require('../package.json').dependencies;


module.exports = {
  entry:{
    'react':Object.keys(dependencies)
  },
  output:{
    path:publicPath,
    filename:'[name].dll.js',
    library:'[name]_library',
  },
  plugins:[
    new webpack.DllPlugin({
      path:path.resolve(__dirname,'../public/[name]-manifest.json'),
      name:'[name]_library',
    })
  ],
  debug:true
}
