<script setup lang="ts">
</script>

<template>
  <div class="layout p-4">
    <div class="w-100 slot_wrapper d-flex flex-row align-items-start justify-content-between">
      <div class="w-100 main_wrapper h-100 d-flex flex-column align-items-start justify-content-start">
        <div class="w-100 d-flex flex-row align-items-center justify-content-start my-3">
          <slot name="search" />
        </div>
        <div class="w-100 d-flex flex-column align-items-center justify-content-start">
          <slot name="main" />
        </div>
      </div>
      <div class="filter ms-3 h-100 d-flex flex-column align-items-start justify-content-start">
        <slot name="filter" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables';

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