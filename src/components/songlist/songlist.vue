<template name='rightSlideIn'>
  <div class='song-list-container' @touchmove.prevent >
    <div class='outer'>
      <div class='imgBox'  ref='imgBox'>
        <img src='./example.png' :style="{transform:'translate(-50%,-50%) scale('+ scale +')'}">
      </div>
      <div class="itemContianer" :style="{top:songlistTop+'px',minHeight:'calc(100% - ' + songlistTop + 'px)',maxHeihgt:'calc(100% - 200px)'}" @touchmove='move($event)' @touchstart='touchstart($event)' @touchend='touchend($event)' ref='scrollContainer'>
        <div class="itemBox"  ref='scrollBox'>
            <div class='listTitle'>歌单 19首</div>
            <ul>
              <li class='songItem'>
                <span>1</span>
                <div class='songInfo'>
                  <p>雪落的声音(live)</p>
                  <p>林俊杰</p>
                </div>
              </li>
              <li class='songItem'>
                <span>2</span>
                <div class='songInfo'>
                  <p>雪落的声音(live)</p>
                  <p>林俊杰</p>
                </div>
              </li>
              <li class='songItem'>
                <span>3</span>
                <div class='songInfo'>
                  <p>雪落的声音(live)</p>
                  <p>林俊杰</p>
                </div>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      scale: 1, //图片的方法倍数
      isShow: false, //本组件是否显示
      songlistTop:0,  //动态改变songlist top的距离
      songlistTopBase:0, //记录初始的songlist top的值
      songList:{},  //
      pointLog:0,   //点击坐标与itemsContainer的上边缘的距离
      previousPoint:0 //move事件的上一个事件clientY的位置 用于判断滑动的方向;
    };
  },
  props:{
    listTitle:String
  },
  components: {},
  created() {
    
  },
  mounted:function(){
    this.songlistTop=this.$refs.imgBox.clientHeight;
    this.songlistTopBase=this.$refs.imgBox.clientHeight;
  },
  methods: {
    touchstart:function(event){
      this.pointLog=event.touches[0].clientY-this.$refs.scrollContainer.offsetTop;
    },
    move:function(event){
      if(this.songlistTop>200){
        event.preventDefault();
        this.songlistTop=event.touches[0].clientY - this.pointLog;
        return
      }
      console.log(event)
    },
    touchend:function(event){

    }
  }
};
</script>
<style  lang='stylus' rel='stylesheet/stylus' scoped>
@import '~common/stylus/variable';

.song-list-container
  position:fixed
  left:0
  top:0
  width:100%
  height:100%
  overflow:hidden
  background:rgba(0,0,0,0.8)
  z-index:20
  .outer
    width: 100%
    height: 100%
    overflow: hidden
    position:relative
    top:0
    left:0
  .imgBox 
    width: 100%;
    padding-top: 100%;
    position: absolute;
    overflow:hidden
    img
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%
  .itemContianer
    position:absolute
    left:0
    top:0
    width:100%
    .itemBox
      position:absolute
      left:0
      width:100%
      height:auto
      background:$color-background
      .listTitle
        font-size:12px
        color:$color-text-d
        height:40px
        line-height:40px
        text-indent:10px
        border-bottom:1px solid rgba(255,255,255,0.1)
      ul
        .songItem
          display:flex
          align-items:center
          height:40px
          border-bottom:1px solid rgba(255,255,255,0.1)
          padding:5px 0
          span
            flex:0 0 10%
            line-height:40px
            text-align:center
          .songInfo
            align-self:stretch
            p
              height:50%;
              line-height:20px
              font-size:12px
              flex:0 0 80%
              text-overflow:ellipsis
              overflow:hidden
              white-space:nowrap
            p:last-child
              color:$color-text-d


  </style>