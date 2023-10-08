<script setup lang="ts"></script>

<template>
  <div class="layout">
    <div class="w-100 d-flex flex-column align-items-center justify-content-start slot_wrapper">
      <slot name="main" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables';

.layout {
  background-color: $grey-bg;
  min-height: 100%;
}

.slot_wrapper {
  margin: 0 auto;
  max-width: 1350px;
  min-width: 1000px;

  &.header {
    background-color: $white-color;
  }
}
</style>
