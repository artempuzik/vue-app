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
    <app-ui-spinner  :size="60" :line="8" background="#f5f5f5"/>
  </div>
  <main
    ref="container"
    v-show="!appStore.isLoading"
    class="app_wrapper d-flex flex-column container-fluid p-1 position-relative"
  >
    <app-ui-header />
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
.app_wrapper {
  overflow-y: auto;
  min-width: 1000px;
  height: 100vh;
}
</style>
