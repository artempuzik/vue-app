<script setup lang="ts">
import {PropType, reactive} from "vue";
import {ProductItem} from '../../../../app/types'

const props = defineProps({
  product: Object as PropType<ProductItem>
})

const data = reactive({
  current: 0,
  direction: 1,
  transitionName: "fade",
  show: true,
  slides: [
    { className: "1" },
    { className: "2" },
    { className: "3" }
  ]
})

const  slide = (dir: number) => {
  data.direction = dir;
  dir === 1
      ? (data.transitionName = "slide-next")
      : (data.transitionName = "slide-prev");
  const len = data.slides.length;
  data.current = (data.current + dir % len + len) % len;
}

</script>

<template>
  <div class="slider">
    <span class="fw-bolder">Information</span>
    <div id="slider">
      <transition-group tag="div" :name="data.transitionName" class="slides-group">
        <div v-if="data.show" :key="data.current" class="slide">
          <p>{{data.slides[data.current].className}}</p>
        </div>
      </transition-group>
      <div class="btn btn-prev" aria-label="Previous slide" @click="slide(-1)">
        &#10094;
      </div>
      <div class="btn btn-next" aria-label="Next slide" @click="slide(1)">
        &#10095;
      </div>
    </div>
    <div class="my-3">
      <span>{{props.product?.sku}}</span>
      <div class="my-1">
        <span>{{props.product?.product_name}}</span>
        <span  class="ms-2 fw-bolder group-text">{{props.product?.category_name}}</span>
      </div>
      <div class="my-1">
        <span>{{props.product?.elasticity.actual_price}}$</span>
        <span class="mx-1">({{props.product?.elasticity.recommended_price}}$)</span>
        <span class="ms-2 group-text">Margin: {{props.product?.margin.toFixed(2)}}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../../styles/variables';

.slider {
  width: 400px;
  height: 350px;
}
/* FADE IN */
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter {
  opacity: 0;
}

/* GO TO NEXT SLIDE */
.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-next-enter {
  transform: translate(100%);
}
.slide-next-leave-to {
  transform: translate(-100%);
}

/* GO TO PREVIOUS SLIDE */
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-prev-enter {
  transform: translate(-100%);
}
.slide-prev-leave-to {
  transform: translate(100%);
}

/* SLIDES CLASSES */

.blue {
  background: #4a69bd;
}

.red {
  background: #e55039;
}

.yellow {
  background: #f6b93b;
}

/* SLIDER STYLES */
body {
  overflow: hidden;
  margin: 0;
  font-size: 50px;
  color: #fff;
}

.slides-group {
  width: 100%;
}

#slider {
  width: 100%;
  height: 200px;
  position: relative;
  background-color: $white-color;
}

.slide {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  position: absolute;
  top: calc(50% - 35px);
  left: 1%;
  transition: transform 0.3s ease-in-out;
  user-select: none;
}

.btn-next {
  left: auto;
  right: 1%;
}

.btn:hover {
  transform: scale(1.1);
}

.group-text {
  font-size: 10px;
}

</style>