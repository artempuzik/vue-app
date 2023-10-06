<script setup lang="ts">
import AppLocalizationSelector from "../components/AppLocalizationSelector.vue";
import {useRouter} from "vue-router";
import {useAppStore} from "../../../store";

const router = useRouter()
const appStore = useAppStore()

if (appStore.appConfig.isAuth) {
  router.replace('/')
}

</script>

<template>
  <div class="w-100 h-100 d-flex flex-row slot_wrapper">
    <div class="w-50 h-100 left d-flex flex-column align-items-center justify-content-center position-relative">
      <slot name="left"></slot>
      <app-localization-selector />
    </div>
    <div class="w-50 h-100 right d-flex flex-column align-items-center justify-content-center">
      <slot name="right"></slot>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import '../../../styles/variables';

.right {
  background-color: $blue-light-light;
}

.slot_wrapper {
  margin: 0 auto;
  max-width: 1350px;
  min-width: 1000px;
}
</style>