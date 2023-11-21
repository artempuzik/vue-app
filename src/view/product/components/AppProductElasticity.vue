<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import {PropType, computed} from "vue";
import {ProductItem} from "../../../app/types";
import {mapProductElasticity} from "../../../app/helpers";
import AppUiSelect from "../../UI/AppUiSelect.vue";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
)

const props = defineProps({
  product: Object as PropType<ProductItem>
})



const chartData = computed(() => {
  const result = mapProductElasticity((props.product as ProductItem).elasticity.graph)
return {
  labels: result.labels,
  datasets: [
    {
      labels: '',
      borderColor: '#0500FF',
      backgroundColor: '#0500FF',
      data: result.data
    },
  ],
}})

</script>

<template>
      <div class="chart rounded p-2">
        <Line
            id="historyPrice"
            :options="{
        responsive: true,
        maintainAspectRatio: false
      }"
            :data="chartData"
        />
      </div>
</template>

<style scoped lang="scss">
.chart {
  flex: 1;
  display: block;
  height: 600px;
  background-color: white;
}
</style>