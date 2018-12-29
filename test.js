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
keywordparams = {
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
  var params = Object.assign({}, keywordparams, { key: req.query.key });
  console.log(req.query.key);
  axios.get('https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', { header, params }).then(function (response) {
    let result = response.data;
    function SmartboxKeysCallbackmod_search815(data) {
      res.send(data.data);
    }
    eval(result);
  }).catch(function (error) {
    res.send(error);
  })
})

//获得点击后的搜索结果
inputParams = {
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

//点击排行榜时获取歌单

const rankSongListParams = {
  tpl: 3,
  page: 'detail',
  song_begin: 0,
  song_num: 30,
  g_tk: 5381,
  loginUin: 0,
  hostUin: 0,
  format: 'json',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'yqq.json',
  needNewCode: 0
}

const songlistHeader = {
  origin: "https://y.qq.com"
}
app.get('/songlist', function (req, res) {
  let params = Object.assign({}, rankSongListParams, { date: req.query.update, topid: req.query.topid ,type:req.query.type});
  let header = Object.assign({}, songlistHeader, { referer: "https://y.qq.com/n/yqq/toplist/" + req.query.topid + '.html' });
  //console.log(params, header);
  axios.get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', { header, params }).then(function (response) { 

    let result = response.data;
    console.log(result);
    res.send(result);
  }).catch(function (errror) { 
    res.send(errror)
  })
})
app.use('/', route)
