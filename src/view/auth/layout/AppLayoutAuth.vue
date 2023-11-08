<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAppStore } from '../../../store';

const router = useRouter();
const appStore = useAppStore();

if (appStore.appConfig.isAuth) {
  router.replace('/');
}
</script>

<template>
  <div class="w-100 h-100 d-flex flex-row justify-content-start slot_wrapper">
    <div class="w-50 h-100 d-flex flex-column align-items-end justify-content-center position-relative">
      <div class="top_space"></div>
      <div class="w-100 h-100 left d-flex flex-column align-items-center justify-content-start position-relative">
        <slot name="left" />
      </div>
    </div>
    <div class="w-100 h-100 right d-flex flex-column align-items-center justify-content-start">
      <div class="top_space"></div>
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables';

.right {
  flex: 1;
  background-color: $blue-light-light;
  min-width: 500px;
}

.left {
  min-width: 500px;
  max-width: 800px;
}

.top_space {
  width: 100%;
  height: 16%;
  min-height: 145px;
}

.slot_wrapper {
  margin: 0 auto;
}
</style>
