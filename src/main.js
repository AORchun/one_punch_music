import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import Vuex from 'vuex'
import axios from "axios"
import 'common/stylus/index.styl'


Vue.use(Vuex);

fastclick.attach(document.body)

Vue.config.productionTip = false
var store = new Vuex.Store({
  state: {
    arr: [],
    swiperSlides: [],
    hotLocalList: [],
    hotGlobalList:[]
  },
  getters: {
    
  },
  mutations: {
    getRecommondPageInfo(state,data) { 
      state.arr = data.data;
      state.swiperSlides = data.data.slider;
    },
    getSingerList(state, data) { 
      state.hotLocalList=state.data[0].List;
      state.hotGlobalList = state.data[1].List;
    }
  },
  actions: {
    getRecommondPageInfo({commit}) { 
      axios.get("http://localhost:3000/").then(function (response) {
        commit("getRecommondPageInfo", response);
      }).catch(function(error) {
        console.log(error);
      });
    },
    getSingerList({commit}) { 
      axios.get('http://localhost:3000/getRankList').then(function(response){
        commit("getSingerList", response);
    }).catch(function(){
      console.log(error)
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
