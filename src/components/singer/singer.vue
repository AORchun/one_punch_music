<template>
  <div class="containBox">
    <div>
      singerlist
    </div>
    <ul class='sideNavBar'>
      <li v-for="(item,index) in normalArr" :key="index" :class='{selectedAlph:index==activeNum}' @mouseover='changeColor(index)'>{{item}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:{},
  data(){
    return{
      normalArr:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      activeNum:0
    }
    },
    methods:{
      changeColor:function(index){
        this.activeNum=index;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable';
  .containBox
    position:relative
    .sideNavBar
      position:fixed
      top:110px
      right:30px
      width:10px
      li
        width:20px
        height:20px
        border-radius:50%
        color:#7e8c8d
        background:$color-background
        text-align:center
        line-height:20px
        margin-bottom:5px
      .selectedAlph
        background:$color-highlight-background
        color:$color-theme
</style>