<script setup lang="ts">
import * as debounce from 'lodash.debounce'
import {onMounted, PropType, reactive, ref, watch} from "vue";
import {useHistoryStore} from "../../../store";

const props = defineProps({
  type: String as PropType<'min-max' | 'checked' | 'multiply'>,
  title: String,
})

const isCanSubmit = ref(false)

const historyStore = useHistoryStore()

const isShowAddBlock = ref(false)

const properties = ref({})

const minMax = reactive({
  min: 0,
  max: 0,
})

const toggleEditBlock = () => {
  isShowAddBlock.value = !isShowAddBlock.value
  properties.value = historyStore.getPropertyByFilterName(props.title as string)
  isCanSubmit.value = true
}

// watch(() => [historyStore],() => {
//   properties.value = historyStore.getPropertyByFilterName(props.title as string)
// }, {deep: true})

watch(minMax, debounce(() => {
  if(isCanSubmit.value) {
    console.log('update')
    historyStore.updatePropertyByFilterName(props.title as string, minMax, false)
  }
}, 1000), {deep: true})

onMounted(() => {

})

</script>

<template>
  <div class="w-100 d-flex flex-column align-items-start justify-content-start filter_title border-bottom border-2 p-3">
    <div class="w-100 d-flex flex-column align-items-start justify-content-start">
      <div class="w-100 d-flex flex-row align-items-center justify-content-between">
        <span class="title">{{ title }}</span>
        <span @click="toggleEditBlock" class="cursor">{{ !isShowAddBlock ? '+' : '-' }}</span>
      </div>
      <div class="w-100 d-flex flex-row flex-wrap align-items-center justify-content-start">

      </div>
    </div>
    <div v-if="isShowAddBlock">
      <div v-if="type === 'min-max'">
        <div class="input-group my-3">
          <span class="input-group-text">min:</span>
          <input v-model="minMax.min" type="number" class="form-control" placeholder="min">
        </div>
        <div class="input-group mb-1">
          <span class="input-group-text">min:</span>
          <input v-model="minMax.max" type="number" class="form-control" placeholder="min">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

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