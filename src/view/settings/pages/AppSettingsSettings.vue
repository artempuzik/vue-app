<script setup lang="ts">
import AppLayoutSettings from "../layout/AppLayoutSettings.vue";
import {CURRENCY, LANGUAGES, TIME_ZONE, DATE_FORMAT} from "../../../app/config/constants.ts";
import {reactive} from "vue";

const languages = reactive({
  value: Object.values(LANGUAGES)[0],
  options: Object.values(LANGUAGES)
})
const currency = reactive({
  value: CURRENCY[0],
  options: CURRENCY
})
const time_zone = reactive({
  value: TIME_ZONE[0],
  options: TIME_ZONE
})
const date_format = reactive({
  value: DATE_FORMAT[0],
  options: DATE_FORMAT
})

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
        <div class="w-25 d-flex flex-column align-items-start">
          <app-ui-select :label="'Language'" v-model="languages.value" :options="languages.options"/>
          <app-ui-select :label="'Currency'" v-model="currency.value" :options="currency.options"/>
          <app-ui-select :label="'Timezone'" v-model="time_zone.value" :options="time_zone.options"/>
          <app-ui-select :label="'Date Format'" v-model="date_format.value" :options="date_format.options"/>
        </div>
        <br>
        <div class="w-50">
          <app-ui-button class="p-3" :text="'Save'" :is-in-active="false" :size="'normal'"/>
        </div>
      </div>
    </template>
  </app-layout-settings>
</template>

<style scoped lang="scss">

</style>