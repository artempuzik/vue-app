<script setup lang="ts">
import AppLayoutSettings from "../layout/AppLayoutSettings.vue";
import AppUiAuthInput from "../../UI/AppUiAuthInput.vue";
import {computed, reactive, ref} from "vue";
import {useAppStore} from "../../../store";

const appStore = useAppStore()

const isLoadingUser = ref(false)
const isLoadingPassword = ref(false)

const errorUserMessage = ref('')
const errorPasswordMessage = ref('')

const firstName = reactive({
  value: appStore.firstName,
  error: '',
  isError: false
})

const lastName = reactive({
  value: appStore.lastName,
  error: '',
  isError: false
})

const password = reactive({
  value: '',
  error: '',
  isError: false,
  confirm: '',
  password: '',
})


const isValidNewPassword = computed(() => {
  if(!password.value || !password.password) {
    return true;
  }
  return password.value !== password.password
})

const isConfirmPassword = computed(() => {
  if(!password.confirm) {
    return true;
  }
  return password.confirm === password.value
})

const isCanUserSubmit = computed(() => {
    return lastName.value !== appStore.lastName || firstName.value !== appStore.firstName
})

const isCanPasswordSubmit = computed(() => {
  return !!password.value && isConfirmPassword.value && isValidNewPassword.value
})

const submitUser = () => {
  appStore.updateUser({
    first_name: firstName.value,
    last_name: lastName.value,
  })
      .catch((err) => {
        if (err.response) {
          errorUserMessage.value = err.response.data.message
        }
      })
      .finally(() => isLoadingUser.value = false)
}

const submitPassword = () => {
  appStore.changeProfilePassword({
    password: password.password,
    new_password: password.value,
  })
      .catch((err) => {
        if (err.response) {
          errorPasswordMessage.value = err.response.data.message
        }
      })
      .finally(() => isLoadingPassword.value = false)
}

</script>

<template>
  <app-layout-settings>
    <template #header>
      <app-ui-header/>
    </template>
    <template #main>
      <div class="w-100 d-flex flex-column align-items-start p-4">
        <h3 class="category-title">Profile</h3>
        <br>
        <div class="w-50">
          <app-ui-auth-input
              v-model="firstName.value"
              :is-error="firstName.isError"
              :label="'First name'"
              :error-message="firstName.error"
          />
          <app-ui-auth-input
              v-model="lastName.value"
              :is-error="lastName.isError"
              :label="'Last name'"
              :error-message="lastName.error"
          />
          <div v-if="errorUserMessage" class="w-100 text-center">
            <span class="error">{{errorUserMessage}}</span>
          </div>
          <div>
            <app-ui-button
                class="p-3"
                @click="submitUser"
                :text="'Save'"
                :is-loading="isLoadingUser"
                :is-in-active="!isCanUserSubmit"
                :size="'normal'"
            />
          </div>
          <br>
          <h3 class="category-title">Change password</h3>
          <br>
          <app-ui-auth-input
              v-model="password.password"
              :is-error="password.isError"
              :label="'Password'"
              :is-password="true"
              :error-message="password.error"
          />
          <app-ui-auth-input
              v-model="password.value"
              :is-error="!isValidNewPassword"
              :label="'New password'"
              :is-password="true"
              :error-message="'Please enter a new password'"
          />
          <app-ui-auth-input
              v-model="password.confirm"
              :is-error="!isConfirmPassword"
              :error-message="'Password must be confirmed'"
              :label="'Confirm password'"
              :is-password="true"
          />
          <div v-if="errorPasswordMessage" class="w-100 text-center">
            <span class="error">{{errorPasswordMessage}}</span>
          </div>
          <div>
            <app-ui-button
                class="p-3"
                @click="submitPassword"
                :text="'Save'"
                :is-loading="isLoadingPassword"
                :is-in-active="!isCanPasswordSubmit"
                :size="'normal'"
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