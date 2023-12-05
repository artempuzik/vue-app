<script setup lang="ts">
import {computed, onMounted, ref, Ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useProductStore} from "../../../store";
import toastAlert from '../../../app/helpers/toast'
import {ProductItem} from '../../../app/types'
import AppProductLayout from "../layouts/AppProductLayout.vue";
import AppUiSpinner from "../../UI/AppUiSpinner.vue";
import AppProductElasticity from "../components/AppProductElasticity.vue";
import AppProductSetUp from "../components/AppProductSetUp.vue";
import AppProductInfo from "../components/AppProductInfo.vue";
import AppProductMetrics from "../components/AppProductMetrics.vue";
import AppProductChanges from "../components/AppProductChanges.vue";
import AppProductHistory from "../components/AppProductHistory.vue";

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const product: Ref<ProductItem | null> = ref(null)

const goBack = () => router.back()

const fromPath = computed(() => {
  const from = router.options.history.state.back
  switch (from) {
    case '/history': return 'History'
    case '/dashboard': return 'Dashboard'
    case '/list': return 'List'
    default: return 'Dashboard'
  }
})

const gepProductById = () => {
  productStore.isProductLoading = true
  productStore.getProductById(+route.params.id).then(response => {
    if(response.status === 200) {
      product.value = response.data.info
      if(!product.value) {
        return
      }
      productStore.addProductToLastVisits({
        sku: product.value.sku,
        product_name: product.value.product_name,
        product_id: product.value.product_id,
      })
      console.log(product.value)
    } else {
      toastAlert('Product not found', 'error', 2000)
      goBack()
    }
  })
      .catch(error => {
        toastAlert(error.response.data.detail, 'error', 2000)
        goBack()
      })
      .finally(() => productStore.isProductLoading = false)
}

onMounted(gepProductById)

</script>

<template>
  <div
      v-if="productStore.isProductLoading"
      class="d-flex layout bg-color h-100 flex-column align-items-center justify-content-center app_wrapper"
  >
    <app-ui-spinner  :size="60" :line="8" background="#f5f5f5"/>
  </div>
  <app-product-layout v-if="!productStore.isProductLoading && product">
    <template #back>
      <div>
        <span @click="goBack" class="cursor">{{ fromPath }} / {{ product.product_name }}</span>
      </div>
    </template>
<!--    <template #search>-->
<!--      <app-ui-button-->
<!--          style="width: 150px; height: 40px"-->
<!--          :is-in-active="true"-->
<!--          :text="$t('buttons.export_bth')"-->
<!--      />-->
<!--    </template>-->
    <template #info>
      <app-product-info :product="product"/>
    </template>
    <template #price_metrics>
      <app-product-metrics :product="product"/>
    </template>
    <template #history>
      <app-product-changes :product="product"/>
      <app-product-history :product="product"/>
    </template>
    <template #main>
      <div class="w-100 d-flex flex-row align-items-start justify-content-between">
        <app-product-elasticity :product="product"/>
        <app-product-set-up :product="product" @get-product="gepProductById"/>
      </div>
    </template>
  </app-product-layout>
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