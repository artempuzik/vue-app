<script setup lang="ts">
import {cutTitle, getDuration} from "../../../app/helpers";
import {computed, ref} from "vue";
import {useDashboardStore} from "../../../store";
import {useRouter} from "vue-router";

const activeIndex = ref(0)

const dashboardStore = useDashboardStore()

const router = useRouter()
const goToProductPage = (id: number) => router.push(`/product/${id}`)

const goToListPage = () => router.push({ name: "list"})

const list = computed(() => activeIndex.value === 0 ? dashboardStore.last_auto_repriced : dashboardStore.last_manual_repriced)

</script>

<template>
  <div class="block p-3 mt-4">
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <span class="dashboard-category-title">{{ $t('dashboard.price') }}</span>
      <span @click="goToListPage" class="view-all">{{ $t('dashboard.all') }}</span>
    </div>
    <div class="my-1 d-flex flex-row align-items-center justify-content-start position-relative">
      <span @click="activeIndex = 0" class="category" :class="{active: activeIndex === 0}">{{ $t('dashboard.avtomative') }}</span>
      <span @click="activeIndex = 1" class="category" :class="{active: activeIndex === 1}">{{ $t('dashboard.manual') }}</span>
      <div class="w-100 border"></div>
    </div>
    <div class="table_block mt-3">
      <div v-if="!list.length" class="mt-4 d-flex flex-column align-items-center justify-content-start">
        <span class="category-title" style="opacity: 0.5">List is empty</span>
      </div>
      <table v-if="list.length" class="w-100">
        <tbody>
        <template v-for="(item, index) in list" :key="item.id + index">
          <tr @click="goToProductPage(item.id)" class="item">
            <td style="width: 5%">
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect y="0.447243" width="15" height="14.6231" fill="url(#pattern0)"/>
                <defs>
                  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_126_128" transform="matrix(0.00195312 0 0 0.00200346 0 -0.0128866)"/>
                  </pattern>
                  <image id="image0_126_128" width="512" height="512" xlink:href="data:image/png;base64,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"/>
                </defs>
              </svg>
            </td>
            <td style="width: 15%">{{ item.sku }}</td>
            <td style="width: 35%">{{ cutTitle(item.name) }}</td>
            <td style="width: 25%">{{item.old_price.toFixed(2)}} &#8594; {{item.new_price.toFixed(2)}}</td>
            <td style="width: 7%">
              Profit
            </td>
            <td style="width: 13%" class="text-end">
              <svg class="mb-1" width="13px" height="13px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="ms-2">{{getDuration(item.date)}}</span>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.block {
  width: 100%;
  height: 315px;
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
  height: 200px;
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
  height: 54px;
  cursor: pointer;
  &:hover {
    background-color: $placeholder;
  }
}

</style>
