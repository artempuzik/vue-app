<script setup lang="ts">
import AppLayoutSettings from '../layout/AppLayoutSettings.vue';
import { CURRENCY, LANGUAGES, TIME_ZONE, DATE_TIME_FORMAT } from '../../../app/config/constants.ts';
import { reactive } from 'vue';
import { useCompanyStore } from '../../../store';

const companyStore = useCompanyStore();

const languages = reactive({
  value: companyStore.settings.lang,
  options: Object.keys(LANGUAGES)
});
const currency = reactive({
  value: companyStore.settings.currency,
  options: CURRENCY
});
const time_zone = reactive({
  value: companyStore.settings.timezone,
  options: TIME_ZONE
});
const date_format = reactive({
  value: companyStore.settings.datetime_format,
  options: DATE_TIME_FORMAT
});

const update = () => {
  companyStore.updateSettings({
    company: companyStore.company.company,
    lang: languages.value,
    currency: currency.value,
    timezone: time_zone.value,
    datetime_format: date_format.value
  });
};
</script>

<template>
  <app-layout-settings>
    <template #main>
      <div class="w-100 d-flex flex-column align-items-start p-4">
        <h3 class="category-title">
          {{ $t('settings.settings') }}
        </h3>
        <br>
        <div class="w-25 d-flex flex-column align-items-start">
          <app-ui-select
            v-model="languages.value"
            :label="$t('settings.language')"
            :options="languages.options"
          />
          <app-ui-select
            v-model="currency.value"
            :label="$t('settings.currency')"
            :options="currency.options"
          />
          <app-ui-select
            v-model="time_zone.value"
            :label="$t('settings.timezone')"
            :options="time_zone.options"
          />
          <app-ui-select
            v-model="date_format.value"
            :label="$t('settings.date_format')"
            :options="date_format.options"
          />
        </div>
        <br>
        <div class="w-50">
          <app-ui-button
            class="p-3"
            :text="'Save'"
            :is-in-active="false"
            :size="'normal'"
            @click="update"
          />
        </div>
      </div>
    </template>
  </app-layout-settings>
</template>

<style scoped lang="scss"></style>
