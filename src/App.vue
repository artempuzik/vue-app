<script setup lang="ts">
import {ref} from "vue";

const bool = ref(false)
const string = ref('')

</script>

<template>
  <app-ui-button :text="'Send'" :is-in-active="bool" :size="'normal'"/>
  <app-ui-auth-input v-model="string" :is-in-active="bool" :is-error="false" :placeholder="'Enter something'"/>
  <app-ui-input v-model="string" :is-in-active="bool" :placeholder="'Search by SKU or product name ...'"/>
</template>

<style scoped>
</style>
