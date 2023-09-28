<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";

const rout = useRoute();

const routName = computed(() => rout.name)
</script>

<template>
  <app-layout-auth>
    <template #left>
      <app-auth-sign-in v-if="routName === 'SignIn'" />
      <app-auth-sign-up v-if="routName === 'SignUp'" />
      <app-auth-reset v-if="routName === 'ResetPassword'" />
    </template>
    <template #right>
      <app-static-auth />
    </template>
  </app-layout-auth>
</template>

<style scoped lang="scss">

</style>