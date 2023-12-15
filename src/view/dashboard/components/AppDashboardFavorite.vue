<script setup lang="ts">

import AppFavoriteCard from "./AppFavoriteCard.vue";
</script>

<template>
  <div class="block p-3 mt-4">
    <div class="mb-3">
      <span class="dashboard-category-title">{{ $t('dashboard.favorite') }} <span class="fw-normal">(1/1)</span></span>
    </div>
    <app-favorite-card sku="1234567890" title="Apple MacBook M1"/>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.block {
  width: 100%;
  height: 280px;
  background-color: $white-color;
  border-radius: $block-border-radius;
}

</style>
