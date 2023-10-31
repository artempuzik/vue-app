<script setup lang="ts">
import { PropType, ref, reactive } from 'vue';
import { IUser } from '../../../app/api/types/types.ts';
import { useCompanyStore, useUserStore, useAppStore } from '../../../store';
import AppUiModal from '../../UI/AppUiModal.vue';
import AppUiSelect from '../../UI/AppUiSelect.vue';
import AppUiButton from '../../UI/AppUiButton.vue';
import { AxiosError } from 'axios';
import {getKeyByRoleValue} from "../../../app/helpers";

const { member } = defineProps({
  member: {
    type: Object as PropType<IUser>,
    required: true
  }
});

const companyStore = useCompanyStore();
const userStore = useUserStore();
const appStore = useAppStore();

const isShowingMenu = ref(false);
const isShowModalRole = ref(false);
const isShowModalRemove = ref(false);
const isLoading = ref(false);

const errorMessage = ref('');

const roles = reactive({
  value: appStore.appConfig.roles[member?.role_id],
  options: Object.values(appStore.appConfig.roles) as string[]
});

const toggleShowMenu = () => (isShowingMenu.value = !isShowingMenu.value);

const edit = () => {
  isLoading.value = true;
  errorMessage.value = '';
  userStore
    .updateMemberById(member.user_id, { role_id: +getKeyByRoleValue(appStore.appConfig.roles, roles.value) })
    .then(() => {
      isShowModalRemove.value = false;
    })
    .catch((err: AxiosError<any>) => {
      if (err.response) {
        errorMessage.value = err.response.data.message;
      }
    })
    .finally(() => (isLoading.value = false));
};

const remove = () => {
  isLoading.value = true;
  errorMessage.value = '';
  companyStore
    .removeMemberById(member.user_id)
    .then(() => {
      isShowModalRemove.value = false;
    })
    .catch((err: AxiosError<any>) => {
      if (err.response) {
        errorMessage.value = err.response.data.message;
      }
    })
    .finally(() => (isLoading.value = false));
};
</script>

<template>
  <app-ui-modal
    v-if="isShowModalRole"
    @close="isShowModalRole = false"
  >
    <app-ui-select
      v-model="roles.value"
      :options="roles.options"
    />
    <div
      v-if="errorMessage"
      class="w-100 text-center"
    >
      <span class="error">{{ errorMessage }}</span>
    </div>
    <br v-else>
    <app-ui-button
      :is-loading="isLoading"
      :text="'Save'"
      @click="edit"
    />
  </app-ui-modal>
  <app-ui-modal
    v-if="isShowModalRemove"
    @close="isShowModalRemove = false"
  >
    <h4>{{ $t('team.remove_member') }}</h4>
    <div
      v-if="errorMessage"
      class="w-100 text-center"
    >
      <span class="error">{{ errorMessage }}</span>
    </div>
    <br v-else>
    <app-ui-button
      :is-loading="isLoading"
      :text="'Yes'"
      @click="remove"
    />
  </app-ui-modal>
  <tr class="item">
    <td>{{ member.name }} {{ member.surname }}</td>
    <td>{{ member.email }}</td>
    <td>{{ appStore.appConfig.roles[member.role_id] }}</td>
    <td>{{ member.logged_at }}</td>
    <td>{{ member.created_at }}</td>
    <td
      tabindex="0"
      class="position-relative"
      @click="toggleShowMenu"
      @focusout="isShowingMenu = false"
    >
      <span class="fw-bold fs-5 cursor">...</span>
      <div
        v-if="isShowingMenu"
        class="setting_modal"
      >
        <div @click="isShowModalRole = true">
          <span>{{ $t('buttons.change_role') }}</span>
        </div>
        <div @click="isShowModalRemove = true">
          <span class="warning">{{ $t('buttons.delete') }}</span>
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
