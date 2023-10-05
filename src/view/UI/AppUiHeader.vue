<script setup lang="ts">
import {computed, ref} from "vue";
import {PROJECT_NAME} from "../../app/config/enviroments.ts";
import {useRouter} from "vue-router";
import {useUserStore, useAppStore} from "../../store";

const router = useRouter();
const userStore = useUserStore()
const appStore = useAppStore()

const userName = computed(() => `${userStore.user.firstName} ${userStore.user.lastName}`)

const emit = defineEmits(['update:tab'])

const activeTab = ref('Dashboard')

const clickToTab = (tab: string) => {
  activeTab.value = tab;
  emit("update:tab", tab);
}

const isOpen = ref(false)

const toggleSelect = () => isOpen.value = !isOpen.value

const logOut = () => {
  appStore.logOut()
  router.replace('SingIn')
}


</script>

<template>
  <header class="w-100 d-flex flex-row align-items-center justify-content-between p-4">
    <div class="d-flex flex-row align-items-center justify-content-start">
      <div class="me-4 second-title">
          <h1>{{PROJECT_NAME}}</h1>
      </div>
      <div class="d-flex flex-row align-items-center justify-content-start">
        <div class="m-1 p-2"
             :class="{'active': activeTab === 'Dashboard'}"
             @click="clickToTab('Dashboard')"
        ><span class="main-text">Dashboard</span></div>
        <div class="m-1 p-2"
             :class="{'active': activeTab === 'List'}"
             @click="clickToTab('List')"
        ><span class="main-text">List</span></div>
        <div class="m-1 p-2"
             :class="{'active': activeTab === 'History'}"
             @click="clickToTab('History')"
        ><span class="main-text">History</span></div>
      </div>
    </div>
    <div class="d-flex flex-row align-items-center justify-content-start">
      <img src="../../assets/svg/info.svg" width="25">
      <div
          @click="toggleSelect"
          class="d-flex flex-row align-items-center justify-content-start ms-3"
          style="cursor: pointer">
        <span class="category-title mx-2">{{userName}}</span>
        <img src="../../assets/svg/chevron.svg" width="30" :class="{'rotate': isOpen}">
        <div v-if="isOpen" class="modal_wrapper d-flex flex-column align-items-end">
          <div class="app_select_modal shadow">
            <div class="my-2">
              <img src="../../assets/svg/user.svg" />
              <router-link to="profile" class="mx-2 link">Account</router-link>
            </div>
            <div class="my-2">
              <img src="../../assets/svg/settings.svg" />
              <router-link to="settings" class="mx-2 link">Settings</router-link>
            </div>
            <div class="my-2">
              <img src="../../assets/svg/management.svg" />
              <router-link to="manager" class="mx-2 link">Team Management</router-link>
            </div>
            <hr>
            <div class="mt-2" @click="logOut">
              <img src="../../assets/svg/logout.svg" />
              <span class="mx-2 link">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

header {
  background-color: $white-color;
}

.active {
  border-radius: $button-border-radius;
  background-color: $blue-light-light;
  color: $blue-normal;
}

div span {
  cursor: pointer;
}

.rotate {
  transform: rotate(180deg);
}

.modal_wrapper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

.app_select_modal {
  position: absolute;
  padding: 26px 26px 24px;
  background-color: $white-color;
  top: 80px;
  width: 269px;
  right: 10px;
  z-index: 9999;

  div {
    padding: 7px 9px;
    border-radius: $input-border-radius;
    cursor: pointer;

    &:hover {
      background-color: $blue-light-light;
    }
  }
}

.link {
  color: $black-color;
  text-decoration: none;
}

</style>