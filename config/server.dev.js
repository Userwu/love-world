/**
 * 开发服务器
 *  server.dev.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-02-03 15:16:24
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config');
var app = express();

var compiler = webpack(config);

app.use('/static', express.static(config.commonPath.staticDir));

app.use(require('connect-history-api-fallback')());
app.use(require('webpack-dev-middleware')(compiler,{
  noInfo:true,
  publicPath:config.output.publicPath
}))

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler));

app.listen(9000, '127.0.0.1', function(err) {
  err && console.log(err);
});
