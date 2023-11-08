<script setup lang="ts">
import AppLayoutSettings from '../layout/AppLayoutSettings.vue';
import {OPTIONS} from '../../../app/config/constants.ts';
import {reactive, watch} from 'vue';
import { useAppStore } from '../../../store';
import {convertFormatToIndex} from '../../../app/helpers'
import toastAlert from "../../../app/helpers/toast.ts";
import {AxiosError} from "axios";

const appStore = useAppStore();
const languages = reactive({
  value: '',
  options: [] as string[]
});
const currency = reactive({
  value: '',
  options: [] as string[]
});
const time_zone = reactive({
  value: '',
  options: [] as string[]
});
const date_format = reactive({
  value: '',
  options: [] as string[]
});

const update = () => {
  if(!appStore.settingsOptions) {
    return
  }
  appStore.updateSettings({
    language_id: convertFormatToIndex(languages.value, appStore.settingsOptions[OPTIONS.languages]),
    timezone_id: convertFormatToIndex(currency.value, appStore.settingsOptions[OPTIONS.timezones]),
    date_format_id: convertFormatToIndex(time_zone.value, appStore.settingsOptions[OPTIONS.data_formats]),
    currency_id: convertFormatToIndex(date_format.value, appStore.settingsOptions[OPTIONS.currencies])
  })
      .then(() => toastAlert('Success', 'success', 2000)).catch((err: AxiosError<any>) => {
    if (err.response) {
      toastAlert(err.response.data.detail, 'error', 2000)
    }
  })
}

watch(() => [appStore.settingsOptions, appStore.settings], ()=> {
  if (!appStore.settingsOptions) {
    return
  }
  languages.value = appStore.settingsOptions[OPTIONS.languages][appStore.settings.language_id];
  languages.options = Object.values(appStore.settingsOptions[OPTIONS.languages]) as string[];
  currency.value = appStore.settingsOptions[OPTIONS.currencies][appStore.settings.currency_id];
  currency.options = Object.values(appStore.settingsOptions[OPTIONS.currencies]) as string[];
  time_zone.value = appStore.settingsOptions[OPTIONS.timezones][appStore.settings.timezone_id];
  time_zone.options = Object.values(appStore.settingsOptions[OPTIONS.timezones]) as string[];
  date_format.value = appStore.settingsOptions[OPTIONS.data_formats][appStore.settings.date_format_id];
  date_format.options = Object.values(appStore.settingsOptions[OPTIONS.data_formats]) as string[];
}, {immediate: true, deep: true })
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
        <div class="w-25">
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
