<template>
  <div class='footerBox'>
      <div class="progressBar"  :style="{width: 'calc(100vw * '+ playProgress +')'}"></div>
      <div class="simpleControler">
           <audio autoplay controls :src='playingSrc'>
            </audio>
            <template v-if='playingInfo'>
                <div class='imgBx'>
                    <img :src="imgTop" alt="">
                </div>
                <div class='playSong' @click='isPanel=!isPanel'>
                    <p>{{playingInfo.songname}}</p>
                    <p><span v-for="(item,index) in playingInfo.singer" :key='item.name'><span v-if='index>0'>/</span>{{item.name}}</span></p>
                </div>
                <div class="togglePlay" :class='{active:isPaused}' @click='togglePlay'>
                </div>
                <div class="listBtn" @click='isShow=!isShow'></div>
            </template>
      </div>
      <transition>
        <div class="playSonglistMask" v-if='isShow' @click.self='isShow=!isShow'>
            <div class="playSonglistPoxBx">
                <div class='playSonglistTitle'>
                    <span v-if='playModel==0'></span>
                    <span>播放列表</span>
                    <span>共{{playSongList.length}}首</span>
                </div>
                <div v-for='(song,index) in playSongList' :key='index' class='songListItemBx'>
                        <div @click='playSelected(index)' class='songListItem'>
                            <span v-if='index == playingIndex' class='indexBox'><i></i></span>
                            <span v-else class='indexBox'>{{index+1}}</span>
                            <span class='songName'>{{song.musicData.songname}} -</span>
                            <span class='singerName'>
                                <span v-for='(singer,idx) in song.musicData.singer' :key='singer.name'>
                                    <span v-if='idx>0'>/</span>
                                    {{singer.name}}
                                </span>
                            </span>
                            <span v-if='song.playurl.includes("资源不在")' style='color:red;line-height:45px;padding:0 10px;font-size:12px'>资源不在了！</span>
                        </div>
                        <div @click='removeSelect(index)' class='removeBox'>
                            X
                        </div>
                </div>
            </div>
        </div>
    </transition>    
      
      <div class="playingPanel" v-if='isPanel'>
          <div class="topPart">
                <div class='comeOut'>
                    <span class='rightArrow' @click='isPanel=!isPanel'></span>
                </div>
                <div class="lyricBx">

                </div>
          </div>
          <div class='bottomPart'>
              <div class="progressBx" ref='barBx'>
                  <div class='progressBg'></div>
                  <div class="progressBar" :style="{width:'calc(100% * ' + playProgress + ')'}"></div>
                  <span class='progressBarHead' :style="{left:'calc(100%*'+ panelProgress +')'}" @touchstart='dragStart($event)' @touchmove='dragMove($event)' @touchend='dragEnd($event)' ref='header'></span>
                  <span class='progressTick'>{{currentTime | formateTime}}</span><span class='progressDuration'>{{playSongList[playingIndex].musicData.interval | formateTime }}</span>
              </div>
              <div class='panelControlBox'>
                  <span class='modelChangeBtn ' :class="[playModelNow]" @click='toggleModel'></span>
                  <span class='previousBtn' @click='playNext(-1)'></span>
                  <span class='playToggleBtn' :class="{paused:!isPaused,playing:isPaused}" @click='togglePlay'></span>
                  <span class='nextBtn' @click='playNext(1)'></span>
                  <span class='listBtn' @click='isShow=!isShow' ></span>
              </div>
          </div>
      </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import {mapGetters,mapState} from 'vuex';
