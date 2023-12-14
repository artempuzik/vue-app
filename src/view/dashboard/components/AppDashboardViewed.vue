<script setup lang="ts">
import {useDashboardStore} from "../../../store";
import {useRouter} from "vue-router";
import {cutTitle} from "../../../app/helpers";

const dashboardStore = useDashboardStore()
const router = useRouter()

const goToProductPage = (id: number) => router.push(`/product/${id}`)

</script>

<template>
  <div class="block p-3">
    <div class="mb-2">
      <span class="category-title">Last viewed</span>
    </div>
    <div class="container_items w-100">
      <template v-for="item in dashboardStore.last_viewed" :key="item.product_id">
        <div @click="goToProductPage(item.id)" class="w-100 border border-1 rounded my-2 p-2 item">
          <div>
            <span class="sku">{{item.sku}}</span>
          </div>
          <div>
            <span>{{ cutTitle(item.name)}}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.block {
  width: 100%;
  height: 250px;
  overflow: hidden;
  background-color: $white-color;
  border-radius: $block-border-radius;
}

.sku {
  font-size: 10px;
}

.container_items {
  overflow-y: auto;
  height: 180px;
}

.item {
  cursor: pointer;
  &:hover {
    background-color: $placeholder;
  }
}

</style>
