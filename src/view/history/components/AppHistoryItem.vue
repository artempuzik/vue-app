<script setup lang="ts">
import {computed, PropType} from "vue";
import {History} from "../../../app/types";
import {convertDate} from "../../../app/helpers";
import {useI18n} from "vue-i18n";
import AppHistoryRole from "./AppHistoryRole.vue";

const { locale } = useI18n();

const props = defineProps({
  history: {
    type: Object as PropType<History>,
    required: true,
  }
})

const repricing_date = computed(() => props.history.repricing_date && convertDate(props.history.repricing_date, locale.value))

const sku = computed(() => props.history.sku.replace('SKU', ''))
const old_price = computed(() => props.history.old_price.toFixed(2))
const new_price = computed(() => props.history.new_price.toFixed(2))
// const made_by = computed(() => props.history.new_price.toFixed(2))


</script>

<template>
  <tr class="item">
    <td style="width: 7%">{{ sku }}</td>
    <td style="width: 33%" class="py-1">
      <div class="w-100">
        <span>{{ history.product_name }}</span>
      </div>
      <div class="w-100 group">
        <span>{{ history.product_group }}</span>
      </div>
    </td>
    <td style="width: 10%">{{ old_price }}</td>
    <td style="width: 10%">{{ new_price }}</td>
    <td style="width: 15%">{{ repricing_date }}</td>
    <td style="width: 15%">{{ history.made_by }}</td>
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
