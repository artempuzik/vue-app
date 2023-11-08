<script setup lang="ts">
import {PropType, ref, reactive, computed} from 'vue';
import { IUser } from '../../../app/api/types/types.ts';
import { useCompanyStore, useUserStore, useAppStore } from '../../../store';
import AppUiModal from '../../UI/AppUiModal.vue';
import AppUiSelect from '../../UI/AppUiSelect.vue';
import AppUiButton from '../../UI/AppUiButton.vue';
import { AxiosError } from 'axios';
import {convertDate, getKeyByRoleValue} from "../../../app/helpers";
import toastAlert from "../../../app/helpers/toast.ts";
import AppMemberRole from "./AppMemberRole.vue";
import {useI18n} from "vue-i18n";

const { locale } = useI18n();

const props = defineProps({
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
  value: appStore.appConfig.roles[props.member?.role_id],
  options: Object.values(appStore.appConfig.roles) as string[]
});

const logged_at = computed(() => props.member.logged_at && convertDate(props.member.logged_at, locale.value))
const created_at = computed(() => props.member.created_at && convertDate(props.member.created_at, locale.value))


const toggleShowMenu = () => (isShowingMenu.value = !isShowingMenu.value);

const edit = () => {
  isLoading.value = true;
  errorMessage.value = '';
  userStore
    .updateMemberById(props.member.user_id, { role_id: +getKeyByRoleValue(appStore.appConfig.roles, roles.value), member_id: +props.member.user_id })
    .then(() => {
      isShowModalRole.value = false;
      toastAlert('Role changed', 'success', 2000)
    })
    .catch((err: AxiosError<any>) => {
      if (err.response) {
        isShowModalRole.value = false;
        // errorMessage.value = err.response.data.detail;
        toastAlert(err.response.data.detail, 'error', 2000)
      }
    })
    .finally(() => (isLoading.value = false));
};

const remove = () => {
  isLoading.value = true;
  errorMessage.value = '';
  companyStore
    .removeMemberById(props.member.user_id)
    .then(() => {
      isShowModalRemove.value = false;
      toastAlert('Success', 'success', 2000)
    })
    .catch((err: AxiosError<any>) => {
      if (err.response) {
        isShowModalRemove.value = false;
        // errorMessage.value = err.response.data.detail;
        toastAlert(err.response.data.detail, 'error', 2000)
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
    <td class="pe-2">
      <app-member-role :role="appStore.appConfig.roles[member.role_id]" />
    </td>
    <td>{{ logged_at }}</td>
    <td>{{ created_at }}</td>
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
  height: 65px;
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
  padding: 13px;
  border-radius: $input-border-radius;
  background-color: $white-color;
  border: 1px solid $grey-border;
  top: 30px;
  width: 169px;
  right: 25px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  z-index: 9999;

  div {
    padding: 13px;
    border-radius: $input-border-radius;
    cursor: pointer;

    &:hover {
      background-color: $blue-light-light;
    }
  }
}

td {
  padding: 10px 0 7px;
  border-bottom: 2px solid $grey-border;
}

.alert_color {
  color: $purple-normal;
}

.error {
  color: $error-red;
}
</style>
