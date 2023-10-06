<script setup lang="ts">
import {useAppStore} from "./store";

const appStore = useAppStore()

const init = () => {
  appStore.initApp()
}

init()
</script>

<template>
  <main class="app_wrapper p-1 position-relative">
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
