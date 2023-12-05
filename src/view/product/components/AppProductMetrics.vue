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
    <div class="w-100 mb-3 pb-2">
      <span class="ms-4 category-title">Key Metrics Overview</span>
    </div>
    <Line
        id="metrics"
        :options="{
        responsive: true,
        maintainAspectRatio: false,
        //@ts-ignore
        cubicInterpolationMode : 'monotone',
        scales: {
          x: {
              grid: {
              lineWidth: 0,
              }
           },
          y: {
              grid: {
              lineWidth: 0,
              },
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
  display: block;
  height: 300px;
}

#metrics {
  height: 250px !important;
}
</style>