<script setup lang="ts">
import * as debounce from 'lodash.debounce'
import {PropType, reactive, ref, watch} from "vue";
import {useHistoryStore} from "../../../store";
import AppFilterValueElement from "./AppFilterValueElement.vue";

const props = defineProps({
  type: String as PropType<'min-max' | 'checked' | 'multiply'>,
  title: String,
})

const historyStore = useHistoryStore()

const isShowAddBlock = ref(false)
const clear = () => {
  minMax.max = 0
  minMax.min = 0
}

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
        <span @click="toggleEditBlock" class="cursor">{{ !isShowAddBlock ? '+' : '-' }}</span>
      </div>
      <div v-if="type === 'min-max'" class="w-100 d-flex flex-row flex-wrap align-items-center justify-content-start mt-1">
        <app-filter-value-element @clear="clear" v-if="minMax.min || minMax.max" :value="`${minMax.min}-${minMax.max}`"/>
      </div>
    </div>
    <div v-if="isShowAddBlock">
      <div v-if="type === 'min-max'">
        <div class="input-group my-3">
          <span class="input-group-text">min:</span>
          <input v-model="minMax.min" type="number" min="0" class="form-control" placeholder="min">
        </div>
        <div class="input-group mb-1">
          <span class="input-group-text">max:</span>
          <input v-model="minMax.max" type="number" min="0" class="form-control" placeholder="min">
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

</style>