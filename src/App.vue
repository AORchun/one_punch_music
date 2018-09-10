<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view/>
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
  
</style>
