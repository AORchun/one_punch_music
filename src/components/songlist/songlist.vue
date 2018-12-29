<template name='rightSlideIn'>
  <div class='song-list-container'>
    <div class='outer' @touchmove.prevent>
      <div class='imgBox'  ref='imgBox' @click='closeSelf'>
        <img :src='imgTop' :style="{transform:'translate(-50%,-50%) scale('+ scale +')'}">
      </div>
      <div class="itemContianer" :style="{top:songlistTop+'px',minHeight:'calc(100% - ' + songlistTop + 'px)',maxHeight:'calc(100% - 100px)'}" @touchmove='move($event)' @touchstart='touchstart($event)' @touchend='touchend($event)' ref='scrollContainer'>
        <div class="itemBox"  ref='scrollBox'>
            <div class='listTitle'>歌单 19首</div>
            <ul>
              <li class='songItem' v-for='(item,index) in songList.songlist' :key='item.data.songid'>
                <span>{{index}}</span>
                <div class='songInfo'>
                  <p>{{item.data.songname}}</p>
                  <p>{{item.data.singer[0].name}}</p>
                </div>
              </li>
            </ul>
        </div>
      </div>
      <div v-if='songList.length==0' :style="{top:songlistTop+'px',height:'calc(100% - ' + songlistTop + 'px)'}" class='loadingBox'>
        <loading></loading>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import BScroll from "better-scroll";
import loading from "components/loading/loading";
import axios from 'axios';
export default {
  data() {
    return {
      scale: 1, //图片的方法倍数
      isShow: false, //本组件是否显示
      songlistTop: 0, //动态改变songlist top的距离
      songlistTopBase: 0, //记录初始的songlist top的值
      songList: [], //歌单列表
      pointLog: 0, //点击坐标与itemsContainer的上边缘的距离
      previousPoint: 0, //move事件的上一个事件clientY的位置 用于判断滑动的方向;
      BScroll: "",
      SListScrollTop: 0 //滚动组件卷曲的距离
    };
  },
  props: {
    listTitle: String,
    topId:[String,Number],
    update:String,
    reqType:String,
    imgTop:String
  },
  components: {
    loading
  },
  created() {
    var that=this
    axios.get('http://127.0.0.1:3000/songlist?topid='+this.topId+"&update="+this.update+"&type="+this.reqType).then(function (response) {
        that.songList=response.data;
      }).catch(function (error) {
        console.log(error);
       })
  },
  mounted: function() {
    this.songlistTop = this.$refs.imgBox.clientHeight;
    this.songlistTopBase = this.$refs.imgBox.clientHeight;
    this.BScroll = new BScroll(this.$refs.scrollContainer, {
      probeType: 3
    });
    var that = this;
    this.BScroll.on("scroll", function(pos) {
      //console.log(pos.y);
      that.SListScrollTop = pos.y;
      if (pos.y >= 0) {
        that.scale = 1 + pos.y / 100; //更改放大的倍数
      }
      if (that.songlistTop == 100 && pos.y >= 0) {
        //清除在100px位置的动量动画
        that.BScroll.stop();
      }
    });
  },
  methods: {
    touchstart: function(event) {
      this.pointLog =
        event.touches[0].clientY - this.$refs.scrollContainer.offsetTop;
      this.previousPoint = event.touches[0].clientY;
    },
    move: function(event) {
      var flag = event.touches[0].clientY - this.previousPoint;
      if (
        this.songlistTop >= this.songlistTopBase &&
        this.SListScrollTop >= 0
      ) {
          //songlistTop大于等于基准线 且卷曲距离大于等于0
        this.songlistTop = this.songlistTopBase;  //songlistTop置为基准线位置
        this.BScroll.enable();  //BScroll为可用
        //this.BScroll.refresh();
      } else if (this.songlistTop <= 100 && this.SListScrollTop <= 0) {
        //songlistTop小于等于100px,且卷曲距离小于等于0
        this.songlistTop = 100;   //songlistTop置为100px
        this.BScroll.enable();  //BScroll为可用
        this.BScroll.refresh();
      } else {
        //进入其他情况时
        this.SListScrollTop = 0; //SListScrollTop置为0
        this.BScroll.disable();
        this.songlistTop = event.touches[0].clientY - this.pointLog; //置为随鼠标滑动
      }
      this.previousPoint = event.touches[0].clientY;
    },
    touchend: function(event) {},
    closeSelf: function() {
      console.log("111");
      this.$emit("closeComponent");
    }
  }
};
</script>
<style  lang='stylus' rel='stylesheet/stylus' scoped>
@import '~common/stylus/variable'

.song-list-container
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  overflow: hidden
  background: rgba(0, 0, 0, 0.8)
  z-index: 20
  .outer
    width: 100%
    height: 100%
    overflow: hidden
    position: relative
    top: 0
    left: 0
  .imgBox
    width: 100%
    padding-top: 100%
    position: absolute
    overflow: hidden
    img
      width: 100%
      height: 100%
      position: absolute
      top: 50%
      left: 50%
  .itemContianer
    position: absolute
    left: 0
    top: 0
    width: 100%
    overflow: hidden
    background: #222
    .itemBox
      position: absolute
      left: 0
      width: 100%
      height: auto
      background: $color-background
      .listTitle
        font-size: 12px
        color: $color-text-d
        height: 40px
        line-height: 40px
        text-indent: 10px
        border-bottom: 1px solid rgba(255, 255, 255, 0.1)
      ul
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
  .loadingBox
    width: 100%
    background: #222
    position: absolute
    left: 0
</style>