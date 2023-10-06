<script setup lang="ts">
import {PROJECT_NAME} from "../../../app/config/enviroments.ts";
import AppLayoutAuth from "../layout/AppLayoutAuth.vue";
import AppStaticAuth from "../layout/AppStaticAuth.vue";

import {computed, reactive, ref} from "vue";
import {useUserStore} from "../../../store";
import {AxiosError} from "axios";
import {useRouter} from "vue-router";
import {emailValidator} from "../../../app/helpers";

const router = useRouter()

const userStore = useUserStore()

const errorMessage = ref('')
const isLoading = ref(false)

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

const isValidEmail = computed(() => emailValidator(email.value))

const isCanSubmit = computed(() => isValidEmail.value && !!password.value)

const submit = () => {
  isLoading.value = true
  email.isError = false
  password.isError = false
  errorMessage.value = ''
  userStore.loginUser({email: email.value, password: password.value})
      .then(() =>{
        router.replace('main');
      })
      .catch((err: AxiosError<any>) => {
        if (err.response) {
          errorMessage.value = err.response.data.message
          email.isError = true
          password.isError = true
        }
      })
      .finally(() => isLoading.value = false)
}

</script>

<template>
  <app-layout-auth>
    <template #left>
      <div class="sign-in_box w-100 d-flex flex-column align-items-start justify-content-start">
        <h1 class="main-title">{{$t('auth.sign_in_title')}}</h1>
        <h4 class="main-text">{{$t('auth.sign_in_sub_title')}}</h4>
        <app-ui-auth-input
            v-model="email.value"
            :is-error="email.isError"
            :label="$t('auth.email')"
            :error-message="email.error"
        />
        <app-ui-auth-input
            v-model="password.value"
            :is-error="password.isError"
            :label="$t('auth.password')"
            :is-password="true"
            :error-message="password.error"
        />
        <div class="w-100 d-flex flex-column align-items-end my-2">
          <router-link to="reset-password"><span class="link-text">{{ $t('auth.forgot_password') }}</span></router-link>
        </div>
        <br/>
        <br/>
        <div v-if="errorMessage" class="w-100 text-center">
          <span class="error">{{errorMessage}}</span>
        </div>
        <br v-else/>
        <app-ui-button class="p-3" @click="submit" :text="'Sign in'" :is-loading="isLoading" :is-in-active="!isCanSubmit" :size="'normal'" />
        <br/>
        <br/>
        <div class="w-100 d-flex flex-column align-items-start my-2">
          <span class="main-text">{{ $t('auth.not_exist_account_text') }}<router-link to="sign-up" class="link-text">{{ $t('auth.sign_up') }}</router-link></span>
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