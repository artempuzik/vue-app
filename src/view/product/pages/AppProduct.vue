<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import AppProductLayout from '../layouts/AppProductLayout.vue';
import AppUiInput from '../../UI/AppUiInput.vue';
import AppUiSpinner from '../../UI/AppUiSpinner.vue';
import {useHistoryStore, useProductStore} from "../../../store";
import AppProductFilters from "../components/AppProductFilters.vue";
import AppProductItem from "../components/AppProductItem.vue";
import {PAGINATION_STEP} from "../../../app/config/constants.ts";
import AppUiButton from "../../UI/AppUiButton.vue";
import {Product} from "../../../app/types";

const productStore = useProductStore()

const query = ref('')

const currentPage = ref(0)

const changePage = (count: number) => {
  if(count === -1 && currentPage.value === 0) {
    return
  }
  if(count === 1 && currentPage.value === pages.value) {
    return
  }

  if(productStore.filters) {
    currentPage.value += count
    productStore.filters.offset = (currentPage.value * PAGINATION_STEP)

    productStore.isListLoading = true
    productStore.getHistoryList().finally(() => productStore.isListLoading = false)
  }
}

const pages = computed(() => Math.round(productStore.productList.count / PAGINATION_STEP))

const list = computed(() =>
    productStore.productList.list.filter((product: Product) => {
        return JSON.stringify(
            product.sku.toString() + product.product_name.toString()
        ).toLowerCase().includes(query.value.trim().toLowerCase());
    })
);

onMounted(() => {
  if(productStore.filters) {
    productStore.isPageLoading = true
    productStore.getProducts().finally(() => productStore.isPageLoading = false)
  }
})

</script>

<template>
  <div
      v-if="productStore.isPageLoading"
      class="d-flex layout bg-color h-100 flex-column align-items-center justify-content-center app_wrapper"
  >
    <app-ui-spinner  :size="60" :line="8" background="#f5f5f5"/>
  </div>
  <app-product-layout>
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
        {{productStore.productList.count}} products
      </span>
    </div>
    <div class="w-100 table_body">
      <div
          v-if="productStore.isListLoading"
          class="d-flex layout h-100 flex-column align-items-center justify-content-center app_wrapper"
      >
        <app-ui-spinner  />
      </div>
    <table class="w-100">
      <thead>
      <tr class="table_header">
        <th style="width: 7%" scope="col">
          {{ $t('list.sku') }}
        </th>
        <th style="width: 33%" scope="col">
          {{ $t('list.name') }}
        </th>
        <th style="width: 15%" scope="col">
          {{ $t('list.status') }}
        </th>
        <th style="width: 10%" scope="col">
          {{ $t('list.price') }}
        </th>
        <th style="width: 15%" scope="col">
          {{ $t('list.potential') }}
        </th>
        <th style="width: 20%" scope="col">
          {{ $t('list.competition') }}
        </th>
      </tr>
      </thead>
      <tbody>
      <template
          v-for="product in list"
          :key="product.product_id + Date.now() + Math.random()*10"
      >
        <app-product-item :product="product"/>
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
    <app-product-filters />
  </template>
</app-product-layout>
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
  overflow: hidden;
  padding: 5px 15px;
  height: 60vh;
  max-height: 700px;
  border: 1px solid $grey-border;
  border-radius: $input-border-radius;
  background-color: $white-color;
  tbody {
    overflow-y: scroll;
    height: 50vh;
    max-height: 620px;
  }

  tbody,td {
    display:block;
  }
}

.table_header {
  height: 80px;
  display: flex;
  th {
    display: flex;
    align-items: center;
  }
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