import axios from 'axios';
export default{
    data(){
        return{  
        isShow:false,
        isPaused:false,
        audio:'',
        playingSrc:'',
        playingInfo:'',
        playProgress:0,
        songDuration:'',
        isPanel:false,
        playModelNow:'model0',
        imgTop:'',
        dragProgress:null,
        panelProgress:'',
        currentTime:'',
        startPoint:'',
        barWidth:''
    }
    },
    components:{
        
    },
    created(){
        this.$store.commit('init')
    },
    mounted(){
        this.audio=document.querySelector('audio');
        var that =this;
        var countTimer;
        this.audio.addEventListener('play',function(){
            console.log(that.audio.duration);
        },false)
        this.audio.addEventListener('ended',function(){
        clearInterval(countTimer);
        countTimer=null;
        if(that.playModel==2){
            that.audio.play();
            return
        }
        that.playNext(1);
        },false)
        this.audio.addEventListener('playing',function(){
            that.songDuration=that.audio.duration;
            countTimer=setInterval(function(){
                that.currentTime=that.audio.currentTime.toFixed(0);
                that.playProgress=(that.audio.currentTime / that.songDuration).toFixed(2);
            },1000)
        },false)
    },
    methods:{
        toggleModel(){
            var model=this.playModel;
            switch(model){
                case 0: this.$store.commit('changeModel',1);
                break;
                case 1: this.$store.commit('changeModel',2);
                break;
                case 2: this.$store.commit('changeModel',0);
                break;
            }
        },
        nextIndex(num){
            //num:-1是上一首，1是下一首
            var model= this.playModel;
            var index= this.playingIndex;
            var list = this.playSongList.length
            switch(model){
               case 1:index=Math.floor(Math.random()*list);
                break;
                default:index+=num;;
                break;
            }
            index=this.checkIndex(index);
            return index;
        },
        checkIndex(num){
            var index=num
            if(index<0){
                index=this.playSongList.length-1
            }
            if(index>=this.playSongList.length){
                index=0;
            }
            return index;
        },

        playNext(num){
            //播放下一首或者上一首，num为-1或者1;
            console.log('song is ended!')
            if(this.playSongList.length==1){
                this.audio.play();
                return
            }
            this.$store.commit('playIndex',this.nextIndex(num));
        },
        playSelected(index){
            //播放指定index的歌曲
            var index=index;
            if(index == this.playingIndex ) return ;
            index=this.checkIndex(index);
            this.$store.commit('playIndex',index);
        },
        removeSelect(index){
            if(index==this.playingIndex)this.playSelected(index+1);
            if(index<this.playingIndex){
                this.$store.commit('modifyIndex');
            }
            this.$store.commit('removeIndex',index);
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
        },
        dragStart(event){
            this.dragProgress=this.panelProgress;
            this.startPoint=event.touches[0].clientX;
            if(!this.barWidth){
                this.barWidth=this.$refs.barBx.offsetWidth
            }
        },
        dragMove(event){
            var distance=event.touches[0].clientX - this.startPoint;
            var nowOffsetLeft=this.$refs.header.offsetLeft + distance;
            var progress=(nowOffsetLeft / this.barWidth).toFixed(2);
        },
        dragEnd(event){
            var distance=event.touches[0].clientX - this.startPoint;
            if(distance==0)return;
            var nowOffsetLeft=this.$refs.header.offsetLeft + distance;
            this.dragProgress=(nowOffsetLeft / this.barWidth).toFixed(2);
            this.audio.currentTime=(this.duration * this.dragProgress).toFixed(0);
            this.dragProgress=null;
        }
    },
    computed:{
        ...mapState([
            'playSongList',
            'playModel',
            'playingIndex'
        ]),
        isLoop(){
            if(this.model==3){
                this.audio.setAttribute('loop','loop')
            }else{
                this.audio.removeAttribute('loop')
            }
        }
        
    },
    watch:{
        playModel:function(){
            this.playModelNow='model'+this.playModel;
        },
        playingIndex:function(){
            if(this.playingIndex<0){
                return
            }
            this.imgTop=this.playSongList[this.playingIndex].imgTop;
            var that = this;
            var index=this.playingIndex;
            var songmid;
            console.log(index);
            this.playingInfo=this.playSongList[index].musicData
            if(this.playSongList[index].playurl){
                if(this.playSongList[index].playurl.includes('资源不在了')){
                    this.playNext(1);
                    return;
                }
                this.playingSrc=this.playSongList[index].playurl;
                return
            }
            songmid=this.playingInfo.songmid;
            console.log(songmid);
            axios.get('http://127.0.0.1:3000/getVkey?songmid='+songmid).then(function(response){
                var result=response.data.data
                //console.log(result);
                if(!result.midurlinfo[0].purl){
                    that.$store.commit('addPlayUrl',
                {index:that.playingIndex,url:'资源不在了！'});
                    return
                }
                that.playingSrc='http://113.96.98.152/amobile.music.tc.qq.com/'+result.midurlinfo[0].purl;
                that.$store.commit('addPlayUrl',
                {index:that.playingIndex,url:that.playingSrc});
            }).catch(function(error){
                console.log(error)
            })
        },
        playProgress(){
            this.panelProgress = this.dragProgress ? this.dragProgress : this.playProgress
        }
    },
    filters:{
        formateTime:function(time){
            var minutes=Math.floor(time / 60);
            var seconds=Math.floor(time % 60);
            minutes=('00'+minutes).slice(-2);
            seconds=('00'+seconds).slice(-2);
            return minutes + ":" + seconds
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
        background:#222;
        border-top:1px solid rgba(255,255,255,0.06);
        z-index:15
        .progressBar
            position:absolute;
            top:0;
            left:0;
            height:1px;
            background:rgba(255,205,0,0.35)
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
            z-index:35
            .playSonglistPoxBx
                position:absolute;
                bottom:0;
                height:70%;
                width:100%;
                background:#222;
                border-top-left-radius:10px;
                border-top-right-radius:10px;
                overflow-x:hidden;
                overflow-y:auto;
                .playSonglistTitle
                    display:flex;
                    height:45px;
                    line-height:45px;
                    padding:0 23px;
                    color:rgba(255,255,255,0.6);
                    border-bottom:1px solid rgba(255,205,0,0.35)
                .songListItemBx
                    display:flex;
                    align-items:stretch;
                    height:45px;
                    border-bottom:1px solid rgba(255,255,255,0.3);
                    .songListItem
                        display:flex;
                        flex:1;
                        .indexBox
                            width:45px;
                            display:flex;
                            justify-content:center
                            align-items:center
                            font-size:16px
                            color:rgba(255,255,255,0.6)
                            i
                                display:block;
                                width:0;
                                height:0;
                                border-top:3px solid transparent;
                                border-right:3px solid transparent;
                                border-bottom:3px solid transparent;
                                border-left:3px solid $color-theme;
                        .songName,.singerName
                            font-size:14px;
                            color:rgba(255,255,255,0.75)
                            line-height:45px;
                    .removeBox
                        flex:0 0 45px;
                        width:45px;
                        line-height:45px;
                        text-align:center
                        font-size:18px
                        color:rgba(255,255,255,0.4) 
        .playingPanel
            position:fixed;
            top:0;
            left:0;
            bottom:0;
            right:0;
            background:rgba(0,0,0,0.8);
            z-index:30;
            display:flex;
            flex-flow:nowrap column;
            .topPart
                flex:1
                height:calc(100vh - 100px)
                width:100%
                overflow:hidden
                .comeOut
                    height:45px;
                    .rightArrow
                        height:45px;
                        width:45px
                        display:inline-block;
                        background:url('fanhui.png') no-repeat center center
                        background-size:auto 80%
                .lyricBx
                    width:100%;
                    height:calc(100% - 45px);
                    overflow:hidden;
            .bottomPart
                flex:0 0 100px;
                height:100px
                width:100%
                box-sizing:border-box
                padding:0 10%;
                .progressBx
                    position:relative
                    width:100%
                    height:10px
                    .progressBg
                        width:100%
                        height:4px
                        position:absolute
                        top:3px
                        background:rgba(255,255,255,0.6)
                        left:0
                    .progressBar
                        position:absolute;
                        left:0;
                        top:3px;
                        height:4px;
                        background:rgba(255,205,0,0.8)
                    .progressBarHead
                        position:absolute;
                        width:10px
                        height:10px;
                        background:#fff
                        border-radius:50%
                    .progressTick
                        position:absolute
                        left:-35px
                        top:0
                        line-height:10px
                        font-size:10px
                    .progressDuration
                        position:absolute;
                        right:-35px
                        top:0
                        line-height:10px
                        font-size:10px
                .panelControlBox
                    height:90px;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    span
                        width:45px;
                        height:45px;
                        border:transparent 1px solid 
                    .previousBtn
                        background:url('previous_one.png') no-repeat center center
                        background-size:80%;
                    .nextBtn
                        background:url('next_one.png') no-repeat center center
                        background-size:80%
                    .listBtn
                        background:url('music_list.png') no-repeat center center;
                        background-size:80%
                    span.model0
                        background:url('liebiaoxunhuan.png') no-repeat center center;
                        background-size:80%
                    span.model1
                        background:url('suijibofang.png') no-repeat center center;
                        background-size:80%
                    span.model2
                        background:url('danquxunhuan.png') no-repeat center center;
                        background-size:80%
                    span.paused
                        background:url('suspend_icon.png') no-repeat center center;
                        background-size:80%
                    span.playing
                        background:url('bofang.png') no-repeat center center;
                        background-size:80%




</style>

