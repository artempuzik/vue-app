<script setup lang="ts">

import {computed} from "vue";

const props = defineProps({
  size: {
    type: Number,
    default: 32,
  },
  line: {
    type: Number,
    default: 4,
  },
  background: {
    type: String,
    default: 'white',
  },
})

const container_size = computed(() => +props.size + +props.line * 2)



</script>

<template>
  <div
      :style="{
        width: `${container_size}px`,
        height: `${container_size}px`,
        }"
      class="spinner-container"
  >
    <div
        :style="{
        width: `${size}px`,
        height: `${size}px`,
        background: background,
        }"
        class="spinner"
    />
  </div>
</template>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.spinner {
  background: $white-color;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-container {
  background: conic-gradient($white-color, $blue-normal);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
