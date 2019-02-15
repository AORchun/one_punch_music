<template>
  <div class="theContainer">
    <div class='rankHeader'>QQ音乐巅峰榜</div>
    <div class='itemBox' v-for='item in hotLocalList' :key='item.topID'  @click='showSongList(item.topID,item.update_key,"top",item.pic_v12)'>
      <div class='imgBox'>
        <img :src="item.pic_v12" alt="LOL!" width='100%' height="100%">
      </div>
      <ol  class='top3Song'>
        <template v-for='(song,index) in item.songlist'>
          <li  :key='song.songid' v-if='index<3' ><p>{{song.songname+" - "+song.singername}}</p></li>
        </template>
      </ol>
    </div>
    <div class='rankHeader'>全球榜</div>
    <div class='itemBox' v-for='item in hotGlobalList' :key='item.topID'  @click='showSongList(item.topID,item.update_key,"global",item.pic_v12)'>
      <div class='imgBox'>
        <img :src="item.pic_v12" alt="LOL!" width='100%' height="100%">
      </div>
      <ol  class='top3Song'>
        <template v-for='(song,index) in item.songlist'>
          <li :key='song.songid' v-if='index<3'><p>{{song.songname+" - "+song.singername}}</p></li>
        </template>
      </ol>
    </div>
    <transition name='fRightslide'> 
       <songlist v-on:closeComponent='turnOffSongList'  v-if='isShowSongList' :imgTop='imgTop'>
         <span slot='title'>歌单 {{songList.songlist.length}}首</span>
         <ul class='slotContent' slot='list'>
              <li class='songItem' v-for='(item,index) in songList.songlist' :key='item.data.songid' @click='addNewOne(item)'>
                <span>{{index+1}}</span>
                 <div class='songInfo'>
                  <p>{{item.data.songname}}</p>
                  <p>{{item.data.singer[0].name}}</p>
                </div>
              </li>
            </ul>
       </songlist>
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
      isShowSongList: false,
      topId:null,
      update:null,
      type:null,
      imgTop:null,
      songList:''
    };
  },
  created: function() {
    this.$store.dispatch("getRankList");
  },
  methods: {
    addNewOne:function(item){
      item.imgTop=this.imgTop;
      item.musicData=item.data;
      this.$store.commit('addNewOne',item);
    },
    turnOffSongList: function() {
      //console.log("2222");
      this.isShowSongList = false;
    },
    showSongList:function(id,date,type,imgTop){
      this.topId=id;
      this.update=date;
      this.type=type;
      this.imgTop=imgTop;
      var that=this
      axios.get('http://127.0.0.1:3000/songlist?topid='+id+"&update="+date+"&type="+type).then(function (response) {
          that.songList=response.data;
          that.isShowSongList=true;
        }).catch(function (error) {
          console.log(error);
        })
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
ul.slotContent
  .songItem
    display: flex
    align-items: center
    height: 40px
    border-bottom: 1px solid rgba(255, 255, 255, 0.1)
    padding: 5px 0
    span
      flex: 0 0 10%
      line-height: 40px
      text-align: center
    .songInfo
      align-self: stretch
      p
        height: 50%
        line-height: 20px
        font-size: 12px
        flex: 0 0 80%
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
      p:last-child
        color: $color-text-d
#funckslot
  color:red
  font-size:20px
</style>