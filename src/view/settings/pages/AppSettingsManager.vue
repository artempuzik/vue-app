<script setup lang="ts">
import AppLayoutSettings from '../layout/AppLayoutSettings.vue';
import AppUiInput from '../../UI/AppUiInput.vue';
import AppUiSelect from '../../UI/AppUiSelect.vue';
import AppUiButton from '../../UI/AppUiButton.vue';
import AppMemberItem from '../components/AppMemberItem.vue';
import {reactive, ref, computed, onMounted} from 'vue';
import { useCompanyStore, useAppStore } from '../../../store';
import { IUser } from '../../../app/api/types/types.ts';
import { emailValidator } from '../../../app/helpers';
import toastAlert from '../../../app/helpers/toast.ts';
import { AxiosError } from 'axios';
import AppUiSpinner from "../../UI/AppUiSpinner.vue";

const companyStore = useCompanyStore();
const appStore = useAppStore();

const query = ref('');
const isModalHide = ref(true);
const isLoading = ref(false);
const isLoadingInvite = ref(false)

const inviteEmail = ref('');

const errorMessage = ref('');

const isValidEmail = computed(() => emailValidator(inviteEmail.value));

const members = computed(() =>
  companyStore.companyMembers.filter((member: IUser) => {
    if (appStore.appConfig.roles[member.role_id] === roles.value || roles.value === 'All roles') {
      return JSON.stringify(member).toLowerCase().includes(query.value.trim().toLowerCase());
    }
    return false;
  })
);

const sendInvite = () => {
  isLoadingInvite.value = true;
  errorMessage.value = '';
  companyStore
    .inviteMember(inviteEmail.value)
    .then(() => {
      isModalHide.value = true;
      inviteEmail.value = '';
      toastAlert('Invitation is sent', 'success', 2000)
    })
    .catch((err: AxiosError<any>) => {
      if (err.response) {
        // errorMessage.value = err.response.data.detail;
        toastAlert(err.response.data.detail, 'error', 2000)
      }
    })
    .finally(() => (isLoadingInvite.value = false));
};

const roles = reactive({
  value: 'All roles',
  options: ['All roles', ...Object.values(appStore.appConfig.roles)] as string[]
});

onMounted(() => {
  isLoading.value = true;
  errorMessage.value = '';
  companyStore.getMemberList()
    .then(() => {
    isModalHide.value = true;
    inviteEmail.value = '';
  })
      .catch((err: AxiosError<any>) => {
        if (err.response) {
          errorMessage.value = err.response.data.detail;
          toastAlert(err.response.data.detail, 'error', 2000)
        }
      })
      .finally(() => (isLoading.value = false));
})
</script>

<template>
  <app-layout-settings>
    <template #main>
      <app-ui-modal
        v-if="!isModalHide"
        @close="isModalHide = true"
      >
        <h4 class="main-text text-center">
          {{ $t('team.invite_text') }}
        </h4>
        <app-ui-input v-model="inviteEmail" />
        <div
          v-if="errorMessage"
          class="w-100 text-center"
        >
          <span class="error">{{ errorMessage }}</span>
        </div>
        <br v-else>
        <app-ui-button
          :is-in-active="!isValidEmail"
          :is-loading="isLoadingInvite"
          :text="$t('buttons.send')"
          @click="sendInvite"
        />
      </app-ui-modal>
      <div class="w-100 d-flex flex-column align-items-start p-4">
        <h3 class="category-title">
          {{ $t('team.title') }}
        </h3>
        <br>
        <div class="w-100 d-flex flex-row align-items-center justify-content-between">
          <div class="w-50 d-flex flex-row align-items-center justify-content-start">
            <app-ui-input
              v-model="query"
              class="w-100"
              :placeholder="$t('team.search_placeholder')"
              :with-icon="true"
            />
            <app-ui-select
              v-model="roles.value"
              class="ms-4 w-100"
              :options="roles.options"
            />
          </div>
          <app-ui-button
            style="width: 150px; height: 40px"
            :text="$t('buttons.invite_member')"
            @click="isModalHide = false"
          />
        </div>
        <br>
        <h3 class="category-title mb-3">
          {{ $t('team.members') }} ({{ members.length }})
        </h3>
        <div class="w-100 table_body">
          <div
              v-if="isLoading"
              class="d-flex h-100 flex-column align-items-center justify-content-center app_wrapper"
          >
            <app-ui-spinner />
          </div>
          <table v-else class="w-100">
            <thead>
              <tr class="table_header">
                <th scope="col">
                  {{ $t('team.name') }}
                </th>
                <th scope="col">
                  {{ $t('team.email') }}
                </th>
                <th scope="col">
                  {{ $t('team.role') }}
                </th>
                <th scope="col">
                  {{ $t('team.last_use') }}
                </th>
                <th scope="col">
                  {{ $t('team.created') }}
                </th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              <template
                v-for="member in members"
                :key="member.user_id"
              >
                <app-member-item :member="member" />
              </template>
            </tbody>
          </table>
        </div>
        <br>
      </div>
    </template>
  </app-layout-settings>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.table_header th {
  color: $grey-table_header;
}

.table_body {
  overflow-y: auto;
  padding: 5px 15px;
  height: 650px;
  border: 1px solid $grey-border;
  border-radius: $input-border-radius;
  background-color: $white-color;
}

.table_header {
  height: 80px;
}

tr {
  border-bottom: 2px solid $grey-border;
}

th {
  padding: 15px 0;
}

.error {
  color: $error-red;
}

.toast {
  color: $white-color;
  background-color: $purple-normal;
}
</style>
