<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";

const rout = useRoute();

const routName = computed(() => rout.name)
</script>

<template>
  <app-layout-settings>
    <template #header>
      <app-ui-header/>
    </template>
    <template #main>
      <app-settings-settings v-if="routName === 'Settings'" />
      <app-settings-profile v-if="routName === 'Profile'" />
      <app-settings-manager v-if="routName === 'Manager'" />
    </template>
  </app-layout-settings>
</template>

<style scoped lang="scss">

</style>