<template>
  <div class="tab-tab">
    <router-link tag='div' to='/recommond'>
      <a>推荐</a>
    </router-link>
    <router-link tag='div' to='/singer'>
      <a>歌手</a>
    </router-link>
    <router-link tag='div' to='/rank'>
      <a>排行</a>
    </router-link>
    <router-link tag='div' to='/search'>
      <a>搜索</a>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:{},
  data(){
    return{}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
  .tab-tab
    display:flex
    div
      flex:1
      text-align:center
      padding:5px
      &.router-link-active a
        color:$color-theme
      a
        display:inline-block
        width:100%
        height:100%
</style>
