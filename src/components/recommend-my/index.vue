<template>
  <div class="recommend">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slider in Sliders" :key="slider.id">
          <img style="width: 100%" :src="slider.picUrl" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import { getRecommend } from 'api/recommend.js'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Recommend',
  components: {},
  data() {
    return {
      Sliders: []
    }
  },
  created() {
    this.getRecommendData()
  },
  methods: {
    getRecommendData() {
      getRecommend().then((res) => {
        if (res.errno === 0) {
          this.Sliders = res.data
          setTimeout(() => {
            new Swiper('.swiper-container', {
              autoplay: true,
              loop: true,
              pagination: {
                el: '.swiper-pagination',
                type: 'bullets'
              }
            })
          }, 20) // 浏览器17ms刷新一次
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.recommend{
  .swiper-container{
    --swiper-theme-color: #ff6600;
    .swiper-slide{
      width 100%
    }
  }
}
</style>
