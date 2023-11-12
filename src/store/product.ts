import { defineStore } from 'pinia';
import {productApi} from '../app/api'
import {useAppStore} from "./";
import {reactive, Ref, ref, watch} from "vue";
import {ProductFilters} from "../app/types";
import {PAGINATION_STEP, PRODUCT_FILTERS} from "../app/config/constants.ts";

export default defineStore('product', () => {
  const isEmptyFilter = ref(true)

  const categories = ref([])

  const isPageLoading = ref(false)
  const isListLoading = ref(false)

  const statuses = ref([])
  const filters:  Ref<ProductFilters | null> = ref(null);
  const productList = reactive({
    count: 0,
    list: []
  });

  const appStore = useAppStore()
  const getProductCategories = () => productApi.getProductCategories(appStore.appConfig.Bearer_Auth).then((response) => {
      if(response.status === 200) {
        categories.value = response.data.categories
      }
    })

  const getProducts = () => productApi.getProducts(filters.value as ProductFilters, appStore.appConfig.Bearer_Auth).then((response) => {
    if(response.status === 200) {
      productList.list = response.data.products
      productList.count = response.data.count
    }
  })

  const getProductFilters = () => productApi.getProductFilters(appStore.appConfig.Bearer_Auth).then((response) => {
    if(response.status === 200) {
      filters.value = {...response.data, limit: PAGINATION_STEP};
      isEmptyFilter.value = true;
    }
  })

  const getProductStatus = () => productApi.getProductStatus(appStore.appConfig.Bearer_Auth).then((response) => {
    if(response.status === 200) {
      statuses.value = response.data.status
    }
  })

  const getPropertyByFilterName = (title: string) => {
    if(!filters.value) {
      return
    }
    switch (title) {
      case PRODUCT_FILTERS.PRICE: return {
        min: filters.value.price_min,
        max: filters.value.price_max
      }
      case PRODUCT_FILTERS.DISCOUNT: return {
        min: filters.value.discount_min,
        max: filters.value.discount_max
      }
      case PRODUCT_FILTERS.POTENTIAL: return {
        min: filters.value.potential_min,
        max: filters.value.potential_max
      }
      case PRODUCT_FILTERS.REVENUE: return {
        min: filters.value.revenue_min,
        max: filters.value.revenue_max
      }
      case PRODUCT_FILTERS.MARGIN: return {
        min: filters.value.margin_min,
        max: filters.value.margin_max
      }
      case PRODUCT_FILTERS.SALES: return {
        min: filters.value.sales_min,
        max: filters.value.sales_max
      }
      case PRODUCT_FILTERS.PROFIT: return {
        min: filters.value.profit_min,
        max: filters.value.profit_max
      }
      case PRODUCT_FILTERS.STATUS: return filters.value.status_id
      case PRODUCT_FILTERS.CATEGORY: return filters.value.category_id
      default: return {}
    }
  }

  const updatePropertyByFilterName = async (title: string, values: any) => {
    if(!filters.value) {
      return
    }

    switch (title) {
      case PRODUCT_FILTERS.PRICE:
        filters.value = {
          ...filters.value,
          price_min: values.min,
          price_max: values.max
        }
        break;
      case PRODUCT_FILTERS.POTENTIAL:
        filters.value = {
          ...filters.value,
          potential_min: values.min,
          potential_max: values.max
        }
        break;
      case PRODUCT_FILTERS.DISCOUNT:
        filters.value = {
          ...filters.value,
          discount_min: values.min,
          discount_max: values.max
        }
        break;
      case PRODUCT_FILTERS.REVENUE:
        filters.value = {
          ...filters.value,
          revenue_min: values.min,
          revenue_max: values.max
        }
        break;
      case PRODUCT_FILTERS.MARGIN:
        filters.value = {
          ...filters.value,
          margin_min: values.min,
          margin_max: values.max
        }
        break;
      case PRODUCT_FILTERS.SALES:
        filters.value = {
          ...filters.value,
          sales_min: values.min,
          sales_max: values.max
        }
        break;
      case PRODUCT_FILTERS.PROFIT:
        filters.value = {
          ...filters.value,
          profit_min: values.min,
          profit_max: values.max
        }
        break;
      case PRODUCT_FILTERS.STATUS:
        filters.value.status_id = [...values]
        break;
      case PRODUCT_FILTERS.CATEGORY:
        filters.value.category_id = [...values]
        break;
    }
    isListLoading.value = true;
    await getProducts().finally(() => isListLoading.value = false)
  }
  const init = async () => {
    isPageLoading.value = true;
    await getProductCategories()
    await getProductFilters().then(async () => {
      await getProducts()
      isPageLoading.value = false;
    })
    await getProductStatus()
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
    categories,
    filters,
    productList,
    isListLoading,
    isPageLoading,
    isEmptyFilter,
    statuses,
    init,
    getProducts,
    getPropertyByFilterName,
    updatePropertyByFilterName,
  };
});
