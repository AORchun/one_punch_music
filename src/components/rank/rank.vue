<template>
  <div class="theContainer">
    <div class='rankHeader'>QQ音乐巅峰榜</div>
    <div class='itemBox' v-for='item in hotLocalList' :key='item.topID'>
      <div class='imgBox'>
        <img :src="item.pic_v12" alt="LOL!" width='100%' height="100%">
      </div>
      <ol  class='top3Song'>
        <li v-for='(song,index) in item.songlist' :key='song.songid' v-if='index<3' ><p>{{song.songname+" - "+song.singername}}</p></li>
      </ol>
    </div>
    <div class='rankHeader'>全球榜</div>
    <div class='itemBox' v-for='item in hotGlobalList' :key='item.topID'>
      <div class='imgBox'>
        <img :src="item.pic_v12" alt="LOL!" width='100%' height="100%">
      </div>
      <ol  class='top3Song'>
        <li v-for='(song,index) in item.songlist' :key='song.songid' v-if='index<3'><p>{{song.songname+" - "+song.singername}}</p></li>
      </ol>
    </div>
    <transition name='fRightslide'> 
       <songlist v-on:closeComponent='turnOffSongList'  v-if='isShowSongList'></songlist>
    </transition> 
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import songlist from "components/songlist/songlist";

export default {
  props: {},
  data() {
    return {
      isShowSongList: true
    };
  },
  created: function() {
    this.$store.dispatch("getRankList");
  },
  methods: {
    turnOffSongList: function() {
      console.log("2222");
      this.isShowSongList = false;
    }
  },
  computed: {
    hotLocalList() {
      return this.$store.state.localList;
    },
    hotGlobalList() {
      return this.$store.state.globalList;
    }
  },
  watch: {},
  components: {
    songlist
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'

.itemBox
  width: 90%
  height: 100px
  margin: 20px auto
  background: $color-highlight-background
  display: flex
  .imgBox
    flex: 0 0 100px
    width: 100px
    height: 100px
  .top3Song
    flex: 1
    width: calc(100% - 100px)
    display: flex
    flex-flow: nowrap column
    justify-content: space-around
    box-sizing: border-box
    align-items: center
    li
      height: 30px
      line-height: 30px
      width: 85%
      list-style-type: decimal
      color: $color-text-d
      font-size: $font-size-medium
      margin-left: 15px
      p
        no-wrap()
.rankHeader
  height: 30px
  line-height: 30px
  color: #fff
  background: $color-background-d
  padding: 10px 0px
  padding-left: 5%
  font-size: $font-size-large
  font-weight: 600
.fRightslide-enter-active, .fRightslide-leave-active
  transition: transform 0.5s
.fRightslide-enter, .fRightslide-leave-to
  transform: translate(100%, 0)
</style>