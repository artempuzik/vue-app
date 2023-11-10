<script setup lang="ts">
import AppHistoryFilterItem from "./AppHistoryFilterItem.vue";
import {HISTORY_FILTERS} from "../../../app/config/constants";
import AppHistorySelectFilter from "./AppHistorySelectFilter.vue";

</script>

<template>
  <div class="w-100 filter_wrapper">
    <div class="w-100 d-flex flex-row align-items-center justify-content-between p-4 border-bottom border-2">
      <span class="filter-title">Filters</span>
      <span class="clear-text">Clear all</span>
    </div>
    <app-history-filter-item type="min-max" :title="HISTORY_FILTERS.PRICE"/>
    <app-history-filter-item type="min-max" :title="HISTORY_FILTERS.CHANGE"/>
    <app-history-filter-item type="checked" :title="HISTORY_FILTERS.RULE"/>
    <app-history-filter-item type="checked" :title="HISTORY_FILTERS.MADE_BY"/>
    <app-history-filter-item type="min-max" :title="HISTORY_FILTERS.REVENUE"/>
    <app-history-filter-item type="min-max" :title="HISTORY_FILTERS.PROFIT"/>
    <app-history-filter-item type="min-max" :title="HISTORY_FILTERS.SALES"/>
    <app-history-filter-item type="min-max" :title="HISTORY_FILTERS.MARGIN"/>
    <app-history-select-filter />
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.filter_wrapper {
  overflow-y: auto;
  flex: 1;
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
  color: #8258fa;
  font-weight: bold;
  cursor: pointer;
}
</style>