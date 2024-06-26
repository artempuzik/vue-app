<script setup lang="ts">
import AppLayoutAuth from '../layout/AppLayoutAuth.vue';
import AppStaticAuth from '../layout/AppStaticAuth.vue';

import { computed, reactive, ref } from 'vue';
import { useUserStore } from '../../../store';
import { AxiosError } from 'axios';
import { checkPassword, emailValidator } from '../../../app/helpers';

const userStore = useUserStore();

const errorMessage = ref('');
const isLoading = ref(false);

const login = reactive({
  value: '',
  error: '',
  isError: false
});

const password = reactive({
  value: '',
  error: '',
  isError: false
});

const isValidLogin = computed(() => emailValidator(login.value));
const isValidPassword = computed(() => checkPassword(password.value));

const isCanSubmit = computed(() => {
  if(login.value) {
    return isValidPassword.value && password.value
  }
  if(password.value) {
    return isValidLogin.value && login.value
  }
  return isValidLogin.value && isValidPassword.value
});

const submit = () => {
  isLoading.value = true;
  login.isError = false;
  password.isError = false;
  errorMessage.value = '';
  userStore
    .loginUser({ login: login.value, password: password.value })
    .catch((err: AxiosError<any>) => {
      if (err.response) {
        login.isError = true;
        password.isError = true;
        errorMessage.value = 'Invalid Username or Password'
      }
    })
    .finally(() => (isLoading.value = false));
};
</script>

<template>
  <app-layout-auth>
    <template #left>
      <div class="sign-in_box w-100 d-flex flex-column align-items-start justify-content-start">
        <h1 class="main-title">
          {{ $t('auth.sign_in_title') }}
        </h1>
        <h4 class="main-text">
          {{ $t('auth.sign_in_sub_title') }}
        </h4>
        <br>
        <br>
        <app-ui-auth-input
          v-model="login.value"
          :is-error="login.isError"
          :label="$t('auth.email')"
        />
        <app-ui-auth-input
          v-model="password.value"
          :is-error="password.isError"
          :label="$t('auth.password')"
          :is-password="true"
        />
        <div class="w-100 d-flex flex-column align-items-end my-2">
          <router-link to="reset-password">
            <span class="link-text">{{ $t('auth.forgot_password') }}</span>
          </router-link>
        </div>
        <br>
        <br>
        <app-ui-button
          class="p-3"
          :text="'Sign in'"
          :is-loading="isLoading"
          :is-in-active="!isCanSubmit"
          :size="'normal'"
          @click="submit"
        />
        <div
            v-if="errorMessage"
            class="w-100 text-center"
        >
          <span class="error">{{ errorMessage }}</span>
        </div>
        <br v-else>
        <br>
        <div class="w-100 d-flex flex-column align-items-start my-2">
          <span class="main-text">{{ $t('auth.not_exist_account_text') }}
            <span />
            <router-link
              to="sign-up"
              class="link-text"
            >{{ $t('auth.sign_up') }}</router-link>
          </span>
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
