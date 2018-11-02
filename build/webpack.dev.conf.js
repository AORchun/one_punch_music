'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const axios = require('axios');

const express = require('express');
const app = express();

const header = {
  origin: ' https://y.qq.com',
  referer: "https://y.qq.com/m/index.html"
}
const params = {
  g_tk: 5381,
  uin: 0,
  format: 'json',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'h5',
  needNewCode: 1
}
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})
app.get("/", function (req, res) {
  // console.log('server 3000 has been visited')
  axios.get('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', { header, params }).then(function (response) {
    res.send(response.data.data);
    // console.log(response.data.data)
  }).catch(function (error) {
    res.send(error);
    // console.log('server 3000 get some errors')
  })
})
//获取巅峰榜和全球排行榜
const params2 = {
  page: "index",
  format: "html",
  tpl: "macv4",
  v8debug: 1,
  jsonCallback: "jsonCallback"
}

app.get("/getRankList", function (req, res) {
  axios.get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg', { header, params: params2 }).then(function (response) {
    var resulte = response.data;
    function jsonCallback(obj) {
      res.send(obj)
    };
    eval(resulte);
  }).catch(function (error) {
    res.send(error)
  })
})
//获取歌手列表
const paramsSingerList = {
  callback: "getUCGI7220199335448163",
  g_tk: 5381,
  jsonpCallback: "getUCGI7220199335448163",
  loginUin: 0,
  hostUin: 0,
  format: "jsonp",
  inCharset: "utf8",
  outCharset: "utf-8",
  notice: 0,
  platform: "yqq",
  needNewCode: 0,
  data: { "comm": { "ct": 24, "cv": 10000 }, "singerList": { "module": "Music.SingerListServer", "method": "get_singer_list", "param": { "area": -100, "sex": -100, "genre": -100, "index": -100, "sin": 0, "cur_page": 1 } } }
}
app.get('/getSingerList', function (req, res) {
  axios.get("https://u.y.qq.com/cgi-bin/musicu.fcg", { header, params: paramsSingerList })
    .then(function (response) {
      var resulte = response.data;
      function getUCGI7220199335448163(str) {
        res.send(str.singerList.data.singerlist)
      }
      eval(resulte)
    }).catch(function (error) {
      res.send(error);
    })
})

//获取搜索热词列表
const hotkeyparams = {
  g_tk: 5381,
  jsonpCallback: "hotSearchKeysmod_top_search",
  loginUin: 0,
  hostUin: 0,
  format: "jsonp",
  inCharset: "utf8",
  outCharset: "utf-8",
  notice: 0,
  platform: "yqq",
  needNewCode: 0
}

app.get('/hotkeys', function (req, res) {
  axios.get("https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg", { header, params: hotkeyparams }).then(function (response) {
    var result = response.data
    function hotSearchKeysmod_top_search(data) {
      res.send(data.data);
    }
    eval(result)
  }).catch(function (error) {
    res.send(error);
  })
})

//即时搜索结果
const keywordparams = {
  is_xml: 0,
  format: "jsonp",
  g_tk: 5381,
  jsonpCallback: "SmartboxKeysCallbackmod_search815",
  loginUin: 0,
  hostUin: 0,
  format: "jsonp",
  inCharset: "utf8",
  outCharset: "utf-8",
  notice: 0,
  platform: "yqq",
  needNewCode: 0,
}
app.get('/keyword', function (req, res) {
  var params = Object.assign({}, keywordparams, {key:req.query.key})
  console.log(req.query.key);
  axios.get('https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', { header, params}).then(function (response) {
    var result = response.data;
    function SmartboxKeysCallbackmod_search815(data) {
      res.send(data.data);
    }
    eval(result);
  }).catch(function (error) {
    res.send(error);
  })
})
//获得点击后的搜索结果
const inputParams = {
  ct: 24,
  qqmusic_ver: 1298,
  new_json: 1,
  remoteplace: "txt.yqq.song",
  searchid: 68854901381091973,
  t: 0,
  aggr: 1,
  cr: 1,
  catZhida: 1,
  lossless: 0,
  flag_qc: 0,
  p: 1,
  n: 20,
  g_tk: 5381,
  jsonpCallback: "MusicJsonCallback14644978969788136",
  loginUin: 0,
  hostUin: 0,
  format: "jsonp",
  inCharset: "utf8",
  outCharset: "utf-8",
  notice: 0,
  platform: "yqq",
  needNewCode: 0
}
app.get('/inputword', function (req, res) {
  let params = Object.assign({}, inputParams, { w: req.query.k });
  axios.get('https://c.y.qq.com/soso/fcgi-bin/client_search_cp', { header, params }).then(function (response) { 
    let result = response.data;
    function MusicJsonCallback14644978969788136(data) {
      res.send(data)
     }
    eval(result)
  }).catch(function (errror) { 
    res.send(errror)
  })
})
const server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host, port);
})


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
