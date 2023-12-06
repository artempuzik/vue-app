<script setup lang="ts">
import {ref} from 'vue'
import AppUiInput from "../../UI/AppUiInput.vue";
import {useRouter} from "vue-router";

const query = ref('')

const router = useRouter()

const resultSearchHandler = () => {
  router.push({
    name: 'list',
    query: {
      search: query.value
    }
  })
}


</script>

<template>
  <div class="block p-3">
    <div class="mb-3">
      <span class="category-title">Quick search</span>
    </div>
    <app-ui-input
        v-model="query"
        @enter="resultSearchHandler"
        class="w-100"
        :placeholder="'Search by SKU or product name ...'"
        :with-icon="true"
    />
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.block {
  width: 100%;
  height: 130px;
  background-color: $white-color;
  border-radius: $block-border-radius;
}

</style>