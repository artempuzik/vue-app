<script setup lang="ts">
</script>

<template>
  <div class="sign-in_box w-100 d-flex flex-column align-items-start justify-content-start">
    <h1 class="main-title">Welcome to Relu</h1>
    <h4 class="main-text">Sign up in Relu using your corporate email</h4>
    <br/>
    <br/>
    <app-ui-auth-input :is-error="false" :label="'New password'"/>
    <br/>
    <app-ui-auth-input :is-error="true" :label="'Confirm password'"/>
    <br/>
    <app-ui-auth-input :is-error="false" :label="'First name'"/>
    <br/>
    <app-ui-auth-input :is-error="false" :label="'Last name'"/>
    <br/>
    <app-ui-button :text="'Get started'" :is-in-active="false" :size="'normal'" />
    <br/>
    <br/>
    <div class="w-100 d-flex flex-column align-items-start my-2">
      <span class="main-text">Already have an account? <router-link to="/auth/sign-in" class="link-text">Sign in</router-link></span>
    </div>
  </div>
</template>

<style scoped lang="scss">

.sign-in_box {
  max-width: 450px;
}

</style>