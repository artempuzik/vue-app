<script setup lang="ts">
import { computed, ref } from 'vue';
import { PROJECT_NAME } from '../../app/config/enviroments.ts';
import { useRouter } from 'vue-router';
import { useUserStore, useAppStore } from '../../store';
import AppUiButton from "./AppUiButton.vue";

const router = useRouter();
const userStore = useUserStore();
const appStore = useAppStore();

const userName = computed(() => `${userStore.user.name} ${userStore.user.surname}`);

const emit = defineEmits(['update:tab']);

const isCheckLogoutPopup = ref(false);

const clickToTab = (tab: string) => {
  emit('update:tab', tab);
};

const isOpen = ref(false);

const toggleSelect = () => (isOpen.value = !isOpen.value);

const logOut = () => {
  appStore.logOut();
  isCheckLogoutPopup.value = false
  router.replace('sign-in');
};
</script>

<template>
  <div
    v-if="isOpen"
    class="modal_wrapper"
    @click.self="isOpen = false"
  />
  <header
    v-if="appStore.appConfig.isAuth"
    class="d-flex flex-column align-items-center justify-content-start header_wrapper header position-relative"
  >
    <div class="w-100 d-flex flex-row align-items-center justify-content-between p-2">
      <div class="d-flex flex-row align-items-center justify-content-start">
        <div class="me-4 second-title">
          <router-link
              to="dashboard"
              class="main-title"
              style="color: black; text-decoration: none"
          >
              {{ PROJECT_NAME }}
          </router-link>
        </div>
        <div class="d-flex flex-row align-items-center justify-content-start">
          <router-link
            to="dashboard"
            class="m-1 p-2 link"
            @click="clickToTab('Dashboard')"
          >
            <span class="main-text">{{ $t('header.nav_dashboard') }}</span>
          </router-link>
          <router-link
            to="list"
            class="m-1 p-2 link"
            @click="clickToTab('List')"
          >
            <span class="main-text">{{ $t('header.nav_list') }}</span>
          </router-link>
          <router-link
            to="history"
            class="m-1 p-2 link"
            @click="clickToTab('History')"
          >
            <span class="main-text">{{ $t('header.nav_history') }}</span>
          </router-link>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center justify-content-start position-relative">
        <img
          src="../../assets/svg/info.svg"
          width="25"
        >
        <div
          class="d-flex flex-row align-items-center justify-content-start ms-3"
          style="cursor: pointer"
          @click="toggleSelect"
        >
          <span class="category-title mx-2">{{ userName }}</span>
          <img
            src="../../assets/svg/chevron.svg"
            width="30"
            :class="{ rotate: isOpen }"
          >
        </div>
      </div>
      <div
        v-if="isOpen"
        class="app_select_modal d-flex flex-column"
        tabindex="0"
        @click="isOpen = false"
        @focusout="isOpen = false"
      >
        <router-link to="profile" class="d-flex flex-row align-items-center">
          <img src="../../assets/png/person.png" width="20" height="20" />
          <span class="mx-2 link">{{ $t('menu.account') }}</span>
        </router-link>
        <router-link to="settings" class="d-flex flex-row align-items-center">
          <img src="../../assets/png/settings.png" width="20" height="20" />
          <span class="mx-2 link">{{ $t('menu.settings') }}</span>
        </router-link>
        <router-link to="manager" class="d-flex flex-row align-items-center">
          <img src="../../assets/png/group.png" width="20" height="20" />
          <span class="mx-2 link">{{ $t('menu.management') }}</span>
        </router-link>
        <hr class="my-2">
        <div @click="isCheckLogoutPopup = true" class="d-flex flex-row align-items-center">
          <img src="../../assets/png/logout.png" width="20" height="20" />
          <span class="mx-2 link">{{ $t('menu.logout') }}</span>
        </div>
      </div>
    </div>
    <app-ui-modal
        v-if="isCheckLogoutPopup"
        @close="isCheckLogoutPopup = false"
    >
      <br>
      <h4 class="main-text text-center">
        {{ $t('header.question') }}
      </h4>
      <br>
      <br>
      <app-ui-button
          :is-in-active="false"
          :text="$t('buttons.yes')"
          @click="logOut"
      />
    </app-ui-modal>
  </header>
</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

header {
  background-color: $white-color;
}

.link {
  color: $black-color;
  text-decoration: none;
}

.active_tab {
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

.app_select_modal {
  position: absolute;
  padding: 13px;
  background: $white-color;
  border: 1px solid $border-menu;
  border-radius: $input-border-radius;
  top: 60px;
  width: 269px;
  right: 0px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  z-index: 9999;

  a,
  div {
    padding: 13px;
    border-radius: $input-border-radius;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      transition: 0.5s;
      background-color: $blue-light-light;
    }
  }
}

.modal_wrapper {
  position: absolute;
  max-width: 2000px;
  min-width: 1000px;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

.link {
  color: $black-color;
  text-decoration: none;
}

.header_wrapper {
  margin: 0 auto;
  max-width: 1350px;
  min-width: 1000px;

  &.header {
    background-color: $white-color;
  }
}
</style>
