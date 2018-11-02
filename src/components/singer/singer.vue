<template>
  <div class="containBox">
    <div class='scroll-wrapper' ref='wrapper'>
      <ul>
        <li class='singerItems' :class='getKey(item)' v-for='(item,index) in singerList' :key='index'>
          <div class='itemsTop' :class='{activedLetter:getKey(item)==activeLetter}' v-text='getKey(item)'></div>
          <div class='item' v-for='(singer,i) in item[getKey(item)]' :key='i'><img :src="singer.singer_pic" alt="LOL!"><span>{{singer.singer_name}}</span></div>
        </li>
      </ul>
      <div class='posabsTop'>{{activeLetter}}</div>
    </div>
    
    <ul class='sideNavBar'>
      <li v-for="(item,index) in singerList" :key="index" :class='{selectedAlph:index==activeNum}' @click='changeColor(index,getKey(item))'>{{getKey(item)}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import handleArr from "common/tools/sortName.js";
import Bscroll from "better-scroll";

export default {
  props: {},
  data() {
    return {
      activeNum: 0,
      activeLetter: "A",
      scroll: null
    };
  },
  methods: {
    changeColor: function(index, item) {
      this.activeNum = index;
      this.activeLetter = item;
      console.log(document.getElementsByClassName(".singerItems")[index]);
      this.scroll.scrollToElement(
        document.getElementsByClassName("singerItems")[index],
        500,
        false,
        false
      );
    },
    getKey: function(item) {
      var key;
      for (var keys in item) {
        key = keys;
      }
      return key;
    }
  },
  computed: {
    singerList() {
      return this.$store.state.singerList;
    }
  },
  watch: {
    singerList() {
      var that = this;
      this.$nextTick(() => {

        that.scroll = new Bscroll(that.$refs.wrapper, {
          scrollY: true,
          click: true,
          probeType: 3
        });

        var arr = [0];
        var init = 0;
        var arr1 = document.getElementsByClassName("singerItems");
        var len = arr1.length;
        console.log(len);
        console.log(arr1);
        for (var i = 0; i < len; i++) {
          init += arr1[i].offsetHeight;
          arr.push(init);
        }

        that.scroll.on("scroll", function(pos) {
          var activeIndex;
          var posy = pos.y > 0 ? 0 : -1 * pos.y;
          console.log(posy);
          for (var j = 0; j < arr.length; j++) {
            if (posy >= arr[j]) {
              activeIndex = j;
            }
          }
          that.activeNum = activeIndex;
          that.activeLetter = that.getKey(that.singerList[activeIndex]);
        });
      });
    }
  },
  created: function() {
    this.$store.dispatch('getSingerList')
    console.log('singerlist page created!!!!!!!!!!!!!!!');
  },
  mounted: function() {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable';

.containBox {
  position: relative;

  .scroll-wrapper {
    height: calc(100vh - 130px);
    overflow: auto;

    .posabsTop {
      height: 32px;
      padding-left: 32px;
      line-height: 32px;
      color: #fff;
      font-size: 16px;
      background: $color-highlight-background;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }

    .singerItems .itemsTop {
      padding-left: 32px;
      height: 32px;
      line-height: 32px;
      color: #666;
      font-size: 16px;
      background: $color-highlight-background;
    }

    .singerItems .activedLetter {
      color: #fff;
    }

    .singerItems .item:last-child {
      border-bottom: none;
    }

    .item {
      background: rgba(255, 255, 255, 0.15);
      color: $color-text-d;
      height: 42px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 20px;
        font-size: 16px;
      }
    }
  }

  .sideNavBar {
    position: fixed;
    top: 110px;
    right: 30px;
    width: 10px;

    li {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      color: #7e8c8d;
      background: $color-background;
      text-align: center;
      line-height: 20px;
      margin-bottom: 5px;
    }

    .selectedAlph {
      background: $color-highlight-background;
      color: $color-theme;
    }
  }
}
</style>