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
import {mapPriceHistory} from "../../../app/helpers";

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
  const result = mapPriceHistory((props.product as ProductItem).price_history.graph)
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
  <div class="chart">
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
  display: block;
  height: 300px;
}
</style>