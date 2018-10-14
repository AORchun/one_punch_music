const express = require('express')
const axios = require('axios')
const querystring = require('query-string')
const jsonp = require('jsonp')

const app = express();
const server = app.listen(8000, function () {
  console.log('app listening at localhost port 8000')
})
const route = express.Router()

var params = {
  g_tk: 5381,
  uin: 0,
  format: "json",
  inCharset: "utf-8",
  outCharset: "utf-8",
  notice: 0,
  platform: "h5",
  needNewCode: 1,
  _: Date.now()
}
var header = {
  'origin': 'https://m.y.qq.com',
  'referer': 'https://m.y.qq.com/'
}

var paramsJsonp = {
  page: "index",
  format: "html",
  tpl: "macv4",
  v8debug: 1,
  jsonCallback: "jsonCallback"
}

var headerJsonp = {
  "referer": "https://y.qq.com/n/yqq/toplist/26.html"
}

var jsonpOpts = {
  param: paramsJsonp,
  prefix: "",
};
function jsonCallback(obj) {
  console.log(obj)
}
route.get('/', function (req, res) {
  // axios.get('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', { header, params })
  //   .then(function (data) { res.json(data.data.data) })
  //   .catch(function (err) {console.log(err)})

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
app.use('/', route)
