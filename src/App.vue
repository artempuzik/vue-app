<script setup lang="ts">
import {ref} from "vue";

const bool = ref(false)
const string = ref('')

</script>

<template>
  <app-ui-button :text="'Send'" :is-in-active="bool" :size="'normal'"/>
  <app-ui-auth-input v-model="string" :is-in-active="bool" :is-error="false" :placeholder="'Enter something'"/>
  <app-ui-input v-model="string" :withIcon="true" :is-in-active="false" :placeholder="'Search by SKU or product name ...'"/>
  <div style="width: 200px; height: 50px">
    <app-ui-input v-model="string" :is-in-active="!!!string" :placeholder="'Name'"/>
  </div>

  <h3>Text</h3>
  <app-ui-select v-model="string" />
  <app-ui-spinner />
</template>
