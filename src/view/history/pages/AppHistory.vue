<script setup lang="ts">
import {ref} from 'vue'
import AppHistoryLayout from '../layouts/AppHistoryLayout.vue';
import AppUiInput from '../../UI/AppUiInput.vue';
import AppUiSpinner from '../../UI/AppUiSpinner.vue';
import {useHistoryStore} from "../../../store";
import AppHistoryFilters from "../components/AppHistoryFilters.vue";
import AppHistoryItem from "../components/AppHistoryItem.vue";

const historyStore = useHistoryStore()

const isLoading = ref(false)

const query = ref('')
</script>

<template>
  <div
      v-if="isLoading"
      class="d-flex layout bg-color h-100 flex-column align-items-center justify-content-center app_wrapper"
  >
    <app-ui-spinner  :size="60" :line="8" background="#f5f5f5"/>
  </div>
  <app-history-layout>
  <template #search>
    <div style="width: 440px">
      <app-ui-input
          v-model="query"
          class="w-100"
          :placeholder="$t('history.search_placeholder')"
          :with-icon="true"
      />
    </div>
  </template>
  <template #main>
    <div class="w-100 ms-2 my-2 d-flex align-items-center justify-content-start grey">
      <span>
        {{historyStore.historyList.count}} items
      </span>
    </div>
    <div class="w-100 table_body">
    <table class="w-100">
      <thead>
      <tr class="table_header">
        <th scope="col">
          {{ $t('history.sku') }}
        </th>
        <th scope="col">
          {{ $t('history.name') }}
        </th>
        <th scope="col">
          {{ $t('history.old_price') }}
        </th>
        <th scope="col">
          {{ $t('history.new_price') }}
        </th>
        <th scope="col">
          {{ $t('history.date') }}
        </th>
        <th scope="col">
          {{ $t('history.made_by') }}
        </th>
        <th scope="col">
          {{ $t('history.rule') }}
        </th>
      </tr>
      </thead>
      <tbody>
      <template
          v-for="history in historyStore.historyList.list"
          :key="history.product_id"
      >
        <app-history-item :history="history"/>
      </template>
      </tbody>
    </table>
    </div>
  </template>
    <template #filter>
      <app-history-filters />
    </template>
</app-history-layout>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.grey {
  color: $grey-table_header;
  opacity: 0.7;
}

.bg-color {
  background-color: $grey-bg;
}

.table_header th {
  color: $grey-table_header;
}

.table_body {
  overflow-y: auto;
  padding: 5px 15px;
  height: 50vh;
  max-height: 650px;
  border: 1px solid $grey-border;
  border-radius: $input-border-radius;
  background-color: $white-color;
}

.table_header {
  height: 80px;
}

tr {
  border-bottom: 2px solid $grey-border;
}

th {
  padding: 15px 0;
}

.error {
  color: $error-red;
}

.toast {
  color: $white-color;
  background-color: $purple-normal;
}
</style>