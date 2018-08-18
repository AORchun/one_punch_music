<template>
  <div class="aa">
    <div class='logo'>
    </div>
    <div class="name">one-punch music</div>
    <div class='mine'>
      <span class='icon-mine'></span>
    </div>
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
@import '~common/stylus/mixin.styl'
  .aa
    color:$color-theme
    position:relative
    text-align:center
    padding:10px
    .logo
      display:inline-block
      width:32px
      height:32px
      bg-image('default')
      background-size:32px 32px
      vertical-align:top
      border-radius:50%
    .name
      display:inline-block
      font-size:20px
      line-height:32px
    .mine
      position:absolute
      top:10px
      right:10px
      font-size:20px



</style>