<script setup lang="ts">
import AppLayoutSettings from '../layout/AppLayoutSettings.vue';
import AppUiAuthInput from '../../UI/AppUiAuthInput.vue';
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '../../../store';
import { checkPassword } from '../../../app/helpers';

const userStore = useUserStore();

const isLoadingUser = ref(false);
const isLoadingPassword = ref(false);

const errorUserMessage = ref('');
const errorPasswordMessage = ref('');

const firstName = reactive({
  value: userStore.user.firstName,
  error: '',
  isError: false
});

const lastName = reactive({
  value: userStore.user.lastName,
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
  return lastName.value !== userStore.user.lastName || firstName.value !== userStore.user.firstName;
});

const isCanPasswordSubmit = computed(() => {
  return isConfirmPassword.value && isValidNewPassword.value && isValidPasswordLength.value && password.confirm && password.value;
});

const submitUser = () => {
  userStore
    .updateUser({
      first_name: firstName.value,
      last_name: lastName.value
    })
    .catch(err => {
      if (err.response) {
        errorUserMessage.value = err.response.data.message;
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
    .catch(err => {
      if (err.response) {
        errorPasswordMessage.value = err.response.data.message;
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
        <div class="w-50">
          <app-ui-auth-input
            v-model="firstName.value"
            :is-error="firstName.isError"
            :label="$t('profile.first_name')"
            :error-message="firstName.error"
          />
          <app-ui-auth-input
            v-model="lastName.value"
            :is-error="lastName.isError"
            :label="$t('profile.last_name')"
            :error-message="lastName.error"
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
</style>
