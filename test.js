const express = require('express')
const axios = require('axios')
const querystring = require('query-string')
const jsonp = require('jsonp')

const app = express();
const server = app.listen(8000, function () {
  console.log('app listening at localhost port 8000')
})
const route = express.Router()

var header = {
  'origin': 'https://m.y.qq.com',
  'referer': 'https://m.y.qq.com/'
}
//获取巅峰榜和全球排行榜
const params2 = {
  page: 'detail',
  date: '2018_42',
  topid: 123,
  type: 'global',
  song_begin: 0,
  song_num: 30,
  g_tk: 5381,
  jsonpCallback: 'MusicJsonCallbacktoplist',
  loginUin: 0,
  hostUin: 0,
  format: 'jsonp',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'yqq',
  needNewCode: 0
}

app.get("/getRankList", function (req, res) {
  axios.get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', { header, params: params2 }).then(function (response) {
    var resulte = response.data;
    function MusicJsonCallbacktoplist(obj) {
      res.send(obj)
    };
    eval(resulte);
  }).catch(function (error) {
    res.send(error)
  })
})

app.use('/', route)
