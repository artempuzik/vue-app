<script setup lang="ts">
import {PropType, ref} from "vue";
import {IUser} from "../../../app/api/types.ts";
import {useCompanyStore} from "../../../store";

defineProps({
  member: Object as PropType<IUser>
})

const companyStore = useCompanyStore()

const isShowingMenu = ref(false)

const toggleShowMenu = () => isShowingMenu.value = !isShowingMenu.value

</script>

<template>
  <tr class="item">
    <td>{{ member.first_name }} {{member.last_name}}</td>
    <td>{{member.email}}</td>
    <td>{{member.role}}</td>
    <td>{{member.updated_at}}</td>
    <td>{{member.created_at}}</td>
    <td @click="toggleShowMenu" @focusout="isShowingMenu = false" tabindex="0" class="position-relative">
      <span class="fw-bold fs-5 cursor">...</span>
      <div v-if="isShowingMenu" class="setting_modal">
        <div>
          <span>Change role</span>
        </div>
        <div @click="companyStore.removeMemberById(member.id)">
          <span class="warning">Delete</span>
        </div>
      </div>
    </td>
  </tr>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.item {
  cursor: pointer;
}

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
    border: 1px solid $grey-border;
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