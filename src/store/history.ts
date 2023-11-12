import { defineStore } from 'pinia';
import { historyApi } from '../app/api';
import { reactive, ref, Ref, watch } from 'vue';
import { useAppStore } from './';
import {HistoryRequestBody} from "../app/types";
import {HISTORY_FILTERS, PAGINATION_STEP} from "../app/config/constants";

export default defineStore('history', () => {
  const isEmptyFilter = ref(true)
  const isPageLoading = ref(false)
  const isListLoading = ref(false)
  const filters:  Ref<HistoryRequestBody | null> = ref(null);
  const historyList = reactive({
    count: 0,
    list: []
  });

  const appStore = useAppStore();

  const getHistoryList = async () => {
    return historyApi.getHistory(filters.value as HistoryRequestBody, appStore.appConfig.Bearer_Auth).then(response => {
      if (response.status === 200) {
        historyList.list = response.data.history;
        historyList.count = response.data.count;
      }
      return response
    });
  };

  const getFilterList = async () => {
    return historyApi.getHistoryFilters(appStore.appConfig.Bearer_Auth).then(response => {
      if (response.status === 200) {
        filters.value = {...response.data, limit: PAGINATION_STEP};
        isEmptyFilter.value = true;
      }
      return response
    });
  };

  const getPropertyByFilterName = (title: string) => {
    if(!filters.value) {
      return
    }
    switch (title) {
      case HISTORY_FILTERS.PRICE: return {
        min: filters.value.price_min,
        max: filters.value.price_max
      }
      case HISTORY_FILTERS.CHANGE: return {
        min: filters.value.price_change_min,
        max: filters.value.price_change_max
      }
      case HISTORY_FILTERS.REVENUE: return {
        min: filters.value.revenue_min,
        max: filters.value.revenue_max
      }
      case HISTORY_FILTERS.MARGIN: return {
        min: filters.value.margin_min,
        max: filters.value.margin_max
      }
      case HISTORY_FILTERS.SALES: return {
        min: filters.value.sales_min,
        max: filters.value.sales_max
      }
      case HISTORY_FILTERS.PROFIT: return {
        min: filters.value.profit_min,
        max: filters.value.profit_max
      }
      // case HISTORY_FILTERS.RULE: return filters.value.rule_id
      case HISTORY_FILTERS.MADE_BY: return filters.value.user_id
      case HISTORY_FILTERS.CATEGORY: return filters.value.category_id
      default: return {}
    }
  }

  const updatePropertyByFilterName = async (title: string, values: any) => {
    if(!filters.value) {
      return
    }

    switch (title) {
      case HISTORY_FILTERS.PRICE:
        filters.value = {
          ...filters.value,
          price_min: values.min,
          price_max: values.max
        }
      break;
      case HISTORY_FILTERS.CHANGE:
        filters.value = {
          ...filters.value,
          price_change_min: values.min,
          price_change_max: values.max
        }
        break;
      case HISTORY_FILTERS.REVENUE:
        filters.value = {
          ...filters.value,
          revenue_min: values.min,
          revenue_max: values.max
        }
        break;
      case HISTORY_FILTERS.MARGIN:
        filters.value = {
          ...filters.value,
          margin_min: values.min,
          margin_max: values.max
        }
        break;
      case HISTORY_FILTERS.SALES:
        filters.value = {
          ...filters.value,
          sales_min: values.min,
          sales_max: values.max
        }
        break;
      case HISTORY_FILTERS.PROFIT:
        filters.value = {
          ...filters.value,
          profit_min: values.min,
          profit_max: values.max
        }
        break;
      // case HISTORY_FILTERS.RULE:
      //   filters.value.rule_id = [...values]
      //   break;
      case HISTORY_FILTERS.MADE_BY:
        filters.value.user_id = [...values]
        break;
      case HISTORY_FILTERS.CATEGORY:
        filters.value.category_id = [...values]
        break;
    }
    isListLoading.value = true;
    await getHistoryList().finally(() => isListLoading.value = false)
  }

  const init = async () => {
    isPageLoading.value = true;
    await getFilterList().then(async () => {
      await getHistoryList()
      isPageLoading.value = false;
    })
  }

  watch(filters, () => {
    for (const filter in filters.value) {
      if(filter === 'limit' || filter === 'offset') {
        continue
      }
      const isArray = Array.isArray(filters.value[filter])
      if(isArray) {
        if(filters.value[filter].length !== 0) {
          isEmptyFilter.value = false
          break;
        }
      }
      if(typeof filters.value[filter] === 'number') {
        if(filters.value[filter] !== 0) {
          isEmptyFilter.value = false
          break;
        }
      }
      isEmptyFilter.value = true;
    }
  }, {deep: true})

  return {
    filters,
    historyList,
    isPageLoading,
    isListLoading,
    isEmptyFilter,
    init,
    getFilterList,
    getHistoryList,
    getPropertyByFilterName,
    updatePropertyByFilterName
  };
});
