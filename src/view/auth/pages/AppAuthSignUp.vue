<script setup lang="ts">
import AppLayoutAuth from '../layout/AppLayoutAuth.vue';
import AppStaticAuth from '../layout/AppStaticAuth.vue';
import { useUserStore, useAppStore } from '../../../store';
import { computed, reactive, ref } from 'vue';
import { AxiosError } from 'axios';
import { checkPassword, emailValidator } from '../../../app/helpers';

const userStore = useUserStore();
const appStore = useAppStore();

const isUserExist = ref(!!appStore.appConfig.Bearer_Auth);

const isLoading = ref(false);
const errorMessage = ref('');
const error = reactive({
  isError: false,
  code: 400
});

const email = reactive({
  value: '',
  error: '',
  isError: false
});

const name = reactive({
  value: '',
  error: '',
  isError: false
});

const surname = reactive({
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
  if (isUserExist.value) {
    return isValidPasswordLength.value && !!surname.value && !!name.value && isValidPassword.value;
  }
  return isValidEmail.value;
});

const submit = () => {
  isLoading.value = true;
  errorMessage.value = '';
  if (isUserExist.value) {
    name.isError = false;
    surname.isError = false;
    password.isError = false;
    userStore
      .createUser({
        Bearer_Auth: appStore.appConfig.Bearer_Auth,
        password: password.value,
        surname: name.value,
        name: surname.value
      })
      .catch((err: AxiosError<any>) => {
        if (err.response) {
          error.isError = true;
          error.code = err.response.status;
          errorMessage.value = err.response.data.message;
        }
      })
      .finally(() => (isLoading.value = false));
  } else {
    email.isError = false;
    userStore
      .checkExistUserByEmail({
        login: email.value
      })
      .then(data => {
        if (data.status === 200) {
          isUserExist.value = true;
        }
      })
      .catch((err: AxiosError<any>) => {
        if (err.response) {
          error.isError = true;
          error.code = err.response.status;
          errorMessage.value = err.response.data.detail || 'Invalid data'
          email.isError = true;
        }
      })
      .finally(() => (isLoading.value = false));
  }
};
</script>

<template>
  <app-layout-auth>
    <template #left>
      <div class="sign-in_box w-100 d-flex flex-column align-items-start justify-content-start">
        <template v-if="error.isError">
<!--          <template v-if="error.code === 409">-->
            <h1 class="main-title">
              {{errorMessage}}
            </h1>
            <br>
            <h4 class="main-text">
              {{ $t('auth.sign_up_error_two') }}
            </h4>
<!--            <br>-->
<!--            <br>-->
<!--            <app-ui-button-->
<!--              class="p-3"-->
<!--              :text="$t('auth.demo')"-->
<!--              :size="'normal'"-->
<!--            />-->
<!--          </template>-->
<!--          <template v-if="error.code === 404">-->
<!--            <h1 class="main-title">-->
<!--              {{ $t('auth.ups') }}-->
<!--            </h1>-->
<!--            <br>-->
<!--            <h4 class="main-text">-->
<!--              {{ $t('auth.sign_up_error_one') }}-->
<!--            </h4>-->
<!--          </template>-->
        </template>
        <template v-else>
          <h1 class="main-title">
            {{ $t('auth.sign_in_title') }}
          </h1>
          <h4 class="main-text">
            {{ $t('auth.sign_up_sub_email_title') }}
          </h4>
          <br>
          <br>
          <template v-if="isUserExist">
            <app-ui-auth-input
              v-model="password.value"
              :is-error="password.isError"
              :label="$t('auth.new_password')"
              :is-password="true"
              :error-message="password.error"
            />
            <app-ui-auth-input
              v-model="password.confirm"
              :is-error="!isValidPassword"
              :error-message="'Password must be confirmed'"
              :label="$t('auth.confirm')"
              :is-password="true"
            />
            <app-ui-auth-input
              v-model="name.value"
              :is-error="name.isError"
              :label="$t('auth.first_name')"
              :error-message="name.error"
            />
            <app-ui-auth-input
              v-model="surname.value"
              :is-error="surname.isError"
              :label="$t('auth.last_name')"
              :error-message="surname.error"
            />
          </template>
          <template v-else>
            <app-ui-auth-input
              v-model="email.value"
              :is-error="email.isError"
              :label="$t('auth.email')"
              :error-message="email.error"
            />
          </template>
          <div
            v-if="errorMessage"
            class="w-100 text-center"
          >
            <span class="error">{{ errorMessage }}</span>
          </div>
          <br v-else>
          <app-ui-button
            class="p-3"
            :text="$t('auth.get_started')"
            :is-loading="isLoading"
            :is-in-active="!isCanSubmit"
            :size="'normal'"
            @click="submit"
          />
        </template>
        <br>
        <br>
        <div class="w-100 d-flex flex-column align-items-start my-2">
          <span class="main-text">{{ $t('auth.exist_account_text') }}
            <span />
            <router-link
              to="sign-in"
              class="link-text"
            >{{ $t('auth.sign_in') }}</router-link>
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
.sign-in_box {
  max-width: 450px;
}
</style>
