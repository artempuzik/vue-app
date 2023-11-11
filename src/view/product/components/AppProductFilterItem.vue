<script setup lang="ts">
import * as debounce from 'lodash.debounce'
import {onUpdated, reactive, ref, watch} from "vue";
import {useHistoryStore} from "../../../store";
import AppFilterValueElement from "./AppFilterValueElement.vue";

const props = defineProps({
  title: String,
})
const clear = () => {
  minMax.max = 0
  minMax.min = 0
}

defineExpose({
  clear,
});

const historyStore = useHistoryStore()
const isShowAddBlock = ref(false)

const minMax = reactive({
  min: 0,
  max: 0,
})

const toggleEditBlock = () => {
  isShowAddBlock.value = !isShowAddBlock.value
}

watch(minMax, debounce(() => historyStore.updatePropertyByFilterName(props.title as string, minMax), 1000), {deep: true})

</script>

<template>
  <div class="w-100 d-flex flex-column align-items-start justify-content-start filter_title border-bottom border-2 p-3"
        :class="{'is_open': isShowAddBlock}"
  >
    <div class="w-100 d-flex flex-column align-items-start justify-content-start">
      <div class="w-100 d-flex flex-row align-items-center justify-content-between">
        <span class="title">{{ title }}</span>
        <div>
          <span v-if="minMax.min || minMax.max" @click="clear" class="clear-text me-4">Clear</span>
          <span @click="toggleEditBlock" class="cursor">{{ !isShowAddBlock ? '+' : '-' }}</span>
        </div>
      </div>
      <div class="w-100 d-flex flex-row flex-wrap align-items-center justify-content-start mt-1">
        <app-filter-value-element @clear="clear" v-if="minMax.min || minMax.max" :value="`${minMax.min}-${minMax.max}`"/>
      </div>
    </div>
    <div v-if="isShowAddBlock">
      <div class="d-flex flex-row align-items-center justify-content-center">
        <div class="d-flex flex-column input-group m-3">
          <span>Min.</span>
          <input
              v-model="minMax.min"
              type="number"
              :style="{opacity: minMax.min ? 1 : 0.6}"
              min="0"
              class="form-control w-100 rounded"
              placeholder="min">
        </div>
        <div class="d-flex flex-column input-group m-3">
          <span>Max.</span>
          <input
              v-model="minMax.max"
              type="number"
              :style="{opacity: minMax.max ? 1 : 0.6}"
              min="0"
              class="form-control w-100 rounded"
              placeholder="max">
        </div>
      </div>
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