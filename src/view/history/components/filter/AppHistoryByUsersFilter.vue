<script setup lang="ts">
import {useCompanyStore, useHistoryStore} from "../../../../store";
import {onMounted, ref, watch} from "vue";
import {HISTORY_FILTERS} from '../../../../app/config/constants.ts';
import AppFilterValueElement from "./AppFilterValueElement.vue";

const historyStore = useHistoryStore()
const companyStore = useCompanyStore()

const isShowAddBlock = ref(false)

const checked = ref([])

const clear = () => {
  checked.value = []
}

const remove = (id: number) => {
  checked.value = checked.value.filter(i => i !== id)
}

defineExpose({
  clear,
});

const getNameById = (id: number) => {
  const member = companyStore.companyMembers.filter(member => member.user_id === id)[0]
  return `${member.name} ${member.surname}`
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
      <div @click="toggleEditBlock" class="w-100 d-flex flex-row align-items-center justify-content-between">
        <span class="title">{{ HISTORY_FILTERS.MADE_BY }}</span>
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
    <div v-if="isShowAddBlock" class="w-100 mt-2 overflow-y-auto list">
      <template v-for="user in companyStore.companyMembers" :key="user.user_id">
        <div class="form-check my-1">
          <input class="form-check-input" v-model="checked" :value="user.user_id" type="checkbox" :id="`user-${user.user_id}`">
          <label class="form-check-label" :for="`user-${user.user_id}`">
            {{ user.name }} {{ user.surname }}
          </label>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../../styles/variables';

.is_open {
  background-color: $grey-bg;
  .title {
    color: $blue-normal;
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
  color: $blue-normal;
  font-weight: bold;
  cursor: pointer;
}

</style>