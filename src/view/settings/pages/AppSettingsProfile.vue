<script setup lang="ts">
import AppLayoutSettings from '../layout/AppLayoutSettings.vue';
import AppUiAuthInput from '../../UI/AppUiAuthInput.vue';
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '../../../store';
import { checkPassword } from '../../../app/helpers';
import toastAlert from "../../../app/helpers/toast.ts";

const userStore = useUserStore();

const isLoadingUser = ref(false);
const isLoadingPassword = ref(false);

const errorUserMessage = ref('');
const errorPasswordMessage = ref('');

const name = reactive({
  value: userStore.user.name,
  error: '',
  isError: false
});

const surname = reactive({
  value: userStore.user.surname,
  error: '',
  isError: false
});

const password = reactive({
  value: '',
  error: '',
  isError: false,
  confirm: '',
  password: ''
});

const isValidPasswordLength = computed(() => {
  if (checkPassword(password.password)) {
    return true;
  }
  return false;
});

const isValidNewPassword = computed(() => {
  if (!password.value && !password.password) {
    return true;
  }
  return password.value !== password.password && checkPassword(password.value);
});

const isConfirmPassword = computed(() => {
  if (!password.confirm) {
    return true;
  }
  return password.confirm === password.value && password.confirm && password.value;
});

const isCanUserSubmit = computed(() => {
  return name.value !== userStore.user.name || surname.value !== userStore.user.surname;
});

const isCanPasswordSubmit = computed(() => {
  return isConfirmPassword.value && isValidNewPassword.value && isValidPasswordLength.value && password.confirm && password.value;
});

const submitUser = () => {
  userStore
    .updateUser({
      name: name.value,
      surname: surname.value
    })
      .then(() => toastAlert('Success', 'success', 2000))
      .catch(err => {
        if (err.response) {
          // errorPasswordMessage.value = err.response.data.detail;
          toastAlert(err.response.data.detail, 'error', 2000)
        }
      })
    .finally(() => (isLoadingUser.value = false));
};

const submitPassword = () => {
  userStore
    .changeProfilePassword({
      password: password.password,
      new_password: password.value
    })
    .then(() => toastAlert('Success', 'success', 2000))
    .catch(err => {
      if (err.response) {
        // errorPasswordMessage.value = err.response.data.detail;
        toastAlert(err.response.data.detail, 'error', 2000)
      }
    })
    .finally(() => (isLoadingPassword.value = false));
};
</script>

<template>
  <app-layout-settings>
    <template #main>
      <div class="w-100 d-flex flex-column align-items-start p-4">
        <h3 class="category-title">
          {{ $t('profile.profile') }}
        </h3>
        <br>
        <div class="wrapper-33">
          <app-ui-auth-input
            v-model="name.value"
            :is-error="name.isError"
            :label="$t('profile.first_name')"
            :error-message="name.error"
          />
          <app-ui-auth-input
            v-model="surname.value"
            :is-error="surname.isError"
            :label="$t('profile.last_name')"
            :error-message="surname.error"
          />
          <div
            v-if="errorUserMessage"
            class="w-100 text-center"
          >
            <span class="error">{{ errorUserMessage }}</span>
          </div>
          <div>
            <app-ui-button
              class="p-3"
              :text="$t('buttons.save')"
              :is-loading="isLoadingUser"
              :is-in-active="!isCanUserSubmit"
              :size="'normal'"
              @click="submitUser"
            />
          </div>
          <br>
          <h3 class="category-title">
            {{ $t('profile.change_password') }}
          </h3>
          <br>
          <app-ui-auth-input
            v-model="password.password"
            :is-error="password.isError"
            :label="$t('profile.password')"
            :is-password="true"
            :error-message="password.error"
          />
          <app-ui-auth-input
            v-model="password.value"
            :is-error="!isValidNewPassword || !isValidPasswordLength"
            :label="$t('profile.new_password')"
            :is-password="true"
            :error-message="'Please enter a new password. Password length must be a more than 8 symbols'"
          />
          <app-ui-auth-input
            v-model="password.confirm"
            :is-error="!isConfirmPassword"
            :error-message="'Password must be confirmed'"
            :label="$t('profile.confirm')"
            :is-password="true"
          />
          <div
            v-if="errorPasswordMessage"
            class="w-100 text-center"
          >
            <span class="error">{{ errorPasswordMessage }}</span>
          </div>
          <div>
            <app-ui-button
              class="p-3"
              :text="$t('buttons.save')"
              :is-loading="isLoadingPassword"
              :is-in-active="!isCanPasswordSubmit"
              :size="'normal'"
              @click="submitPassword"
            />
          </div>
        </div>
      </div>
    </template>
  </app-layout-settings>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.error {
  color: $error-red;
}

.wrapper-33 {
  width: 33%;
}
</style>
