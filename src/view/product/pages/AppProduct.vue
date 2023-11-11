<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import AppHistoryLayout from '../layouts/AppHistoryLayout.vue';
import AppUiInput from '../../UI/AppUiInput.vue';
import AppUiSpinner from '../../UI/AppUiSpinner.vue';
import {useHistoryStore} from "../../../store";
import AppHistoryFilters from "../components/AppHistoryFilters.vue";
import AppHistoryItem from "../components/AppHistoryItem.vue";
import {PAGINATION_STEP} from "../../../app/config/constants.ts";
import AppUiButton from "../../UI/AppUiButton.vue";

const historyStore = useHistoryStore()

const query = ref('')

const currentPage = ref(0)

const changePage = (count: number) => {
  if(count === -1 && currentPage.value === 0) {
    return
  }
  if(count === 1 && currentPage.value === pages.value) {
    return
  }

  if(historyStore.filters) {
    currentPage.value += count
    historyStore.filters.offset = (currentPage.value * PAGINATION_STEP)

    historyStore.isListLoading = true
    historyStore.getHistoryList().finally(() => historyStore.isListLoading = false)
  }
}

const pages = computed(() => Math.round(historyStore.historyList.count / PAGINATION_STEP))

const list = computed(() =>
    historyStore.historyList.list.filter((history: History) => {
        return JSON.stringify(
            history.sku.toString() + history.product_name.toString()
        ).toLowerCase().includes(query.value.trim().toLowerCase());
    })
);

onMounted(() => {
  if(historyStore.filters) {
    historyStore.isPageLoading = true
    historyStore.getHistoryList().finally(() => historyStore.isPageLoading = false)
  }
})

</script>

<template>
  <div
      v-if="historyStore.isPageLoading"
      class="d-flex layout bg-color h-100 flex-column align-items-center justify-content-center app_wrapper"
  >
    <app-ui-spinner  :size="60" :line="8" background="#f5f5f5"/>
  </div>
  <app-history-layout>
  <template #search>
    <div class="w-100 d-flex flex-row align-items-center justify-content-between">
      <div style="width: 440px">
        <app-ui-input
            v-model="query"
            class="w-100"
            :placeholder="$t('history.search_placeholder')"
            :with-icon="true"
        />
      </div>
      <app-ui-button
          style="width: 150px; height: 40px"
          :is-in-active="true"
          :text="$t('buttons.export_bth')"
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
      <div
          v-if="historyStore.isListLoading"
          class="d-flex layout h-100 flex-column align-items-center justify-content-center app_wrapper"
      >
        <app-ui-spinner  />
      </div>
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
          v-for="history in list"
          :key="history.product_id + Date.now() + Math.random()*10"
      >
        <app-history-item :history="history"/>
      </template>
      </tbody>
    </table>
    </div>
    <div class="w-100 ms-2 my-2 d-flex align-items-center justify-content-end">
      <span>
       {{currentPage + 1}} / {{pages}} page
      </span>
      <img
          @click="changePage(-1)"
          src="../../../assets/svg/chevron.svg"
          width="30"
          class="cursor"
          style="transform: rotate(90deg)"
      >
      <img
          @click="changePage(1)"
          src="../../../assets/svg/chevron.svg"
          width="30"
          class="cursor"
          style="transform: rotate(-90deg)"
      >
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
.cursor {
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
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