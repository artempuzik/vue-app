<script setup lang="ts">
defineProps(['value'])
const emit = defineEmits(['clear'])

</script>

<template>
  <div class="item_role d-flex flex-row align-items-center justify-content-between py-1 px-2">
    <span class="me-2">{{value}}</span>
    <svg @click="emit('clear')" width="10" height="10" viewBox="0 0 7 7" fill="none">
      <rect width="7" height="7" fill="url(#pattern0)"/>
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlink:href="#image0_0_1801" transform="scale(0.0416667)"/>
        </pattern>
        <image id="image0_0_1801" width="24" height="24" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAh0lEQVR4nO2USw6AIAwF5xIlckQ9riw8Dm4wMYZAy8e4cFYs2vcKLYWfr7ICzhDvUo6KDYhAUJq4FBtTbhUB9pRwAN4Qu2hvoTGRVnGNifSKl0xklHiuieFxtkxaEblVPazymoEfJe5mPpFkGmr5J2bxi24TzShKq4llzqXFZPqym76uf97lBItjSzKPDXfjAAAAAElFTkSuQmCC"/>
      </defs>
    </svg>

  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.item_role {
  font-size: 12px;
  height: 20px;
  background-color: $blue-light-light;
  color: $blue-normal;
  border-radius: $button-border-radius;
}

</style>