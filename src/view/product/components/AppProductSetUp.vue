<script setup lang="ts">
import {PropType} from "vue";
import {ProductItem} from "../../../app/types";
import AppUiSelect from "../../UI/AppUiSelect.vue";
import AppUiButton from "../../UI/AppUiButton.vue";
import AppProduct from "../pages/AppProduct.vue";
import AppProductForecast from "./AppProductForecast.vue";

const props = defineProps({
  product: Object as PropType<ProductItem>
})
</script>

<template>
  <div class="setup_wrapper">
    <h4 class="category-title">Set up</h4>
    <span class="sub-title">All metrics are used as a monthly ones.</span>
    <div class="w-100 d-flex flex-row my-2 justify-content-between">
      <div class="me-2 w-50">
        <app-ui-select
            :placeholder="'Optional'"
            :label="'Your Goal'"
        />
      </div>
      <div class="ms-2">
        <app-ui-select
            :placeholder="'Optional'"
            :label="'SKU Cost'"
        />
      </div>
    </div>
    <div class="w-100 d-flex flex-row my-2 justify-content-between">
      <app-product-forecast />
      <app-product-forecast />
      <app-product-forecast />
    </div>
    <div class="w-100 d-flex flex-row my-2 justify-content-between">
      <div class="me-2 w-50">
        <app-ui-select
            :placeholder="'Optional'"
            :label="'Min. Sales'"
        />
      </div>
      <div class="ms-2">
        <app-ui-select
            :placeholder="'Optional'"
            :label="'Max. Sales'"
        />
      </div>
    </div>
    <div class="w-100 d-flex flex-row my-2 justify-content-between">
      <div class="me-2 w-50">
        <app-ui-select
            :placeholder="'Optional'"
            :label="'Min. Price '"
        />
      </div>
      <div class="ms-2">
        <app-ui-select
            :placeholder="'Optional'"
            :label="'Max. Price '"
        />
      </div>
    </div>
    <div class="w-100 d-flex flex-row my-2 justify-content-between">
      <app-ui-button
          class="me-2 button_style"
          :text="'Auto-repricing'"
      />
      <app-ui-button
          class="ms-2"
          :text="'Reprice'"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.setup_wrapper {
  margin-left: 70px;
  width: 330px;
  height: 600px;
}

.button_style {
  color: black;
  background-color: $white-color !important;
  border: solid 1px black;
}

.sub-title {
  color: $placeholder;
}

</style>