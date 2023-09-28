<script setup lang="ts">
</script>

<template>
  <div class="sign-in_box w-100 d-flex flex-column align-items-start justify-content-start">
    <h1 class="main-title">Welcome to Relu</h1>
    <h4 class="main-text">Sign in with your corporate email and password</h4>
    <app-ui-auth-input :is-error="false" :label="'Email'"/>
    <br/>
    <app-ui-auth-input :is-error="false" :label="'Password'"/>
    <div class="w-100 d-flex flex-column align-items-end my-2">
      <router-link to="/auth/reset"><span class="link-text">Forgot your password?</span></router-link>
    </div>
    <br/>
    <br/>
    <br/>
    <app-ui-button :text="'Sign in'" :is-in-active="false" :size="'normal'" />
    <br/>
    <br/>
    <div class="w-100 d-flex flex-column align-items-start my-2">
      <span class="main-text">Don’t have a Relu account yet? <router-link to="/auth/sign-up" class="link-text">Sign up</router-link></span>
    </div>
  </div>
</template>

<style scoped lang="scss">

.sign-in_box {
  max-width: 450px;
}

</style>