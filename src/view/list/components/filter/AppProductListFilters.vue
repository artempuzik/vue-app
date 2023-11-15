<script setup lang="ts">
import AppProductListFilterItem from "./AppProductListFilterItem.vue";
import {PRODUCT_FILTERS} from "../../../../app/config/constants.ts";
import AppProductListSelectFilter from "./AppProductListSelectFilter.vue";
import {reactive, toRefs} from "vue";
import {useProductStore} from "../../../../store";

const productStore = useProductStore()

const refs = reactive({
  status: null,
  potential: null,
  price: null,
  discount: null,
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
  productStore.isEmptyFilter = true;
}

const { price, potential, discount, revenue, profit, sales, margin, categories } = toRefs(refs)
</script>

<template>
  <div class="w-100 h-100 filter_wrapper overflow-y-auto">
    <div class="w-100 d-flex flex-row align-items-center justify-content-between p-4 border-bottom border-2">
      <span class="filter-title">Filters</span>
      <span v-if="!productStore.isEmptyFilter" @click="reset" class="clear-text">Clear all</span>
    </div>
    <app-product-list-filter-item ref="status" :title="PRODUCT_FILTERS.STATUS"/>
    <app-product-list-filter-item ref="potential" :title="PRODUCT_FILTERS.POTENTIAL"/>
    <app-product-list-filter-item ref="price" :title="PRODUCT_FILTERS.PRICE"/>
    <app-product-list-filter-item ref="discount" :title="PRODUCT_FILTERS.DISCOUNT"/>
    <app-product-list-filter-item ref="revenue" :title="PRODUCT_FILTERS.REVENUE"/>
    <app-product-list-filter-item ref="profit" :title="PRODUCT_FILTERS.PROFIT"/>
    <app-product-list-filter-item ref="sales" :title="PRODUCT_FILTERS.SALES"/>
    <app-product-list-filter-item ref="margin" :title="PRODUCT_FILTERS.MARGIN"/>
    <app-product-list-select-filter ref="categories" />
  </div>
</template>

<style scoped lang="scss">
@import '../../../../styles/variables';

.filter_wrapper {
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