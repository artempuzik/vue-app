<script setup lang="ts">
import {useProductStore} from "../../../store";
import {ref, watch} from "vue";
import {PRODUCT_FILTERS} from '../../../app/config/constants';
import AppFilterValueElement from "./AppFilterValueElement.vue";

const productStore = useProductStore()

const isShowAddBlock = ref(true)

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
  productStore.updatePropertyByFilterName(PRODUCT_FILTERS.CATEGORY, checked.value)
}, {deep: true})

</script>

<template>
  <div class="w-100 d-flex flex-column align-items-start justify-content-start filter_title p-3"
       :class="{'is_open': isShowAddBlock}"
  >
    <div class="w-100 d-flex flex-column align-items-start justify-content-start">
      <div class="w-100 d-flex flex-row align-items-center justify-content-between">
        <span class="title">{{ PRODUCT_FILTERS.CATEGORY }}</span>
        <div>
          <span v-if="checked.length" @click="clear" class="clear-text me-4">Clear</span>
          <span @click="toggleEditBlock" class="cursor">{{ !isShowAddBlock ? '+' : '-' }}</span>
        </div>
      </div>
      <div class="w-100 d-flex flex-row flex-wrap align-items-center justify-content-start mt-1">
        <template v-for="id in checked" :key="id">
          <app-filter-value-element class="me-1 mb-1" @clear="remove(id)" v-if="checked.length" :value="getNameById(id)"/>
        </template>
      </div>
    </div>
    <div v-if="isShowAddBlock" class="w-100 mt-2 overflow-y-auto list">
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
    color: #8258fa;
  }
}

.list {
  max-height: 300px;
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
  color: #8258fa;
  font-weight: bold;
  cursor: pointer;
}
</style>