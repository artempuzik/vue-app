<script setup lang="ts">

import {ref} from "vue";

const isShowingMenu = ref(false)

const toggleShowMenu = () => isShowingMenu.value = !isShowingMenu.value

</script>

<template>
  <tr>
    <td>Larry</td>
    <td>the Bird</td>
    <td>@twitter</td>
    <td>Mark</td>
    <td>Otto</td>
    <td @click="toggleShowMenu" class="position-relative">
      <span class="fw-bold fs-5 cursor">...</span>
      <div v-if="isShowingMenu" class="setting_modal">
        <div>
          <span>Change role</span>
        </div>
        <div>
          <span class="warning">Delete</span>
        </div>
      </div>
    </td>
  </tr>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

  .cursor {
    cursor: pointer;
  }

  .warning {
    color: $error-red;
  }

  .setting_modal {
    position: absolute;
    padding: 17px 18px;
    background-color: $white-color;
    top: 30px;
    width: 169px;
    right: 0px;
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

</style>