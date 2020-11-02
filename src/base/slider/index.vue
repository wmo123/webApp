<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots-wrapper">
        <span
          class="dot"
          v-for="num in nums"
          :key="num"
          :class="{'active': currentPageIndex === (num - 1)}"></span>
      </div>
  </div>
</template>
<script>
import { addClass } from 'common/js/dom.js'
import BScroll from 'better-scroll'
import Slide from '@better-scroll/slide'
BScroll.use(Slide)
export default {
  name: 'Slider',
  components: {},
  data() {
    return {
      nums: 7,
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    // setTimeout(() => {
    this._setSliderWidth()
    this._initSlider()
    // }, 20)
  },
  methods: {
    _setSliderWidth() {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      const sliderWidth = this.$refs.slider.clientWidth
      this.children.forEach(item => {
        addClass(item, 'slider-item')
        item.style.width = sliderWidth + 'px'
        width += sliderWidth
      })
      if (this.loop) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BScroll('.slider', {
        scrollY: false,
        scrollX: true,
        click: true,
        slide: {
          loop: this.loop,
          autoplay: this.autoplay
        }
      })
      this.slider.on('slideWillChange', (page) => {
        this.currentPageIndex = page.pageX
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.slider
  .slider-group
    overflow hidden
    .slider-item
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
  .dots-wrapper
    position absolute
    bottom 4px
    left 50%
    transform translateX(-50%)
    .dot
      display inline-block
      margin 0 4px
      width 8px
      height 8px
      border-radius 50%
      background #eee
      opacity 0.5
      &.active
        width 20px
        border-radius 5px
        opacity 0.8
</style>
