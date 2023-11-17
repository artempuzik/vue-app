<script setup lang="ts">
import {Ref, ref, watch} from "vue";
import {useProductStore} from "../../../store";
import {ProductCategory} from '../../../app/types'

const props = defineProps(['status'])

const productStore = useProductStore()

const element: Ref<ProductCategory | null> = ref(null)
const style: Ref<string> = ref('')

const getStyle = (id: number) => {
  switch (id) {
    case 1: return 'not_found'
    case 2: return 'match'
    case 3: return 'repriced'
    default: return 'error'
  }
}

watch(() =>[productStore.statuses, productStore.productList], () => {
  if(productStore.statuses.length) {
    const result = productStore.statuses.find((el: ProductCategory) => el.id === props.status)
    if(result) {
      element.value = result as ProductCategory
      style.value = getStyle(element.value.id as number)
    }
  }
}, {immediate: true})

</script>

<template>
  <div v-if="element" class="item_role me-1" :class="style">
    <span class="mt-1">{{element?.name}}</span>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables';

.item_role {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  width: 80px;
  height: 25px;
  color: $white-color;
  border-radius: $button-border-radius;
}

.not_found {
  background-color: $grey-table_header;
}

.repriced {
  background-color: $green-blur;
}

.error {
  background-color: $error-red;
}

.match {
  background-color: $blue-normal;
}

</style>