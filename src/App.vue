<script setup lang="ts">
import {useAppStore} from "./store";
import AppUiSpinner from "./view/UI/AppUiSpinner.vue";
import {ref} from "vue";
import {intercom, startIntercomMessenger} from "./intercom";

const appStore = useAppStore()

const isLoading = ref(false)

intercom.show()

const init = () => {
  isLoading.value = true
  appStore.initApp().then(() => {
    startIntercomMessenger()
  }).finally(() => isLoading.value = false)
}

init()
</script>

<template>
  <div v-if="isLoading" class="d-flex flex-column align-items-center justify-content-center app_wrapper">
    <app-ui-spinner />
  </div>
  <main v-else class="app_wrapper p-1 position-relative">
    <app-ui-header />
    <router-view></router-view>
  </main>
</template>

<style lang="scss" scoped>
.app_wrapper {
  width: 100vw;
  height: 100vh;
  min-width: 1000px;
}
</style>
