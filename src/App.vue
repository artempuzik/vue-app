<script setup lang="ts">
import { useAppStore, useUserStore } from './store';
import AppUiSpinner from './view/UI/AppUiSpinner.vue';
import { startIntercomMessenger } from './intercom';
import {onBeforeMount} from "vue";

const appStore = useAppStore();
const userStore = useUserStore();

onBeforeMount(() => {
  appStore.isLoading = true;
  appStore
      .initApp()
      .then(() => {
        startIntercomMessenger(userStore.user.email);
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
