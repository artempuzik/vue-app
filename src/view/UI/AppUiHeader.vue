<script setup lang="ts">
import { computed, ref } from 'vue';
import { PROJECT_NAME } from '../../app/config/enviroments.ts';
import { useRouter } from 'vue-router';
import { useUserStore, useAppStore } from '../../store';
import AppUiButton from "./AppUiButton.vue";
import AppUiInput from "./AppUiInput.vue";

const router = useRouter();
const userStore = useUserStore();
const appStore = useAppStore();

const userName = computed(() => `${userStore.user.name} ${userStore.user.surname}`);

const emit = defineEmits(['update:tab']);

const activeTab = ref('Dashboard');
const isCheckLogoutPopup = ref(false);

const clickToTab = (tab: string) => {
  activeTab.value = tab;
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
            :class="{ active_tab: activeTab === 'Dashboard' }"
            @click="clickToTab('Dashboard')"
          >
            <span class="main-text">{{ $t('header.nav_dashboard') }}</span>
          </router-link>
          <router-link
            to="list"
            class="m-1 p-2 link"
            :class="{ active_tab: activeTab === 'List' }"
            @click="clickToTab('List')"
          >
            <span class="main-text">{{ $t('header.nav_list') }}</span>
          </router-link>
          <router-link
            to="history"
            class="m-1 p-2 link"
            :class="{ active_tab: activeTab === 'History' }"
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
        <router-link to="profile">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="20" height="20" fill="url(#pattern0)"/>
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_0_744" transform="scale(0.0416667)"/>
              </pattern>
              <image id="image0_0_744" width="24" height="24" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAuElEQVR4nO2SQQrCMBBFHxLQM6hd9xgeSW+gF+g9Wil0J55DXOoNVGx3XUWEEUKoY8ERN33wIWSS/xYJDBiRACXQSCogtSy/Aj7KTWZfU3aUv7K1EDSKoP614G4hqBRBYSFI5UHj8gswx4hEHrSWFJblA28ZAQtgA2SAC2ZO9tZy5nm2NxNgBZyjX5NLsZN1ODsBS2D8qXwGHJV/n3eUhzkAU02wVy77ntlpgtZA0GoCb5T/CQaIeQDxA5ROSTkZCgAAAABJRU5ErkJggg=="/>
            </defs>
          </svg>
          <span class="mx-2 link">{{ $t('menu.account') }}</span>
        </router-link>
        <router-link to="settings">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="20" height="20" fill="url(#pattern0)"/>
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_0_747" transform="scale(0.0416667)"/>
              </pattern>
              <image id="image0_0_747" width="24" height="24" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABUklEQVR4nOWVT0pDMRDGfxtXigs9RN2o3fhnabvQZT1FexYRxerGogepV/AMXbUqouuH8lSUgS8wxNe+RBEUPxgyyUy+SSbJBP4TloFCYvq30QHGQFf9HeBdYrqhJx/zzcaFyErpIxdgpLFSfdOz0XKEdWK+SdgHLjXhSpOfgRNgyxFuA33ZrD8E2pprHFMxjlZ2A6w6exgPWJOPn2McU9F1eX0SATMChCBhJ6W7FLWHa2kJmAOOXIBDjQX0Uw57SbkPt2XD2Ty5DxKw6W5XS1yfUEQE8872WBHgwdkXIluRE2AFeKkIYGONnABxinaBY3foVVIqfXspKYoP+U3tKzBQzu8lB8C5bN639kX3ohVfA80Z/k35+B0ZR/JDu614Cx7rwF3OQ/OlYuhWdarysCgx/czt1peK5Mrazih25vv7ynUHmCR8OJOvfjg//mXyJ/ABlmO9TQcQwLsAAAAASUVORK5CYII="/>
            </defs>
          </svg>
          <span class="mx-2 link">{{ $t('menu.settings') }}</span>
        </router-link>
        <router-link to="manager">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="20" height="20" fill="url(#pattern0)"/>
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_0_741" transform="scale(0.0416667)"/>
              </pattern>
              <image id="image0_0_741" width="24" height="24" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAo0lEQVR4nO2RvQ3CMBBGXwEZgDkYKjMwRAhDIDZgm2wQJz2N6YzOulBYVi6ORBPypK/xux/JBzt/SwXcgAFwQKtvS72JNIQkbYE3GTIDxgJv4jID+gJvkvuCa4E3qXSImznynN8wJ6AGnkAHvDSdvtVaM3Ex/Jcj0AA+c7yQxGut9AgPw0fuCwaHJNIjnA0fea9Y4LX3YPhIWJkJy/9+wc6G+QAuxJ7LTV0aUgAAAABJRU5ErkJggg=="/>
            </defs>
          </svg>
          <span class="mx-2 link">{{ $t('menu.management') }}</span>
        </router-link>
        <hr class="my-2">
        <div @click="isCheckLogoutPopup = true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="20" height="20" fill="url(#pattern0)"/>
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_0_750" transform="scale(0.0416667)"/>
              </pattern>
              <image id="image0_0_750" width="24" height="24" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAf0lEQVR4nOWVQQqAIBBF376zdI/sFK66VtCl2tcd2k4EtpRGc0jsw4dZzJ+HigotagR2QBJ9ZZwGkDNcgjcN4G5OlWhz/wXMVgAfqYsBBFiALiWQChBgBfq3AHnwAUxVA8y36JND9pG6GMD8orXzFok2Z/7huNCYM3zIWHnlOgFUboiZOMRTJgAAAABJRU5ErkJggg=="/>
            </defs>
          </svg>
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
