<script setup lang="ts">
import {ref, watch} from "vue";
import {useProductStore} from "../../../store";

const props = defineProps(['status'])

const productStore = useProductStore()

const element = ref(null)
const style = ref(null)

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
    element.value = productStore.statuses.find(el => el.id === props.status)
    style.value = getStyle(element.value.id)
  }
}, {immediate: true})

</script>

<template>
  <div class="item_role me-1" :class="style">
    <span class="mt-1">{{element?.name}}</span>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

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