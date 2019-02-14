import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import Vuex from 'vuex'
import axios from "axios"
import 'common/stylus/index.styl'
import handleArr from "common/tools/sortName.js";


Vue.use(Vuex);

fastclick.attach(document.body)

Vue.config.productionTip = false
var store = new Vuex.Store({
  state: {
    //首页推荐列表
    arr: [],

    //轮播图内容
    swiperSlides: [],

    //歌手列表
    singerList: [],

    //国内排行榜
    localList: [],

    //国际排行榜
    globalList: [],

    //搜索历史
    searchHistory: [],
    
    //当前播放列表
    playSongList: [],
    
    //当前播放的index
    playingIndex: -1,
    
    //当前的播放模式: 0 顺序播放 1 随机播放 2 单曲循环 
    playModel:0
  },
  getters: {
    
    // //当前播放的JSON数据
    // playingSong: function (state) {
    //   return state.playSongList[state.playingIndex];
    // }
    
  },
  mutations: {
    //推荐列表更新
    getRecommondPageInfo(state,data) { 
      state.arr = data.data;
      state.swiperSlides = data.data.slider;
    },

    //歌手列表更新
    getSingerList(state, data) { 
      state.singerList=data
    },

    //排行榜更新
    getRankList(state, data) { 
     // console.log(data.data);
      state.localList=data.data[0].List
      state.globalList=data.data[1].List
    },

    //添加项目到搜索历史
    addSearchHistory(state, data) { 
      state.searchHistory.unshift(data);
      state.searchHistory=[...new Set(state.searchHistory)]
      sessionStorage.setItem('onePunch_searchHistory',state.searchHistory)
    },

    //从搜索历史中删除项目
    updateSearchHistory(state,index) { 
      state.searchHistory.splice(index, 1);
      sessionStorage.setItem('onePunch_searchHistory',state.searchHistory)
    },

    //初始化本地搜索历史到state
    initialSearchHistory(state,arr) { 
      state.searchHistory = arr.split(',');
    },

    //清空所有的所搜历史
    rmvAllSearchHistory: function (state) {
      state.searchHistory = [];
      sessionStorage.setItem('onePunch_searchHistory',state.searchHistory)
    },
    
    //向当前播放列表中添加
    addNewOne: function (state,item) { 
      state.playSongList.push(item);
      state.playingIndex = state.playSongList.length - 1;
    },
    //播放列表init

    init: function (state) {
      if (state.playSongList.length) { 
        state.playingIndex = 0;
       // state.playingSong = state.playSongList[0];
      }
    },
    
    //播放指定的曲目歌曲
    playIndex: function (state,index) { 
      state.playingIndex = index;
    },

    //向当前的播放歌曲添加请求回来的playurl
    addPlayUrl: function (state, payload) {
      state.playSongList[payload.index].playurl=payload.url
    },
    
    //移除指定index的歌曲
    removeIndex: function (state,index) { 
      state.playSongList.splice(index, 1);
      if (state.playSongList.length == 0) { 
        state.playingIndex = -1;
      }
    },

    //更改为指定的playmodel
    changeModel(state, payload) { 
      state.playModel=payload
    },
    //删除指针前面的项目时，会导致指针混乱，需要调整指针到正确的位置
    modifyIndex(state) { 
      state.playingIndex -= 1;
    }
  },
  actions: {
    //获取首页的数据，包括slider和推荐列表,并commit
    getRecommondPageInfo({commit}) { 
      axios.get("http://localhost:3000/").then(function (response) {
        commit("getRecommondPageInfo", response);
      }).catch(function(error) {
        console.log(error);
      });
    },

    //获取歌手列表,并commit
    getSingerList({commit}) { 
      axios.get('http://localhost:3000/getSingerList').then(function (response) {
        var result = handleArr(response.data);
        commit("getSingerList", result);
    }).catch(function(){
      console.log(error)
    })
    },

    //获取排行榜，并commit
    getRankList({ commit}) { 
      axios.get('http://localhost:3000/getRankList').then(function (response) {
        commit('getRankList',response)
      }).catch(function (error) {
        console.log(error);
       })
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
