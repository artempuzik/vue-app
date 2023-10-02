<script setup lang="ts">

</script>

<template>
  <div class="w-100 h-100 d-flex flex-row">
    <div class="w-50 h-100 left d-flex flex-column align-items-center justify-content-center">
      <slot name="left"></slot>
    </div>
    <div class="w-50 h-100 right d-flex flex-column align-items-center justify-content-center">
      <slot name="right"></slot>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import '../../../styles/variables';

.left {
}
.right {
  background-color: $blue-light-light;
}
</style>