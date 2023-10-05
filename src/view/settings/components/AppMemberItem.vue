<script setup lang="ts">
import {PropType, ref, reactive} from "vue";
import {IUser} from "../../../app/api/types/types.ts";
import {useCompanyStore} from "../../../store";
import AppUiModal from "../../UI/AppUiModal.vue";
import AppUiSelect from "../../UI/AppUiSelect.vue";
import AppUiButton from "../../UI/AppUiButton.vue";
import {USER_STATUSES} from "../../../app/config/constants.ts";
import {AxiosError} from "axios";

const {member} = defineProps({
  member: Object as PropType<IUser>
})

const companyStore = useCompanyStore()

const isShowingMenu = ref(false)
const isShowModalRole = ref(false)
const isShowModalRemove = ref(false)
const isLoading = ref(false)

const errorMessage = ref('')

const roles = reactive({
  value: member?.role ?? USER_STATUSES["0"],
  options: Object.values(USER_STATUSES),
})

const toggleShowMenu = () => isShowingMenu.value = !isShowingMenu.value

const edit = () => {
    isLoading.value = true
    errorMessage.value = ''
    companyStore.updateMemberById(member.id, {role: roles.value}).then(() => {
      isShowModalRemove.value = false
    })
        .catch((err: AxiosError<any>) => {
          if (err.response) {
            errorMessage.value = err.response.data.message
          }
        })
        .finally(() => isLoading.value = false)
}

const remove = () => {
  isLoading.value = true
  errorMessage.value = ''
  companyStore.removeMemberById(member.id).then(() => {
    isShowModalRemove.value = false
  })
      .catch((err: AxiosError<any>) => {
        if (err.response) {
          errorMessage.value = err.response.data.message
        }
      })
      .finally(() => isLoading.value = false)
}

</script>

<template>
  <app-ui-modal v-if="isShowModalRole" @close="isShowModalRole = false">
    <app-ui-select
        v-model="roles.value"
        :options="roles.options"
    />
    <div v-if="errorMessage" class="w-100 text-center">
      <span class="error">{{errorMessage}}</span>
    </div>
    <br v-else>
    <app-ui-button @click="edit" :is-loading="isLoading" :text="'Save'"/>
  </app-ui-modal>
  <app-ui-modal v-if="isShowModalRemove" @close="isShowModalRemove = false">
    <h4>Remove member?</h4>
    <div v-if="errorMessage" class="w-100 text-center">
      <span class="error">{{errorMessage}}</span>
    </div>
    <br v-else>
    <app-ui-button @click="remove" :is-loading="isLoading" :text="'Yes'"/>
  </app-ui-modal>
  <tr class="item">
    <td>{{ member.first_name }} {{member.last_name}}</td>
    <td>{{member.email}}</td>
    <td>{{member.role}}</td>
    <td>{{member.updated_at}}</td>
    <td>{{member.created_at}}</td>
    <td @click="toggleShowMenu" @focusout="isShowingMenu = false" tabindex="0" class="position-relative">
      <span class="fw-bold fs-5 cursor">...</span>
      <div v-if="isShowingMenu" class="setting_modal">
        <div @click="isShowModalRole = true">
          <span>Change role</span>
        </div>
        <div @click="isShowModalRemove = true">
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

.error {
  color: $error-red;
}

</style>