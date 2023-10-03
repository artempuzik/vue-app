<script setup lang="ts">
import {PROJECT_NAME} from "../../../app/config/enviroments.ts";
import AppLayoutAuth from "../layout/AppLayoutAuth.vue";
import AppStaticAuth from "../layout/AppStaticAuth.vue";
import {useAppStore} from "../../../store";
import {computed, reactive, ref} from "vue";
import {AxiosError} from "axios";

const appStore = useAppStore()

const isUserIdExist = ref(!!appStore.id);

const isLoading = ref(false)
const errorMessage = ref('')

const email = reactive({
  value: '',
  error: '',
  isError: false
})

const firstName = reactive({
  value: '',
  error: '',
  isError: false
})

const lastName = reactive({
  value: '',
  error: '',
  isError: false
})

const password = reactive({
  value: '',
  error: '',
  isError: false,
  confirm: '',
})

const isValidPassword = computed(() => {
  if(!password.confirm) {
    return true;
  }
  return password.confirm === password.value
})

const isCanSubmit = computed(() => {
  if(isUserIdExist.value) {
    return !!password.value && !!lastName.value && !!firstName.value && isValidPassword.value
  }
  return !!email.value
})

const submit = () => {
  isLoading.value = true
  errorMessage.value = ''
  if(isUserIdExist.value) {
    firstName.isError = false
    lastName.isError = false
    password.isError = false
    appStore.createUser({
      user_id: appStore.id,
      password: password.value,
      first_name: firstName.value,
      last_name: lastName.value,
    })
        .catch((err: AxiosError<any>) => {
          if (err.response) {
            errorMessage.value = err.response.data.message
          }
        })
        .finally(() => isLoading.value = false)
  } else {
    email.isError = false
    appStore.checkExistUserByEmail({
      email: email.value,
    })
        .then((data) =>{
          if (data.status === 200) {
            isUserIdExist.value = true
          }
        })
      .catch((err: AxiosError<any>) => {
        if (err.response) {
          email.error = err.response.data.message
          email.isError = true
        }
    })
        .finally(() => isLoading.value = false)
  }

}

</script>

<template>
  <app-layout-auth>
    <template #left>
      <div class="sign-in_box w-100 d-flex flex-column align-items-start justify-content-start">
        <template v-if="false">
          <h1 class="main-title">Ups ...</h1>
          <br/>
          <h4 class="main-text">Your company don’t use Relu right now. But you have a chance to fix it!</h4>
          <br/>
          <app-ui-button
              class="p-3"
              :text="'Demo?'"
              :size="'normal'"
          />
          <app-ui-button
              class="my-1 p-3"
              :text="'Contact Sales'"
              :size="'normal'"
          />
        </template>
        <template v-else>
          <h1 class="main-title">Welcome to {{PROJECT_NAME}}</h1>
          <h4 class="main-text">Sign up in {{PROJECT_NAME}} using your corporate email</h4>
          <br/>
          <template v-if="isUserIdExist">
            <app-ui-auth-input
                v-model="password.value"
                :is-error="password.isError"
                :label="'New password'"
                :is-password="true"
                :error-message="password.error"
            />
            <app-ui-auth-input
                v-model="password.confirm"
                :is-error="!isValidPassword"
                :error-message="'Password must be confirmed'"
                :label="'Confirm password'"
                :is-password="true"
            />
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
          </template>
          <template v-else>
            <app-ui-auth-input
                v-model="email.value"
                :is-error="email.isError"
                :label="'Email'"
                :error-message="email.error"
            />
          </template>
          <div v-if="errorMessage" class="w-100 text-center">
            <span class="error">{{errorMessage}}</span>
          </div>
          <br v-else/>
          <app-ui-button
              class="p-3"
              @click="submit"
              :text="'Get started'"
              :is-loading="isLoading"
              :is-in-active="!isCanSubmit"
              :size="'normal'"
          />
        </template>
        <br/>
        <br/>
        <div class="w-100 d-flex flex-column align-items-start my-2">
          <span class="main-text">Already have an account? <router-link to="SignIn" class="link-text">Sign in</router-link></span>
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