<script setup lang="ts">

import AppLayoutAuth from "../layouts/AppLayoutAuth.vue";
import AppStaticAuth from "../static/AppStaticAuth.vue";
</script>

<template>
  <app-layout-auth>
    <template #left>
      <h1>Here might be a page title</h1>
    </template>
    <template #right>
      <app-static-auth />
    </template>
  </app-layout-auth>
</template>

<style scoped lang="scss">

</style>