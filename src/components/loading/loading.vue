<template>
  <div class='warpper'>
    <div class='box'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <span class='info'>loading... {{loading}}</span>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      loading:''
    };
  },
  components: {
  },
  created() {
    this.count();
  },
  methods: {
      count:function(){
      var that=this
      var colons='...'
      var n=0
      setInterval(function(){
        n--;
        that.loading=colons.slice(n%4)
      },500)
    }
  }
};
</script>
<style  lang='stylus' rel='stylesheet/stylus' scoped>
@import '~common/stylus/variable'

.warpper
  width: 100%
  height: 100%
  justify-content: center
  align-items: center
  background: #222
  position: relative
  .box
    width: 20px
    height: 5px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    animation: circle 1s linear infinite
    span
      position: absolute
      top: 0
      left: 0
      width: 20px
      height: 5px
      background: #fff
    span:nth-child(1)
      opacity: 1
      transform: rotate(0deg) translate(150%, 0%)
    span:nth-child(2)
      opacity: 0.9
      transform: rotate(45deg) translate(150%, 0%)
    span:nth-child(3)
      opacity: 0.8
      transform: rotate(90deg) translate(150%, 0%)
    span:nth-child(4)
      opacity: 0.7
      transform: rotate(135deg) translate(150%, 0%)
    span:nth-child(5)
      opacity: 0.6
      transform: rotate(180deg) translate(150%, 0%)
    span:nth-child(6)
      opacity: 0.5
      transform: rotate(225deg) translate(150%, 0%)
    span:nth-child(7)
      opacity: 0.4
      transform: rotate(270deg) translate(150%, 0%)
    span:nth-child(8)
      opacity: 0.3
      transform: rotate(315deg) translate(150%, 0%)
  @keyframes circle
    0%
      transform: translate(-50%, -50%) rotate(0deg)
    100%
      transform: translate(-50%, -50%) rotate(360deg)
  .info
    position:absolute
    left:50%
    top:50%
    transform:translate(-50%,-50%)
    padding:2px 5px
    color:#fff
    font-size:12px
</style>