<script setup lang="ts">

</script>

<template>
  <div class="layout h-100 p-4 pb-0 overflow-y-auto mb-4">
    <div class="w-100 h-100 slot_wrapper d-flex flex-row align-items-start justify-content-between">
      <div class="w-100 main_wrapper h-100 d-flex flex-row align-items-start justify-content-start">
        <div class="w-100 d-flex flex-column align-items-center justify-content-start me-3" style="width: 250px !important;">
          <slot name="stock" />
          <slot name="metric" />
        </div>
        <div class="w-100 d-flex flex-column align-items-center justify-content-start me-3" style="flex: 1">
          <slot name="search" />
          <slot name="action" />
          <slot name="price" />
          <slot name="recommended" />
        </div>
        <div class="w-100 d-flex flex-column align-items-center justify-content-start" style="width: 250px !important;">
          <slot name="viewed" />
          <slot name="favorite" />
          <slot name="question" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.layout {
  width: 100%;
  background-color: $grey-bg;
}

.slot_wrapper {
  margin: 0 auto;
  max-width: 1350px;
  min-width: 1000px;
}

.main_wrapper {
  flex: 1
}

.filter {
  width: 300px;
}
</style>