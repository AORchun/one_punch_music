<template>
  <div class="containBox">
    <div class='scroll-wrapper' ref='wrapper'>
      <ul>
        <li class='singerItems' v-for='(item,index) in singerList' :key='index'>
          <div class='itemsTop' :class='{activedLetter:getKey(item)==activeLetter}' v-text='getKey(item)'></div>
          <div class='item' v-for='(singer,i) in item[getKey(item)]' :key='i'><img :src="singer.singer_pic" alt="LOL!"><span>{{singer.singer_name}}</span></div>
        </li>
      </ul>
        
    </div>
    
    <ul class='sideNavBar'>
      <li v-for="(item,index) in singerList" :key="index" :class='{selectedAlph:index==activeNum}' @mouseover='changeColor(index,getKey(item))'>{{getKey(item)}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import handleArr from "common/tools/sortName.js";
import Bscroll from "better-scroll";

export default {
  props: {},
  data() {
    return {
      activeNum: 0,
      activeLetter: "A",
      singerList: [],
      scroll:null
    };
  },
  methods: {
    changeColor: function(index, item) {
      this.activeNum = index;
      this.activeLetter = item;
      console.log(document.getElementsByClassName('.singerItems')[index]);
      this.scroll.scrollToElement(document.getElementsByClassName('singerItems')[index],500,false,false)
    },
    getKey: function(item) {
      var key;
      for (var keys in item) {
        key = keys;
      }
      return key;
    }
  },
  created: function() {
    var that = this;
    axios
      .get("http://localhost:3000/getSingerList")
      .then(function(response) {
        var result = handleArr(response.data);
        that.singerList = result;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  mounted: function() {
    this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {

        })
        this.scroll.on('scroll',function(pos){
          console.log(pos)
        })
      })
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable';

.containBox 
  position: relative;
  .scroll-wrapper
    height: calc(100vh - 130px);
    overflow: auto;
    .singerItems .itemsTop 
      padding-left: 32px;
      height: 32px;
      line-height: 32px;
      color: #666;
      font-size: 16px;
      background: $color-highlight-background;
    .singerItems .activedLetter 
      color: #fff;
    .singerItems .item:last-child 
      border-bottom: none;
    .item 
      background: rgba(255, 255, 255, 0.15);
      color: $color-text-d;
      height: 42px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      img 
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 20px;
        font-size: 16px;
  .sideNavBar 
      position: fixed;
      top: 110px;
      right: 30px;
      width: 10px;
      li 
        width: 20px;
        height: 20px;
        border-radius: 50%;
        color: #7e8c8d;
        background: $color-background;
        text-align: center;
        line-height: 20px;
        margin-bottom: 5px;
      .selectedAlph 
        background: $color-highlight-background;
        color: $color-theme;
</style>