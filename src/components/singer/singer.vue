<template>
  <div class="containBox">
    <div class='scroll-wrapper' ref='wrapper'>
      <ul>
        <li class='singerItems' :class='getKey(item)' v-for='(item,index) in singerList' :key='index'>
          <div class='itemsTop' :class='{activedLetter:getKey(item)==activeLetter}' v-text='getKey(item)'></div>
          <div class='item' v-for='(singer,i) in item[getKey(item)]' :key='i' @click='showSongList(singer.singer_mid,singer.singer_pic)'><img :src="singer.singer_pic" alt="LOL!"><span>{{singer.singer_name}}</span></div>
        </li>
      </ul>
      <div class='posabsTop'>{{activeLetter}}</div>
    </div>
    
    <ul class='sideNavBar'>
      <li v-for="(item,index) in singerList" :key="index" :class='{selectedAlph:index==activeNum}' @click='changeColor(index,getKey(item))'>{{getKey(item)}}</li>
    </ul>
    <transition name='fRightslide'>
      <songlist  v-on:closeComponent='turnOffSongList'  v-if='isShowSongList' :imgTop='imgTop'>
        <span slot='title' class='songlist-title'>{{songsList.singer_name}} {{songsList.list.length}}首</span>
        <ul slot='list' class='songlist-items'>
          <li class="songItem" v-for='(item,index) in songsList.list' :key='item.musicData.songid' @click='addNewOne(item)'>
            <span class='songIndex'>{{index+1}}</span>
            <span class='songName'>{{item.musicData.songname}}</span>
            <span class='singer'>{{(item.musicData.singer)[0].name}}</span>
            <span class='songDuration'>{{item.musicData.interval | formatTime}}</span>
          </li>
        </ul>
      </songlist>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import Bscroll from "better-scroll";
import songlist from "components/songlist/songlist";


export default {
  props: {},
  data() {
    return {
      activeNum: 0,
      activeLetter: "A",
      scroll: null,
      isShowSongList:false,
      imgTop:null,
      songsList:null
    };
  },
  components:{
    songlist
  },
  methods: {
    addNewOne(item){
      item.imgTop=this.imgTop
     this.$store.commit('addNewOne',item);
    },
    turnOffSongList:function(){
      this.isShowSongList=false;
    },
    showSongList:function(singer_mid,imgTop){
      this.imgTop=imgTop.replace('150x150','300x300');
      var that=this;
      axios.get('http://127.0.0.1:3000/songlistfromsingerid?singer_mid='+singer_mid).then(function(response){
        //console.log(response.data);
        that.isShowSongList=true;
        that.songsList=response.data.data;
      }).catch(function(error){
        console.log(error);
      })
    },
    changeColor: function(index, item) {
      this.activeNum = index;
      this.activeLetter = item;
      //console.log(document.getElementsByClassName(".singerItems")[index]);
      this.scroll.scrollToElement(
        document.getElementsByClassName("singerItems")[index],
        500,
        false,
        false
      );
    },
    getKey: function(item) {
      var key;
      for (var keys in item) {
        key = keys;
      }
      return key;
    }
  },
  computed: {
    singerList() {
      return this.$store.state.singerList;
    }
  },
  filters:{
    formatTime:function(val){
      var minuts=parseInt(val/60);
      var seconds=parseInt(val%60);
      minuts=("0"+minuts).slice(-2);
      seconds=("0"+seconds).slice(-2);
      return minuts+":"+seconds
    }
  },
  watch: {
    singerList() {
      var that = this;
      this.$nextTick(() => {

        that.scroll = new Bscroll(that.$refs.wrapper, {
          scrollY: true,
          click: true,
          probeType: 3
        });

        var arr = [0];
        var init = 0;
        var arr1 = document.getElementsByClassName("singerItems");
        var len = arr1.length;
        //console.log(len);
        //console.log(arr1);
        for (var i = 0; i < len; i++) {
          init += arr1[i].offsetHeight;
          arr.push(init);
        }

        that.scroll.on("scroll", function(pos) {
          var activeIndex;
          var posy = pos.y > 0 ? 0 : -1 * pos.y;
          //console.log(posy);
          for (var j = 0; j < arr.length; j++) {
            if (posy >= arr[j]) {
              activeIndex = j;
            }
          }
          that.activeNum = activeIndex;
          that.activeLetter = that.getKey(that.singerList[activeIndex]);
        });
      });
    }
  },
  created: function() {
    this.$store.dispatch('getSingerList')
    //console.log('singerlist page created!!!!!!!!!!!!!!!');
  },
  mounted: function() {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable';

.containBox
  position: relative;
  .scroll-wrapper 
    height: calc(100vh - 130px);
    overflow: auto;
    .posabsTop 
      height: 32px;
      padding-left: 32px;
      line-height: 32px;
      color: #fff;
      font-size: 16px;
      background: $color-highlight-background;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
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
  .fRightslide-enter-active, .fRightslide-leave-active
    transition: transform 0.5s
  .fRightslide-enter, .fRightslide-leave-to
    transform: translate(100%,0)
  .songlist-title
    height:40px
    padding: 5px 0
  .songlist-items .songItem
    height:40px
    border-bottom:1px solid rgba(255, 255, 255, 0.1)
    padding: 0 20px 0 5px
    display: flex
    flex-flow:wrap column
    align-content:space-between
    font-size:12px
    color:rgba(255,255,255,0.4)
    span
      flex: 0 0 100%;
      line-height:40px
    .songIndex
      width:40px
      text-align:center
    .songName
      width:50%
    .songDuration
      align-self:flex-end
</style>