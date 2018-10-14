<template>
    
  <div>
    <swiper :options="swiperOption" class='slide-box'>
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index" class='slide-item'>
        <img :src="slide.picUrl" alt="/" width='100%' height='auto'>    
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class='bsContain'>
        <h4>电台</h4>
        <div class='broadcasting_station'>
          <a href="javascript:void(0)" v-for='(radio,index) in arr.radioList' :key='index'>
            <div class='imgBox'>
              <img :src="radio.picUrl" alt="" width="100%" height='100%'>
              <i class='playBtn'><i></i></i>
            </div>
            <p>{{radio.Ftitle}}</p>
            <p>&nbsp;</p>
          </a>
        </div>
    </div>
    <div class='bsContain'>
        <h4>热门歌单</h4>
        <div class='broadcasting_station'>
          <a href="javascript:void(0)" v-for='(radio,index) in arr.songList' :key='index'>
            <div class='imgBox'>
              <img :src="radio.picUrl" alt="" width="100%" height='100%'>
              <i class='playBtn'><i></i></i>
            </div>
            <p>{{radio.songListAuthor}}</p>
            <p>{{radio.songListDesc}}</p>
          </a>
        </div>
    </div>
    <copy-right></copy-right>
  </div>
</template>

<script type="text/ecmascript-6">
const axios = require("axios");
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import copyRight from "@/components/copyright/copyright.vue";

export default {
  props: {},
  data() {
    return {
      arr: [],
      swiperSlides: [],
      swiperOption: {
        direction: "horizontal",
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
    copyRight
  },
  created() {
    var that = this;

    axios
      .get("http://localhost:3000/")
      .then(function(response) {
        that.arr = response.data;
        that.swiperSlides = response.data.slider;
        // console.log(that.arr);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable';

.bsContain {
  box-sizing: border-box;
  margin-top: 20px;
  padding: 2%;
  color: #fff;

  .broadcasting_station {
    &>a {
      display: inline-block;
      margin-right: 2%;
      width: 49%;
      background: #3c3c3c;
      margin-bottom:10px
      padding-bottom:5px

      & .imgBox {
        position: relative;
        margin-bottom: 10px;

        &>i {
          position: absolute;
          right: 10px;
          bottom: 10px;
          border: 1px solid #7e8c8d;
          border-radius: 50%;
          width: 20px;
          height: 20px;

          &>i {
            border-width: 7px 10.4px;
            border-style: solid;
            border-color: transparent transparent transparent #7e8c8d;
            display: block;
            margin-left: 30%;
            margin-top: 19%;
          }
        }
      }

      p {
        color: #919191;
        padding-left: 5px;
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
      }
    }

    &>a:nth-of-type(even) {
      margin-right: 0;
    }
  }

  h4 {
    margin-bottom: 15px;
  }
}
</style>