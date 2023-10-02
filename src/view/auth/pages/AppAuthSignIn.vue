<script setup lang="ts">
import {PROJECT_NAME} from "../../../app/config/enviroments.ts";
import AppLayoutAuth from "../layout/AppLayoutAuth.vue";
import AppStaticAuth from "../layout/AppStaticAuth.vue";

import {computed, reactive, ref} from "vue";
import {useAppStore} from "../../../store";
import {AxiosError} from "axios";

const appStore = useAppStore()

const errorMessage = ref('')

const email = reactive({
  value: '',
  error: '',
  isError: false
})

const password = reactive({
  value: '',
  error: '',
  isError: false
})

const isCanSubmit = computed(() => !!email.value && !!password.value)

const submit = () => {
  email.isError = false
  password.isError = false
  errorMessage.value = ''
  appStore.loginUser({email: email.value, password: password.value})
      .catch((err: AxiosError<any>) => {
        errorMessage.value = err.response.data.message
        email.isError = true
        password.isError = true
      })
}

</script>

<template>
  <app-layout-auth>
    <template #left>
      <div class="sign-in_box w-100 d-flex flex-column align-items-start justify-content-start">
        <h1 class="main-title">Welcome to {{PROJECT_NAME}}</h1>
        <h4 class="main-text">Sign in with your corporate email and password</h4>
        <app-ui-auth-input
            v-model="email.value"
            :is-error="email.isError"
            :label="'Email'"
            :error-message="email.error"
        />
        <br/>
        <app-ui-auth-input
            v-model="password.value"
            :is-error="password.isError"
            :label="'Password'"
            :error-message="password.error"
        />
        <div class="w-100 d-flex flex-column align-items-end my-2">
          <router-link to="/auth/reset"><span class="link-text">Forgot your password?</span></router-link>
        </div>
        <br/>
        <br/>
        <div v-if="errorMessage" class="w-100 text-center">
          <span class="error">{{errorMessage}}</span>
        </div>
        <br v-else/>
        <app-ui-button @click="submit" :text="'Sign in'" :is-in-active="!isCanSubmit" :size="'normal'" />
        <br/>
        <br/>
        <div class="w-100 d-flex flex-column align-items-start my-2">
          <span class="main-text">Don’t have a {{PROJECT_NAME}} account yet? <router-link to="/auth/sign-up" class="link-text">Sign up</router-link></span>
        </div>
      </div>
    </template>
    <template #right>
      <app-static-auth />
    </template>
  </app-layout-auth>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.sign-in_box {
  max-width: 450px;
}

.error {
  color: $error-red;
}

</style>