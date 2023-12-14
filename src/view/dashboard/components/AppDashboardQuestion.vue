<script setup lang="ts">
import {ref} from 'vue'
import AppUiButton from "../../UI/AppUiButton.vue";
import {useUserStore} from "../../../store";
const userStore = useUserStore();
const isShowed = ref(true)
</script>

<template>
  <div v-if="isShowed" class="block py-2 px-3 mt-4 d-flex flex-row align-items-center justify-content-start">
      <div class="me-3">
        <img src="../../../assets/png/free-feedback.png">
      </div>
      <div style="flex: 1">
        <div class="title">
          <span>{{ userStore.user.surname }}, do you like using Relu?</span>
        </div>
        <div class="w-100 d-flex flex-row justify-content-between mt-2">
          <app-ui-button
              size="small"
              style="height: 25px"
              class="me-2 button_style"
              :text="'No really'"
          />
          <app-ui-button
              size="small"
              style="height: 25px"
              class="button_style"
              :text="'Yes!'"
          />
        </div>
      </div>
      <div class="h-100 d-flex flex-row align-items-start justify-content-end ms-3">
        <span class="close" @click="isShowed = false">&times;</span>
      </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.block {
  width: 100%;
  height: 115px;
  background-color: $white-color;
  border-radius: $block-border-radius;
}

.title {
  display: block;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.1;
}

.button_style {
  color: black;
  background-color: $white-color !important;
  border: solid 1px black;
  font-size: 12px;
}

.close {
  color: black;
  height: 16px;
  cursor: pointer;
}

</style>
