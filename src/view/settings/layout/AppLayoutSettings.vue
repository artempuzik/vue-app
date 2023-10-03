<script setup lang="ts">

</script>

<template>
  <div class="w-100 d-flex flex-column align-items-center justify-content-start layout">
    <slot name="header"></slot>
    <slot name="main"></slot>
  </div>

</template>

<style scoped lang="scss">
@import '../../../styles/variables';

.layout {
  background-color: $grey-bg;
  min-height: 100%;
}
</style>