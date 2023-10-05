<script setup lang="ts">
import AppLayoutSettings from "../layout/AppLayoutSettings.vue";
import AppUiInput from "../../UI/AppUiInput.vue";
import AppUiSelect from "../../UI/AppUiSelect.vue";
import AppUiButton from "../../UI/AppUiButton.vue";
import AppMemberItem from "../components/AppMemberItem.vue";
import {reactive, ref, computed} from "vue";
import {USER_STATUSES} from "../../../app/config/constants.ts";
import {useCompanyStore} from "../../../store";
import {IUser} from "../../../app/api/types.ts";

const companyStore = useCompanyStore()

const query = ref('')
const isModalHide = ref(true)
const isLoading = ref(false)

const inviteEmail = ref('')

const members = computed(() => companyStore.companyMembers.filter((member: IUser) => {
  if(member.role === roles.value || roles.value === 'All roles') {
    return JSON.stringify(member).includes(query.value.trim())
  }
  return false;
}))

const sendInvite = () => {
  isLoading.value = true
  companyStore.inviteMember(inviteEmail.value).then(() => {
    isModalHide.value = true
    inviteEmail.value = ''
  })
      .finally(() => isLoading.value = false)

}

companyStore.getMemberListByCompanyId()

const roles = reactive({
  value: 'All roles',
  options: ['All roles', ...Object.values(USER_STATUSES)] as string[],
})

</script>

<template>
  <app-layout-settings>
    <template #header>
      <app-ui-header/>
    </template>
    <template #main>
      <app-ui-modal v-if="!isModalHide" @close="isModalHide = true">
        <h4 class="main-text text-center">Please enter the user's email for invitation</h4>
        <app-ui-input v-model="inviteEmail"/>
        <br />
        <app-ui-button @click="sendInvite" :is-in-active="!inviteEmail" :is-loading="isLoading" :text="'Send email'"/>

      </app-ui-modal>
      <div class="w-100 d-flex flex-column align-items-start p-4">
        <h3 class="category-title">Team management</h3>
        <br>
        <div class="w-100 d-flex flex-row align-items-center justify-content-between">
          <div class="w-50 d-flex flex-row align-items-center justify-content-start">
            <app-ui-input
                class="w-100"
                v-model="query"
                :placeholder="'Search for member ...'"
                :with-icon="true"
            />
            <app-ui-select
                style="max-width: 200px;"
                class="ms-4"
                v-model="roles.value"
                :options="roles.options"
            />
          </div>
          <app-ui-button @click="isModalHide = false" style="width: 150px" :text="'+ Invite Member'"/>
        </div>
        <br>
        <h3 class="category-title">Members {{members.length}}</h3>
        <div class="w-100 table_body">
          <table class="table">
            <thead>
            <tr class="table_header">
              <th scope="col">Name, Surname</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Last use</th>
              <th scope="col">Created</th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <template v-for="member in members">
              <app-member-item :member="member"/>
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
  overflow-y: scroll;
  height: 650px;
}

</style>