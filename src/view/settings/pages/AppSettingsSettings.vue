<script setup lang="ts">
import AppLayoutSettings from "../layout/AppLayoutSettings.vue";

</script>

<template>
  <app-layout-settings>
    <template #header>
      <app-ui-header/>
    </template>
    <template #main>
      <div class="w-100 d-flex flex-column align-items-start p-4">
        <h3 class="category-title">Settings</h3>
        <br>
        <br>
        <div class="w-25 d-flex flex-column align-items-start">
          <app-ui-select :label="'Language'" />
          <app-ui-select :label="'Currency'" />
          <app-ui-select :label="'Timezone'" />
          <app-ui-select :label="'Date Format'" />
        </div>
        <br>
        <div class="w-50" style="height: 80px">
          <app-ui-button :text="'Save'" :is-in-active="false" :size="'normal'"/>
        </div>
      </div>
    </template>
  </app-layout-settings>
</template>

<style scoped lang="scss">

</style>