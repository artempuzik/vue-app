<script setup lang="ts">
import { useAppStore } from './store';
import AppUiSpinner from './view/UI/AppUiSpinner.vue';
import {onBeforeMount} from "vue";
import {startIntercomMessenger} from "./intercom";

const appStore = useAppStore();

onBeforeMount(() => {
  appStore.isLoading = true;
  appStore.initApp().then((data) => {
    const name = data ? `${data.data.surname}` : ''
    startIntercomMessenger(name)
  })
})
</script>
<template>
  <div
    v-if="appStore.isLoading"
    class="d-flex flex-column align-items-center justify-content-center app_wrapper"
  >
    <app-ui-spinner />
  </div>
  <main
    ref="container"
    v-show="!appStore.isLoading"
    class="app_wrapper p-1 position-relative"
  >
    <app-ui-header />
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
.app_wrapper {
  width: 100vw;
  height: 100vh;
  min-width: 1000px;
  min-height: 750px;
}
</style>
