<script setup lang="ts">
import AppHistoryFilterItem from "./AppHistoryFilterItem.vue";
import {HISTORY_FILTERS} from "../../../app/config/constants";
import AppHistorySelectFilter from "./AppHistorySelectFilter.vue";
import AppHistoryByUsersFilter from "./AppHistoryByUsersFilter.vue";
import {reactive, toRefs} from "vue";
import {useHistoryStore} from "../../../store";

const historyStore = useHistoryStore()

const refs = reactive({
  price: null,
  change: null,
  made: null,
  revenue: null,
  profit: null,
  sales: null,
  margin: null,
  categories: null,
});
const reset = async () => {
  Object.values(refs).forEach((el: InstanceType<any>) => {
    if(el && el.clear) {
      el.clear();
    }
  })
  historyStore.isEmptyFilter = true;
}

const { price, change, made, revenue, profit, sales, margin, categories } = toRefs(refs)
</script>

<template>
  <div class="w-100 h-100 filter_wrapper overflow-y-auto">
    <div class="w-100 d-flex flex-row align-items-center justify-content-between p-4 border-bottom border-2">
      <span class="filter-title">Filters</span>
      <span v-if="!historyStore.isEmptyFilter" @click="reset" class="clear-text">Clear all</span>
    </div>
    <app-history-filter-item ref="price" :title="HISTORY_FILTERS.PRICE"/>
    <app-history-filter-item ref="change" :title="`${HISTORY_FILTERS.CHANGE}(%)`"/>
    <app-history-by-users-filter ref="made" :title="HISTORY_FILTERS.MADE_BY"/>
    <app-history-filter-item ref="revenue" :title="HISTORY_FILTERS.REVENUE"/>
    <app-history-filter-item ref="profit" :title="HISTORY_FILTERS.PROFIT"/>
    <app-history-filter-item ref="sales" :title="HISTORY_FILTERS.SALES"/>
    <app-history-filter-item ref="margin" :title="HISTORY_FILTERS.MARGIN"/>
    <app-history-select-filter ref="categories" />
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.filter_wrapper {
  width: 100%;
  border: 1px solid $grey-border;
  border-radius: $input-border-radius;
  background-color: $white-color;
}

.filter-title {
  font-weight: bold;
  font-size: 1rem;
}

.clear-text {
  font-size: 0.7rem;
  color: #0500FF;
  font-weight: bold;
  cursor: pointer;
}

</style>