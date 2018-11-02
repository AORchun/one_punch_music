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
    searchHistory:[]
  },
  getters: {
    
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
      console.log(data.data);
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
