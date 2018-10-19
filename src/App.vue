<template>
  <div id="app">
    <div class='fixedHeader'>
      <m-header></m-header>
      <tab></tab>
    </div>
    <div class='gasket'></div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from '@/components/header/header'
import tab from 'components/tab/tab'
export default {
  name: 'App',
  components:{
    MHeader,
    tab
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  .fixedHeader
    position:fixed
    top:0
    left:0
    width:100%
    z-index:10
    background:#222
  .gasket
    height:78px
    width:100%
    background:transparent
</style>
