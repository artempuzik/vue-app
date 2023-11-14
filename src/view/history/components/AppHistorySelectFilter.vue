<script setup lang="ts">
import {useHistoryStore, useProductStore} from "../../../store";
import {ref, watch} from "vue";
import {HISTORY_FILTERS} from '../../../app/config/constants';
import AppFilterValueElement from "./AppFilterValueElement.vue";

const historyStore = useHistoryStore()
const productStore = useProductStore()

const isShowAddBlock = ref(false)

const checked = ref([])
const clear = () => {
  checked.value = []
}

const remove = (id: number) => {
  checked.value = checked.value.filter(i => i !== id)
}

const getNameById = (id: number) => productStore.categories.filter(category => category.id === id)[0].name

defineExpose({
  clear,
});

const toggleEditBlock = () => {
  isShowAddBlock.value = !isShowAddBlock.value
}

watch(checked, () => {
  historyStore.updatePropertyByFilterName(HISTORY_FILTERS.CATEGORY, checked.value)
}, {deep: true})

</script>

<template>
  <div class="w-100 d-flex flex-column align-items-start overflow-hidden justify-content-start filter_title p-3 position-relative"
       :class="{'is_open': isShowAddBlock}"
  >
    <div class="w-100 d-flex flex-column align-items-start justify-content-start">
      <div @click="toggleEditBlock" class="w-100 d-flex flex-row align-items-center justify-content-between">
        <span class="title">{{ HISTORY_FILTERS.CATEGORY }}</span>
        <div>
          <span v-if="checked.length" @click="clear" class="clear-text me-4">Clear</span>
          <span class="cursor">{{ !isShowAddBlock ? '+' : '-' }}</span>
        </div>
      </div>
      <div class="w-100 d-flex flex-row flex-wrap align-items-center justify-content-start mt-1">
        <template v-for="id in checked" :key="id">
          <app-filter-value-element class="me-1 mb-1" @clear="remove(id)" v-if="checked.length" :value="getNameById(id)"/>
        </template>
      </div>
    </div>
    <div v-if="isShowAddBlock" class="w-100 h-100 mt-2 position-relative overflow-y-auto">
        <template v-for="category in productStore.categories" :key="category.id">
          <div class="form-check my-1">
            <input class="form-check-input" v-model="checked" :value="category.id" type="checkbox" :id="`category-${category.id}`">
            <label class="form-check-label" :for="`category-${category.id}`">
              {{ category.name }}
            </label>
          </div>
        </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.is_open {
  background-color: $grey-bg;
  .title {
    color: $blue-normal;
  }
}

.filter_title {
  min-height: 60px;
}

.title {
  font-weight: bold;
  font-size: 1rem;
}

.cursor {
  cursor: pointer;
}

.clear-text {
  font-size: 0.7rem;
  color: $blue-normal;
  font-weight: bold;
  cursor: pointer;
}
</style>