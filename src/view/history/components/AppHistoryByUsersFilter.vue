<script setup lang="ts">
import {useCompanyStore, useHistoryStore} from "../../../store";
import {onMounted, ref, watch} from "vue";
import {HISTORY_FILTERS} from '../../../app/config/constants';

const historyStore = useHistoryStore()
const companyStore = useCompanyStore()

const isShowAddBlock = ref(false)

const checked = ref([])

const selected = (id: number) => {
  const index = checked.value.findIndex(el => el === id)
  if(index === -1) {
    checked.value.push(id)
  } else {
    checked.value = checked.value.filter(el => el !== id)
  }
}

const toggleEditBlock = () => {
  isShowAddBlock.value = !isShowAddBlock.value
}

watch(checked, () => {
  historyStore.updatePropertyByFilterName(HISTORY_FILTERS.MADE_BY, checked.value)
}, {deep: true})

onMounted(() => {

})

</script>

<template>
  <div class="w-100 d-flex flex-column align-items-start justify-content-start filter_title border-bottom border-2 p-3"
       :class="{'is_open': isShowAddBlock}"
  >
    <div class="w-100 d-flex flex-column align-items-start justify-content-start">
      <div class="w-100 d-flex flex-row align-items-center justify-content-between">
        <span class="title">{{ HISTORY_FILTERS.MADE_BY }}</span>
        <span @click="toggleEditBlock" class="cursor">{{ !isShowAddBlock ? '+' : '-' }}</span>
      </div>
      <div class="w-100 d-flex flex-row flex-wrap align-items-center justify-content-start">

      </div>
    </div>
    <div v-if="isShowAddBlock" class="w-100 mt-2 overflow-y-auto list">
      <template v-for="user in companyStore.companyMembers" :key="user.user_id">
        <div class="form-check my-1">
          <input class="form-check-input" @change="selected(user.user_id)" type="checkbox" :id="`user-${user.user_id}`">
          <label class="form-check-label" :for="`user-${user.user_id}`">
            {{ user.name }} {{ user.surname }}
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