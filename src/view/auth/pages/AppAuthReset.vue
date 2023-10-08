<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppLayoutAuth from '../layout/AppLayoutAuth.vue';
import AppStaticAuth from '../layout/AppStaticAuth.vue';
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '../../../store';
import { AxiosError } from 'axios';
import { checkPassword, emailValidator } from '../../../app/helpers';

const router = useRouter();
const goBack = () => router.back();

const userStore = useUserStore();

const errorMessage = ref('');
const isLoading = ref(false);
const token = ref('');

const steps = reactive({
  isSendEmailStep: false,
  isSendCodeStep: true,
  isSendPasswordStep: false
});

const email = reactive({
  value: '',
  error: '',
  isError: false
});

const code = reactive({
  value: '',
  error: '',
  isError: false
});

const password = reactive({
  value: '',
  error: '',
  isError: false,
  confirm: ''
});

const isValidEmail = computed(() => emailValidator(email.value));

const isValidPasswordLength = computed(() => checkPassword(password.value));

const isValidPassword = computed(() => {
  if (!password.confirm) {
    return true;
  }
  return password.confirm === password.value;
});

const isCanSubmit = computed(() => {
  if (steps.isSendPasswordStep) {
    return isValidPassword.value && isValidPasswordLength.value;
  }
  if (steps.isSendCodeStep) {
    return !!code.value;
  }
  return isValidEmail.value;
});

const submit = () => {
  isLoading.value = true;
  errorMessage.value = '';
  if (steps.isSendEmailStep) {
    email.isError = false;
    userStore
      .resetPasswordByEmail(email.value)
      .then(data => {
        if (data.status === 200) {
          steps.isSendEmailStep = false;
          steps.isSendCodeStep = true;
        }
      })
      .catch((err: AxiosError<any>) => {
        if (err.response) {
          email.error = err.response.data.message;
          email.isError = true;
        }
      })
      .finally(() => (isLoading.value = false));
  }

  if (steps.isSendCodeStep) {
    code.isError = false;
    userStore
      .sendVerifyCodeToResetPassword(code.value)
      .then(data => {
        if (data.status === 200) {
          steps.isSendCodeStep = false;
          steps.isSendPasswordStep = true;
        }
      })
      .catch((err: AxiosError<any>) => {
        if (err.response) {
          code.error = err.response.data.message;
          code.isError = true;
        }
      })
      .finally(() => (isLoading.value = false));
  }

  if (steps.isSendPasswordStep) {
    userStore
      .changeUserPassword({
        user_id: userStore.user.id,
        new_password: password.value,
        token: token.value
      })
      .then(data => {
        if (data.status === 200) {
          steps.isSendEmailStep = true;
          steps.isSendPasswordStep = false;
          router.replace('main');
        }
      });
  }
};
</script>

<template>
  <app-layout-auth>
    <template #left>
      <div class="sign-in_box w-100 d-flex flex-column align-items-start justify-content-start p-1">
        <span
          class="link-text"
          @click="goBack"
        >Back</span>
        <br>
        <br>
        <h1 class="main-title">
          {{ $t('auth.reset_password_title') }}
        </h1>
        <br>
        <h4 class="main-text">
          {{ $t('auth.reset_password_sub_title') }}
        </h4>
        <br>
        <br>
        <app-ui-auth-input
          v-if="steps.isSendEmailStep"
          v-model="email.value"
          :is-error="email.isError"
          :error-message="email.error"
          :label="$t('auth.email')"
        />
        <app-ui-auth-input
          v-if="steps.isSendCodeStep"
          v-model="code.value"
          :is-error="code.isError"
          :error-message="code.error"
          :label="$t('auth.code')"
        />
        <app-ui-auth-input
          v-if="steps.isSendPasswordStep"
          v-model="password.value"
          :is-error="password.isError"
          :error-message="password.error"
          :label="$t('auth.new_password')"
        />
        <app-ui-auth-input
          v-if="steps.isSendPasswordStep"
          v-model="password.confirm"
          :is-error="!isValidPassword"
          :label="$t('auth.confirm')"
          :error-message="'Password must be confirmed'"
        />
        <br>
        <app-ui-button
          class="p-3"
          :is-loading="isLoading"
          :text="$t('auth.send')"
          :is-in-active="!isCanSubmit"
          :size="'normal'"
          @click="submit"
        />
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
