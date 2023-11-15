<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useProductStore} from "../../../store";
import toastAlert from '../../../app/helpers/toast'
import AppProductLayout from "../layouts/AppProductLayout.vue";
import AppUiSpinner from "../../UI/AppUiSpinner.vue";
import AppUiButton from "../../UI/AppUiButton.vue";

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const product = ref(null)

const goBack = () => router.back()

onMounted(() => {
  productStore.isProductLoading = true
  productStore.getProductById(+route.params.id).then(response => {
    if(response.status === 200) {
      product.value = response.data.info
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
})

</script>

<template>
  <div
      v-if="productStore.isProductLoading"
      class="d-flex layout bg-color h-100 flex-column align-items-center justify-content-center app_wrapper"
  >
    <app-ui-spinner  :size="60" :line="8" background="#f5f5f5"/>
  </div>
  <app-product-layout v-else>
    <template #back>
      <div>
        <span @click="goBack" class="cursor"> &#8592; Back</span>
      </div>
    </template>
    <template #search>
      <app-ui-button
          style="width: 150px; height: 40px"
          :is-in-active="true"
          :text="$t('buttons.export_bth')"
      />
    </template>

  </app-product-layout>
</template>

<style scoped lang="scss">
.cursor {
  cursor: pointer;
}

</style>