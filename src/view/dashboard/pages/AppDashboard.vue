<script setup lang="ts">
import {onMounted} from "vue";
import AppDashboardLayout from "../layouts/AppDashboardLayout.vue";
import {useDashboardStore} from "../../../store";
import AppDashboardStock from "../components/AppDashboardStock.vue";
import AppDashboardMetric from "../components/AppDashboardMetric.vue";
import AppDashboardSearch from "../components/AppDashboardSearch.vue";
import AppDashboardAction from "../components/AppDashboardAction.vue";
import AppDashboardPrice from "../components/AppDashboardPrice.vue";
import AppDashboardRecommended from "../components/AppDashboardRecommended.vue";
import AppDashboardViewed from "../components/AppDashboardViewed.vue";
import AppDashboardFavorite from "../components/AppDashboardFavorite.vue";
import AppDashboardQuestion from "../components/AppDashboardQuestion.vue";


const dashboardStore = useDashboardStore()

const getDashboard = () => {
  dashboardStore.init()
}

onMounted(getDashboard)

</script>

<template>
  <div
      v-if="dashboardStore.isPageLoading"
      class="d-flex layout bg-color h-100 flex-column align-items-center justify-content-center app_wrapper"
  >
    <app-ui-spinner  :size="60" :line="8" background="#f5f5f5"/>
  </div>
  <app-dashboard-layout v-if="!dashboardStore.isPageLoading">
    <template #stock>
      <app-dashboard-stock />
    </template>
    <template #metric>
      <app-dashboard-metric />
    </template>
    <template #search>
      <app-dashboard-search />
    </template>
    <template #action>
      <app-dashboard-action />
    </template>
    <template #price>
      <app-dashboard-price />
    </template>
    <template #recommended>
      <app-dashboard-recommended />
    </template>
    <template #viewed>
      <app-dashboard-viewed />
    </template>
    <template #favorite>
      <app-dashboard-favorite />
    </template>
    <template #question>
      <app-dashboard-question />
    </template>
  </app-dashboard-layout>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.cursor {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: $blue-normal;
  }
}
</style>