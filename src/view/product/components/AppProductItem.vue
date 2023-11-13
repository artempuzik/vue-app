<script setup lang="ts">
import {computed, PropType} from "vue";
import {Product} from "../../../app/types";
import AppProductStatus from "./AppProductStatus.vue";
import AppProductCompetition from "./AppProductCompetition.vue";
import AppUiCheckbox from "../../UI/AppUiCheckbox.vue";

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Array as PropType<number[]>,
    default: [] as number[],
  },
  product: {
    type: Object as PropType<Product>,
    required: true,
  }
})

const sku = computed(() => props.product.sku.replace('SKU', ''))
const price = computed(() => props.product.product_price.toFixed(2))
const potential = computed(() => props.product.product_potential.toFixed(2))

const checker = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

</script>

<template>
  <tr class="item">
    <th style="width: 6%">
      <app-ui-checkbox v-model="checker" :value="product.product_id" :width="20"/>
    </th>
    <td style="width: 7%">{{ sku }}</td>
    <td style="width: 30%" class="py-1">
      <div class="w-100">
        <span>{{ product.product_name }}</span>
      </div>
      <div class="w-100 group">
        <span>{{ product.category_name }}</span>
      </div>
    </td>
    <td style="width: 15%">
      <app-product-status :status="product.status_id" />
    </td>
    <td style="width: 10%">{{ price }}</td>
    <td style="width: 13%">{{ potential }} %</td>
    <td style="width: 18%">
      <app-product-competition :red="3" :green="1"/>
    </td>
  </tr>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.item {
  height: 65px;
  cursor: pointer;
}

.group {
  font-size: 10px;
  font-weight: bold;
 }

</style>
