<template>
  <div class="searchContainer">
    <div class='searcherBox'>
      <i @click='getResult()'></i><input type="text" placeholder='搜索歌曲、歌手' v-model='inputword' @focus='getTimeResult' @keyup.enter="getResult()" @keyup.down='slectSlideitemDown' @keyup.up='slectSlideitemUp' ref='searchIpt'/>
      <div class='searchInfoBox'>
        <div v-for='(value,key) in searchInfo' :key='key' class='musiciItem' v-if='value.itemlist.length'>
          <div class='leftMenu'>{{value.name}}</div>
          <ul class='rightItemsBox'>
            <li v-for='(item,index) in value.itemlist' :key='index' @click="getResult(item.name+'-'+item.singer);" ref='slideItem'>
              {{item.name+'-'+item.singer}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if='searchResult.length>0' class='searchResult'>
      <ul>
        <li v-for='(item,index) in searchResult'  :key='index'>
          {{item.title+"--"+item.singer[0].name}}
        </li>
      </ul>
    </div>
    <div v-else>
      <h3 class='hotKeysHeader'>热门搜索</h3>
      <div class='hotKeys'>
        <span v-for='(item,index) in hotKeys.hotkey' :key='index' @click='getResult(item.k)'>{{item.k}}</span>
      </div>
    </div>
    <div v-if='searchHistory.length>0'>
        <h3 class='searchHistoryHeader'>搜索历史<i @click='removeSearchHistory'></i></h3>
        <div class='searchHistory'>
          <p v-for='(item,index) in searchHistory' :key='index'>{{item}} <i @click='removeThisHistory(index)'></i></p>
        </div>  
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";

export default {
  props: {},
  data() {
    return {
      hotKeys: [],          //平台的搜索热词
      inputword: "",        //输入的关键词
      timer: undefined,        
      searchInfo:[],        //关键词的即时推荐结果
      searchResult:[],      //input框的关键词的搜索结果
      slectNum:0,           //$refs中下拉列表的index
      isArrowSelect:false   //是否使用上线箭头选择列表
    };
  },
  methods: {
    //触发输入框的搜索结果
    getResult: function(keyword) {
      var keyword=this.isArrowSelect?this.$refs.slideItem[this.slectNum].innerHTML:keyword?keyword:this.inputword
      console.log(keyword);
      if(keyword.length<1){
        return
      }
      this.$store.commit('addSearchHistory',keyword)
      var that=this;
      var val=keyword.trim().replace(/\s{1,}/g,'+')
      axios.get('http://localhost:3000/inputword?k='+val).then(function(response){
        console.log('获取的搜索结果',response.data);
        that.searchInfo=[];
        that.searchResult=response.data.data.song.list
      })
    },

    //触发实时的搜索推荐
    getTimeResult:function(){
     
      if(this.inputword.length<1){
        this.searchInfo=[];
        return
      }
      var val = this.inputword;
      var that=this
      axios.get("http://localhost:3000/keyword"+"?key="+val.trim().replace(/\s{1,}/,'+')).then(function(response){
        console.log("获取的即时结果",response.data)
        that.searchInfo=response.data;
        that.isArrowSelect=false;
        that.slectNum=0;
        var arr=that.$refs.slideItem
        var len=arr.length;
        for(var i=0;i<len;i++){
          arr[i].className='';
        }
      }).catch(function(error){
        console.log(error)
      })
    },

    //删除某项记录
    removeThisHistory:function(index){
      this.$store.commit('updateSearchHistory',index)
    },

    //删除所有记录
    removeSearchHistory:function(){
      this.$store.commit('rmvAllSearchHistory')
    },

    //input框向下按钮选择下拉列表
    slectSlideitemDown:function(){
      if(!this.$refs.slideItem){
        return
      }
      this.slectNum++;
      if(!this.isArrowSelect){
        this.isArrowSelect=!this.isArrowSelect
        this.slectNum=0
      }
      var arr=this.$refs.slideItem;
      var len=arr.length;
       if(this.slectNum>=len){
        this.slectNum=0
      }
      //console.log(this.slectNum)
      for(var i=0;i<len;i++){
        arr[i].className='';
        if(i==this.slectNum){
          arr[i].className='arrowSelectActive';
        }
      }
    },
    //input框向上选择下拉列表时
    slectSlideitemUp:function(){
      if(!this.$refs.slideItem){
        return
      }
      this.keepEnd();
       this.slectNum--;
      var arr=this.$refs.slideItem;
      var len=arr.length;
      if(!this.isArrowSelect){
        this.isArrowSelect=!this.isArrowSelect
        this.slectNum=len-1
      }
      if(this.slectNum<0){
        this.slectNum=len-1
      }
      //console.log(this.slectNum);
      for(var i=0;i<len;i++){
        arr[i].className='';
        if(i==this.slectNum){
          arr[i].className='arrowSelectActive';
        }
      }
    },

    //保持光标在input的尾部
    keepEnd:function(){
      var obj=this.$refs.searchIpt;
      var len=this.inputword.length*2;
      obj.setSelectionRange(len,len);
    }
  },
  computed:{
    searchHistory:function(){
      return this.$store.state.searchHistory
    }
  },
  watch: {

    //观察关键词的变化，设置数据节流
    inputword: function() {
       if (this.timer) {
        clearTimeout(this.timer);
        console.log('timer cleaned');
      }
      var that=this
     this.timer=setTimeout(function(){
       that.getTimeResult()
     },300)
    }
  },
  created() {
    var that = this;
    //阶段内即请求hotkeys
    axios
      .get("http://localhost:3000/hotKeys")
      .then(function(response) {
        that.hotKeys = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
      if(sessionStorage.getItem('onePunch_searchHistory')){
        this.$store.commit('initialSearchHistory',sessionStorage.getItem('onePunch_searchHistory'))
      }
  },
  mounted:function(){
   
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';
.searchContainer
  position:relative
  .searcherBox
    width: 90%;
    height: 30px;
    display: flex;
    align-items: center;
    margin: 10px auto;
    background: $color-dialog-background;
    border-radius: 5px;
    padding: 5px;
    position:relative
    .searchInfoBox
      position:absolute
      top:40px
      left:0
      width:100%
      z-index:10
      .musiciItem
        display:flex
        background:#fff
        .leftMenu
          align-self:stretch
          color:#666
          line-height:30px
          width:70px
          text-align:center
          flex:0 0 70px
        .rightItemsBox
          width:calc(100% - 70px)
          li
            height:30px
            line-height:30px
            color:#666
            overflow:hidden
            white-space:nowrap
            text-overflow:ellipsis
            width:100%
          .arrowSelectActive
            color:#fff
            background:#666
    i 
      width: 25px;
      height: 25px;
      background: url('icon_searcher.png') no-repeat center;
      background-size: 100% auto;
      flex: 0 0 25px;
    input 
      outline: none;
      border: none;
      color: #fff;
      align-self: stretch;
      line-height: 30px;
      font-size: $font-size-medium;
      flex: 1;
      background: transparent;
      padding-left: 10px;
      &::placeholder 
        color: $color-text-l;
        font-weight: 600;
        font-size: 14px;
  .searchResult
    overflow:auto
    width:100%
    ul li
      padding:10px 25px
      width:80%
      margin:auto
      line-height:20px
      font-size:14px
      background:#666
      &:hover
        background:#222
        color:#fff
  .slide-enter-active,.slide-leave-active
    transition:height 1s
  .slide-enter,.slide-leave-to
    height:0
  .hotKeysHeader, .searchHistoryHeader 
    padding: 10px 5%;
    color: #666;
    position: relative;
  .hotKeys 
    width: 90%;
    margin: auto;
    span 
      display: inline-block;
      padding: 10px;
      font-size: 14px;
      background: rgba(255, 255, 255, 0.3);
      color: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      margin-right: 15px;
      margin-bottom: 15px;
  .searchHistoryHeader 
    position: relative;
    margin-bottom: 20px;
    i 
      display: block;
      width: 20px;
      height: 20px;
      position: absolute;
      right: 5%;
      top: 8px;
      background: url('icon_lajit.png') no-repeat center;
      background-size: 100% auto;
  .searchHistory 
    width: 90%;
    margin: auto;
    p 
      color: $color-text-l;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      position: relative;
      i 
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0;
        top: 5px;
        background: url('icon_wrong.png') no-repeat center;
        background-size: 100% auto;
</style>
