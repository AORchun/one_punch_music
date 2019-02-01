<template>
  <div class='footerBox'>
      <div class="simpleControler" v-if='playSongList.length'>
           <audio autoplay controls :src='playingSrc' @ended="playNext()">
            </audio>
            <div class='imgBx'>
                <img :src="playingSong.imgTop" alt="">
            </div>
            <div class='playSong'>
                <p>{{playingInfo.songname}}</p>
                <p><span v-for="(item,index) in playingInfo.singer" :key='item.name'><span v-if='index>0'>/</span>{{item.name}}</span></p>
            </div>
            <div class="togglePlay" :class='{active:isPaused}' @click='togglePlay'>
            </div>
          <div class="listBtn" @click='isShow=!isShow'></div>
      </div>
      <div class="playSonglistMask" v-if='isShow' @click.self='isShow=!isShow'>
          <div class="playSonglistPoxBx">
              
          </div>
      </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import {mapState} from 'vuex';
import axios from 'axios';
export default{
    data(){
      return{  
        isShow:false,
        isPaused:false,
        audio:'',
        playingSrc:'',
        playingInfo:''
      }
    },
    components:{

        },
    created(){
        this.$store.commit('init')
        },
    mounted(){
       
    },
    methods:{
        playNext(){
            this.$store.commit('playNext')
        },
        togglePlay(){
            if(!this.audio){
                this.audio=document.querySelector('audio');
                this.audio.volum=0.25;
            }
            this.isPaused=!this.isPaused;
            if(this.isPaused){
                this.pauseAudio();
            }else{
                this.playAudio();
            }
        },
        playAudio(){
            this.audio.play();
        },
        pauseAudio(){
            this.audio.pause();
        }
    },
    computed:mapState([
        'playSongList',
        'playModel',
        'playingSong',
        'playingIndex'
    ]),
    watch:{
        playSongList:function(){
            var that = this
            var songmid
            if(this.playingSong.musicData){
                this.playingInfo=this.playingSong.musicData
            }else if(this.playingSong.data){
                this.playingInfo=this.playingSong.data
            }
            songmid=this.playingInfo.songmid;
            console.log(songmid);
            axios.get('http://127.0.0.1:3000/getVkey?songmid='+songmid).then(function(response){
                var result=response.data.data
                console.log(result);
                if(!result.midurlinfo[0].purl){
                    console.log('资源已经不在了~~');
                    return
                }
                that.playingSrc='http://113.96.98.152/amobile.music.tc.qq.com/'+result.midurlinfo[0].purl
            }).catch(function(error){
                console.log(error)
            })
        }
    }
}
</script>
<style  lang='stylus' rel='stylesheet/stylus' scoped>
 @import '~common/stylus/variable';
    .footerBox
        position:fixed;
        bottom:0;
        width:100%;
        height:50px;
        background:#222
        border-top:1px solid rgba(255,205,50,0.5);
        .simpleControler
            width:100%;
            display:flex;
            align-items:stretch;
            position:relative;
            overflow:hidden
            audio
                position:absolute;
                top:-150%;
                //left:-150%;
            .imgBx
                height:50px;
                img
                    height:80%
                    margin:5% 10px;
                    border-radius:3px;
            .playSong
                flex:1;
                display:flex;
                flex-flow:nowrap column;
                justify-content:center;
                p
                line-height:20px
                p:first-child
                    color:#ddd
                    font-size:14px
                p:last-child
                    color:#999
                    font-size:12px
            .togglePlay
                width:50px;
                display:flex;
                align-items:center
                justify-content:center
                background:url('suspend_icon.png') no-repeat center center;
                background-size:50%
            .togglePlay.active
                background:url('bofang.png') no-repeat center center;
                background-size:50%
            .listBtn
                width:50px;
                display:flex;
                align-items:center;
                justify-content:center;
                background:url('music_list.png') no-repeat center center;
                background-size:50%
        .playSonglistMask
            position:fixed;
            width:100vw;
            height:100vh;
            background:rgba(0,0,0,0.6);
            left:0;
            top:0;
            .playSonglistPoxBx
                position:absolute;
                bottom:0;
                height:70%;
                width:100%;
                background:#222;
                border-top-left-radius:10px;
                border-top-right-radius:10px;
                overflow:hidden;

</style>

