<script setup lang="ts">

import AppEmptyBlock from "./AppEmptyBlock.vue";
</script>

<template>
  <div class="block p-3">
    <div class="mb-3">
      <span class="category-title">{{ $t('dashboard.stock') }}</span>
    </div>
    <app-empty-block />
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.block {
  width: 100%;
  height: 380px;
  background-color: $white-color;
  border-radius: $block-border-radius;
}

</style>
