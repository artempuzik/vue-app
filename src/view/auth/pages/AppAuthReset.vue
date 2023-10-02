<script setup lang="ts">
import {useRouter} from "vue-router";
import AppLayoutAuth from "../layout/AppLayoutAuth.vue";
import AppStaticAuth from "../layout/AppStaticAuth.vue";

const router = useRouter();
const goBack = () => router.back()
</script>

<template>
  <app-layout-auth>
    <template #left>
      <div class="sign-in_box w-100 d-flex flex-column align-items-start justify-content-start">
        <span @click="goBack" class="link-text">Back</span>
        <br/>
        <br/>
        <h1 class="main-title">Reset your password</h1>
        <br/>
        <h4 class="main-text">You will get a reset code on your corporate email</h4>
        <br/>
        <br/>
        <app-ui-auth-input :is-error="false" :label="'Email'"/>
        <br/>
        <app-ui-button :text="'Send'" :is-in-active="false" :size="'normal'" />
      </div>
    </template>
    <template #right>
      <app-static-auth />
    </template>
  </app-layout-auth>
</template>

<style scoped lang="scss">

.sign-in_box {
  max-width: 500px;
}

</style>