<script setup lang="ts">

</script>

<template>
  <div class="layout h-100 p-4 pb-0 overflow-y-auto mb-4">
    <div class="w-100 h-100 slot_wrapper d-flex flex-row align-items-start justify-content-between">
      <div class="w-100 main_wrapper h-100 d-flex flex-column align-items-start justify-content-start">
        <div class="w-100 d-flex flex-row align-items-center justify-content-start my-3">
          <slot name="back" />
        </div>
        <div class="w-100 d-flex flex-row align-items-center justify-content-end my-3">
          <slot name="search" />
        </div>
        <div class="w-100 d-flex flex-column align-items-center justify-content-start">
          <div class="w-100 d-flex flex-row align-items-center justify-content-start">
            <slot name="info" />
            <div class="w-100 ms-3 rounded p-4 chart_wrapper">
              <slot name="price_metrics" />
            </div>
          </div>
          <div class="w-100 d-flex flex-row flex-wrap align-items-center justify-content-start">
            <slot name="stats" />
          </div>
          <div class="w-100 d-flex flex-row align-items-center justify-content-between my-4">
            <slot name="history" />
          </div>
          <div class="w-100 d-flex flex-column align-items-center justify-content-start mt-4">
            <slot name="main" />
          </div>
        </div>
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

.chart_wrapper {
  flex: 1;
  height: 100%;
  background-color: white;
}
</style>