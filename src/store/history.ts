import { defineStore } from 'pinia';
import { historyApi } from '../app/api';
import { reactive, watch, ref, Ref } from 'vue';
import { useAppStore } from './index.ts';
import {HistoryRequestBody} from "../app/types";
import {HISTORY_FILTERS} from "../app/config/constants.ts";

export default defineStore('history', () => {
  const pagination = reactive({
    limit: 10,
    offset: 0,
  })
  const filters:  Ref<HistoryRequestBody | null> = ref(null);
  const historyList = reactive({
    count: 0,
    list: []
  });

  const appStore = useAppStore();

  const getHistoryList = async (dto: HistoryRequestBody) => {
    const body = {
      ...dto,
      limit: pagination.limit,
      offset: pagination.offset,
    }
    return historyApi.getHistory(body, appStore.appConfig.Bearer_Auth).then(response => {
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
        filters.value = response.data;
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
      case HISTORY_FILTERS.RULE: return filters.value.rule_id
      case HISTORY_FILTERS.MADE_BY: return filters.value.user_id
      case HISTORY_FILTERS.CATEGORY: return filters.value.category_id
      default: return {}
    }
  }

  const updatePropertyByFilterName = (title: string, values: any, isRemove: boolean) => {
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
      // case HISTORY_FILTERS.RULE: {
      //   filters.rule_id = isRemove ? [...filters.rule_id]
      // }
      //   filters.rule_id [...filters.rule_id]
      // case HISTORY_FILTERS.MADE_BY:
      //   return [...filters.user_id]
      // case HISTORY_FILTERS.CATEGORY:
      //   return [...filters.category_id]
    }
  }

  const init = async () => {
    await getFilterList()
  }

  watch(filters, async () => {
    if(filters.value) {
      await getHistoryList(filters.value as HistoryRequestBody)
      console.log(historyList.list)
    }
  })

  return {
    filters,
    historyList,
    init,
    getFilterList,
    getHistoryList,
    getPropertyByFilterName,
    updatePropertyByFilterName
  };
});
