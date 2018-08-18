const express=require('express')
const axios=require('axios')
const querystring =require('query-string')

const app=express();
const server=app.listen(8080,function(){
  console.log('app listening at localhost port 8080')
})
const route=express.Router()

var params={g_tk: 5381,
  uin: 0,
  format: "json",
  inCharset: "utf-8",
  outCharset: "utf-8",
  notice: 0,
  platform: "h5",
  needNewCode: 1,
  _: Date.now()
}
header={
  'origin':'https://m.y.qq.com',
  'referer':'https://m.y.qq.com/'
}

route.get('/',function(req,res){
  axios.get('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', { header, params }).then(function (data) {
    console.log(data.data.data)
    res.json(data.data.data)
  }).catch(function(err){
    console.log(err)
  })
})


app.use('/',route)
