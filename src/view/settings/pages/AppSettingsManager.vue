<script setup lang="ts">
import AppLayoutSettings from "../layout/AppLayoutSettings.vue";
import AppUiInput from "../../UI/AppUiInput.vue";
import AppUiSelect from "../../UI/AppUiSelect.vue";
import AppUiButton from "../../UI/AppUiButton.vue";
import {reactive, ref} from "vue";
import {USER_STATUSES} from "../../../app/config/constants.ts";
import AppMemberItem from "../components/AppMemberItem.vue";

const query = ref('')

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
          <app-ui-button style="width: 150px" :text="'+ Invite Member'"/>
        </div>
        <br>
        <h3 class="category-title">Members {{'6'}}</h3>
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
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />
            <app-member-item />

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
  max-height: 650px;
}

</style>