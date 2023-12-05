<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip, Tick,
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
  yLabels: result.labels,
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
  <div class="chart p-2 py-4">
    <div class="w-100">
      <span class="ms-4 category-title">Price History</span>
    </div>
    <Line
        id="historyPrice"
        :options="{
        responsive: true,
        maintainAspectRatio: false,
         scales: {
            y: {
                ticks: {
                  //@ts-ignore
                    callback: (tickValue: string | number, index: number, ticks: Tick[]) =>  tickValue +'$'
                }
            }
        }
      }"
        :data="chartData"
    />
  </div>
</template>

<style scoped lang="scss">
.chart {
  height: 365px;
  width: 100%;
  max-width: 740px;
  min-width: 240px;
  background-color: white;
}

#historyPrice {
  height: 300px !important;
}
</style>