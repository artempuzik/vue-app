<script setup lang="ts">
import {useHistoryStore, useProductStore} from "../../../store";
import {ref, watch} from "vue";
import {HISTORY_FILTERS} from "../../../app/config/constants.ts";

const historyStore = useHistoryStore()
const productStore = useProductStore()

const isShowAddBlock = ref(true)

const checked = ref([])

const selected = (id: number) => {
  const index = checked.value.findIndex(el => el === id)
  if(index === -1) {
    checked.value.push(id)
  } else {
    checked.value = checked.value.filter(el => el !== id)
  }
  console.log(checked.value)
}

const toggleEditBlock = () => {
  isShowAddBlock.value = !isShowAddBlock.value
}

watch(checked, () => {
  historyStore.updatePropertyByFilterName(HISTORY_FILTERS.CATEGORY, checked.value)
}, {deep: true})

</script>

<template>
  <div class="w-100 d-flex flex-column align-items-start justify-content-start filter_title p-3"
       :class="{'is_open': isShowAddBlock}"
  >
    <div class="w-100 d-flex flex-column align-items-start justify-content-start">
      <div class="w-100 d-flex flex-row align-items-center justify-content-between">
        <span class="title">{{ HISTORY_FILTERS.CATEGORY }}</span>
        <span @click="toggleEditBlock" class="cursor">{{ !isShowAddBlock ? '+' : '-' }}</span>
      </div>
      <div class="w-100 d-flex flex-row flex-wrap align-items-center justify-content-start">

      </div>
    </div>
    <div v-if="isShowAddBlock" class="w-100 mt-2 overflow-y-auto list">
      <template v-for="category in productStore.categories" :key="category.id">
        <div class="form-check my-1">
          <input class="form-check-input" @change="selected(category.id)" type="checkbox" :id="category.id">
          <label class="form-check-label" :for="category.id">
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
</style>