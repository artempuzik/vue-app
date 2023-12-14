<script setup lang="ts">
import {PropType, reactive} from "vue";
import {ProductItem, RepricingSettings} from "../../../app/types";
import AppUiSelect from "../../UI/AppUiSelect.vue";
import AppUiButton from "../../UI/AppUiButton.vue";
import AppProductForecast from "./AppProductForecast.vue";
import {useProductStore} from "../../../store";

const props = defineProps({
  product: Object as PropType<ProductItem>
})

const productStore = useProductStore()

const goal = reactive({
  value: 'Profit',
  options: ['Profit']
})

const emit = defineEmits(['get-product'])

const getProduct = () => {
  emit('get-product')
}

const params = reactive({
  sku_cost: props.product?.elasticity.settings.sku_cost,
  min_price: props.product?.elasticity.settings.min_price,
  max_price: props.product?.elasticity.settings.max_price,
  min_sale: props.product?.elasticity.settings.min_sale,
  max_sale: props.product?.elasticity.settings.max_sale,
})

const repricing = () => {
  if(!props.product) {
    return
  }
  productStore.setProductRepricingSettings({
    product_id: props.product.product_id,
    settings: {
      sku_cost: params.sku_cost || 0,
      min_price: params.min_price || 0,
      max_price: params.max_price || 0,
      min_sale: params.min_sale || 0,
      max_sale: params.max_sale || 0,
    }
  }).then(response => {
    if(response.status === 200) {
      getProduct()
    }
  })
}
</script>

<template>
  <div class="setup_wrapper">
    <h4 class="category-title">{{$t('product.set_up')}}</h4>
    <span class="sub-title">{{$t('product.set_up_sub')}}</span>
    <div class="w-100 d-flex flex-row my-2 justify-content-between">
      <div class="me-2 w-50">
        <app-ui-select
            v-model="goal.value"
            :placeholder="'Optional'"
            :options="goal.options"
            :label="$t('product.goal')"
            :label-font-styles="{fontSize: '16px', fontWeight: 'bold'}"
        />
      </div>
    </div>
    <div class="w-100 d-flex flex-row my-2 justify-content-between">
      <div class="me-2">
        <div class="my-1 fw-bolder">
          <span>{{ $t('product.min_sales') }}</span>
        </div>
        <app-ui-input
            v-model="params.min_sale"
            :placeholder="'Optional'"
        />
      </div>
      <div class="ms-2">
        <div class="my-1 fw-bolder">
          <span>{{ $t('product.max_sales') }}</span>
        </div>
        <app-ui-input
            v-model="params.max_sale"
            :placeholder="'Optional'"
        />
      </div>
    </div>
    <div class="w-100 d-flex flex-row my-2 justify-content-between">
      <div class="me-2">
        <div class="my-1 fw-bolder">
          <span>{{ $t('product.min_price') }}</span>
        </div>
        <app-ui-input
            v-model="params.min_price"
            :placeholder="'Optional'"
        />
      </div>
      <div class="ms-2">
        <div class="my-1 fw-bolder">
          <span>{{ $t('product.max_price') }}</span>
        </div>
        <app-ui-input
            v-model="params.max_price"
            :placeholder="'Optional'"
        />
      </div>
    </div>
    <div class="w-50 d-flex flex-row my-2 justify-content-between">
      <div class="me-2">
        <div class="my-1 fw-bolder">
          <span>{{ $t('product.sku') }}</span>
        </div>
        <app-ui-input
            v-model="params.sku_cost"
            :placeholder="'Optional'"
        />
      </div>
    </div>
    <div class="w-100 d-flex flex-row my-2 justify-content-between">
      <app-ui-button
          class="me-2 button_style"
          :text="$t('buttons.auto_reprice')"
      />
      <app-ui-button
          @click="repricing"
          class="ms-2"
          :text="$t('buttons.reprice')"
      />
    </div>
    <div v-if="props.product" class="w-100 d-flex flex-column my-2 justify-content-between">
      <span class="my-2 fw-bolder">New price forecast</span>
      <div class="w-100 d-flex flex-row my-2 justify-content-between">
        <app-product-forecast
            :title="$t('product.profit')"
            :value="`${props.product.elasticity.forecast.profit_forecast.toFixed(2)}$`"
            :sub="`${props.product.elasticity.forecast.profit_forecast_change.toFixed(2)}$`"
        />
        <app-product-forecast
            :title="$t('product.sales')"
            :value="`${props.product.elasticity.forecast.sales_forecast.toFixed(2)}$`"
            :sub="`${props.product.elasticity.forecast.sales_forecast_change.toFixed(2)}$`"
        />
        <app-product-forecast
            :title="$t('product.revenue')"
            :value="`${props.product.elasticity.forecast.revenue_forecast.toFixed(2)}$`"
            :sub="`${props.product.elasticity.forecast.revenue_forecast_change.toFixed(2)}$`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.setup_wrapper {
  margin-left: 70px;
  width: 330px;
  height: 650px;
}

.label-class {
  font-size: 16px;
  font-weight: bolder;
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
