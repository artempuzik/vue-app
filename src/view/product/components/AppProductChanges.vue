<script setup lang="ts">
import {PropType, ref} from "vue";
import {ProductItem} from "../../../app/types";
import {getDuration} from "../../../app/helpers";

const props = defineProps({
  product: Object as PropType<ProductItem>
})

const activeIndex = ref(0)

</script>

<template>
  <div class="changes_block p-4 overflow-hidden">
    <div class="my-1 d-flex flex-row align-items-center justify-content-between">
      <span class="fw-bolder category-title">{{$t('product.changes')}}</span>
    </div>
    <div class="my-1 d-flex flex-row align-items-center justify-content-start position-relative">
      <span @click="activeIndex = 0" class="category" :class="{active: activeIndex === 0}">Price</span>
      <span @click="activeIndex = 1" class="category" :class="{active: activeIndex === 1}">Strategy</span>
      <div class="w-100 border"></div>
    </div>
    <div class="table_block">
      <table v-if="activeIndex === 0" class="w-100 mt-3">
        <tbody>
        <template v-for="(item, index) in props.product?.history" :key="item.sku + index">
          <tr>
            <td>{{item.made_by}}</td>
            <td>Profit</td>
            <td>{{item.old_price.toFixed(2)}} &#8594; {{item.new_price.toFixed(2)}}</td>
            <td>
              <svg width="13px" height="13px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </td>
            <td>{{getDuration(item.repricing_date)}}</td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.changes_block {
  width: 575px;
  height: 363px;
  margin: 0 10px 0 0 ;
  background-color: $white-color;
  border-radius: $block-border-radius;
}

.border {
  position: absolute;
  bottom: 1px;
}

table{
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid $placeholder;
  border-radius: $block-border-radius;
}
td{
  border-bottom: 1px solid $placeholder;
  padding: 10px 10px;
}

.table_block {
  overflow-y: auto;
  height: 250px;
}

.category {
  color: $placeholder;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: $black-color;
  };
}

.active {
  color: $black-color;
  font-weight: bolder;
  border-bottom: 4px solid $blue-normal;
  z-index: 2;
}
</style>
