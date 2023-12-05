<script setup lang="ts">
import {computed, PropType} from "vue";
import {History} from "../../../app/types";
import {convertDate} from "../../../app/helpers";
import {useI18n} from "vue-i18n";
import AppHistoryRole from "./AppHistoryRole.vue";
import AppUiCheckbox from "../../UI/AppUiCheckbox.vue";
import {useCompanyStore} from "../../../store";
import {useRouter} from "vue-router";

const { locale } = useI18n();

const router = useRouter()

const emit = defineEmits(['update:modelValue']);

const companyStore = useCompanyStore()

const props = defineProps({
  modelValue: {
    type: Array as PropType<number[]>,
    default: [] as number[],
  },
  history: {
    type: Object as PropType<History>,
    required: true,
  }
})

const checker = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const repricing_date = computed(() => props.history.repricing_date && convertDate(props.history.repricing_date, locale.value).split(', '));

const sku = computed(() => props.history.sku.replace('SKU', ''))
const old_price = computed(() => props.history.old_price.toFixed(2))
const new_price = computed(() => props.history.new_price.toFixed(2))
const made_by = computed(() => {
  const member = companyStore.companyMembers.find(m => m.user_id === props.history.made_by)
  if(member) {
    return `${member.name} ${member.surname}`
  }
  return ''
})

const clickToItemHandler = () => {
  router.push({
    name: 'product',
    params: {
      id: props.history?.product_id
    },
  })
}

</script>

<template>
  <tr @click="clickToItemHandler" class="item">
    <th style="width: 6%">
      <app-ui-checkbox v-model="checker" :value="history.product_id" :width="20"/>
    </th>
    <td style="width: 7%">{{ sku }}</td>
    <td style="width: 30%" class="py-1">
      <div class="w-100">
        <span>{{ history.product_name }}</span>
      </div>
      <div class="w-100 group">
        <span>{{ history.product_group }}</span>
      </div>
    </td>
    <td style="width: 10%">{{ old_price }}</td>
    <td style="width: 10%">{{ new_price }}</td>
    <td style="width: 10%" class="">
      <div class="w-100">
        <span>{{ repricing_date[0] }}</span>
      </div>
      <div class="w-100">
        <span>{{ repricing_date[1] }}</span>
      </div>
    </td>
    <td style="width: 16%">{{ made_by }}</td>
    <td style="width: 10%">
      <app-history-role :role="history.rule_id" />
    </td>
  </tr>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.item {
  height: 65px;
  cursor: pointer;
}

.group {
  font-size: 10px;
  font-weight: bold;
 }

td {
  padding: 0 5px;
}

</style>
