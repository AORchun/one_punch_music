<template name='rightSlideIn'>
  <div class='song-list-container'>
    <div class='outer'>
      <div class='inner'>
        <img src='./example.png' :style="{transform:'translate(-50%,-50%) scale('+ scale +')'}">
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      scale: 1,
      isShow: false
    };
  },
  components: {},
  created() {},
  methods: {}
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
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  .inner 
    width: 100%;
    padding-top: 100%;
    position: relative;
    img
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
</style>