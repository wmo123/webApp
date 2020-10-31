<template>
  <div class="recommend">
    <div class="slider-wrapper">
      <div class="slider-content">
        <slider v-if="recommendData">
          <div v-for="item in recommendData" :key="item.id">
            <a :href="item.linkUrl">
              <img class="" :src="item.picUrl" />
            </a>
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>
<script>
import { getRecommend } from 'api/recommend.js'
import { ERR_OK } from 'api/config.js'
import Slider from 'base/slider'
export default {
  components: { Slider },
  data() {
    return {
      recommendData: null
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend()
        .then((res) => {
          if (res.errno === ERR_OK) {
            this.recommendData = res.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.recommend
  .slider-wrapper
    width 100%
    height 0
    padding-top 40%
    position relative
    overflow hidden
    .slider-content
      width 100%
      height 100%
      position absolute
      top 0
      left 0
</style>
