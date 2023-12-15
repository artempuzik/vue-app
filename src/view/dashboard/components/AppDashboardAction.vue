<script setup lang="ts">
import {useDashboardStore} from "../../../store";
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {cutTitle} from "../../../app/helpers";
const dashboardStore = useDashboardStore()

const router = useRouter()

const activeIndex = ref(0)
const goToProductPage = (id: number) => router.push(`/product/${id}`)
const goToListPage = () => router.push({ name: "list"})

const list = computed(() => activeIndex.value === 0 ? dashboardStore.need_action : [])
</script>

<template>
  <div class="block p-3 mt-4">
    <div class="d-flex justify-content-between align-items-center">
      <span class="dashboard-category-title">{{ $t('dashboard.action') }}</span>
      <span @click="goToListPage" class="view-all">{{ $t('dashboard.all') }}</span>
    </div>
    <div class="my-2 d-flex flex-row align-items-center justify-content-start position-relative">
      <span @click="activeIndex = 0" class="category" :class="{active: activeIndex === 0}">{{ $t('dashboard.error') }}</span>
      <span @click="activeIndex = 1" class="category" :class="{active: activeIndex === 1}">{{ $t('dashboard.strategy') }} <span style="color: #FF9900">(!)</span></span>
      <div class="w-100 border-category border"></div>
    </div>
    <div class="table_block d-flex flex-row align-items-center justify-content-between mt-3">
        <template v-for="(item, index) in list" :key="item.sku + index">
          <div @click="goToProductPage(item.id)" class="border border-1 rounded my-2 p-2 item m-1">
            <div>
              <span class="sku">{{item.sku}}</span>
            </div>
            <div>
              <span>{{cutTitle(item.name)}}</span>
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
  height: 200px;
  background-color: $white-color;
  border-radius: $block-border-radius;
}

.sku {
  font-size: 10px;
}

.border-category {
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
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  max-width: 780px;
}

.category {
  color: $placeholder;
  margin-right: 10px;
  font-size: 12px;
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

.view-all {
  font-size: 0.7rem;
  color: #0500FF;
  font-weight: bold;
  cursor: pointer;
}

.item {
  min-width: 220px;
  width: 30%;
  max-height: 100px;
  cursor: pointer;
  &:hover {
    background-color: $placeholder;
  }
}

</style>
