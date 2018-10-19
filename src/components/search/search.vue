<template>
  <div class="">
    <div class='searcherBox'>
      <i></i><input type="text" placeholder='搜索歌曲、歌手'>
    </div>
    <h3 class='hotKeysHeader'>热门搜索</h3>
    <div class='hotKeys'>
      <span>汪苏泷</span>
      <span>邓紫棋</span>
      <span>鹿晗</span>
      <span>刚好遇见你</span>
      <span>布拉格广场</span>
      <span>汪苏泷</span>
      <span>邓紫棋</span>
      <span>鹿晗</span>
      <span>刚好遇见你</span>
      <span>布拉格广场</span>
    </div>
    <h3 class='searchHistoryHeader'>搜索历史</h3>
    <div class='searchHistory'>
      <p>周杰伦</p>
      <p>周杰伦</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:{},
  data(){
    return{}
    },
    methods:{
      
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
  .searcherBox
    width:90%
    height:30px
    display:flex
    align-items:center
    margin:10px auto
    background:$color-dialog-background
    border-radius:5px
    padding:5px
    i
      width:25px
      height:25px
      background:url('icon_searcher.png') no-repeat center
      background-size:100% auto
      flex:0 0 25px
    input
      outline:none
      border:none
      color:#fff
      align-self:stretch
      line-height:30px
      font-size:$font-size-medium
      flex:1
      background:transparent
      padding-left:10px
      &::placeholder
        color:$color-text-l
        font-weight:600
        font-size:14px
  .hotKeysHeader,.searchHistoryHeader
    padding:10px 5%
    color:#666
    position:relative
  .hotKeys
    width:90%;
    margin:auto
    span
      display:inline-block
      padding:10px
      font-size:14px
      background:rgba(255,255,255,0.3)
      color:rgba(255,255,255,0.5)
      border-radius:8px
      margin-right:15px
      margin-bottom:15px
  .searchHistoryHeader
    position:relative
    margin-bottom:20px
    &::after
      content:""
      display:block
      width:20px
      height:20px
      position:absolute
      right:5%
      top:8px
      background:url('icon_lajit.png') no-repeat center
      background-size:100% auto
  .searchHistory
    width:90%
    margin:auto
    p
      color:$color-text-l
      font-size:14px
      height:30px
      line-height:30px
      position:relative
      &::after
        content:''
        display:block
        width:20px
        height:20px
        position:absolute
        right:0
        top:5px
        background:url('icon_wrong.png') no-repeat center
        background-size:100% auto
</style>
