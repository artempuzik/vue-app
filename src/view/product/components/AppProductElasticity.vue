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
  const pointBackgroundColor = result.labels.map(point => {
    if(point === `${props.product?.elasticity.recommended_price}$`) {
      return '#0500FF'
    }
    if(point === `${props.product?.elasticity.actual_price}$`) {
      return '#ff0026'
    }
    return '#000000'
  })
  const pointRadius = result.labels.map(point => {
    if(point === `${props.product?.elasticity.recommended_price}$`) {
      return 10
    }
    if(point === `${props.product?.elasticity.actual_price}$`) {
      return 10
    }
    return 4
  })
return {
  labels: result.labels,
  datasets: [
    {
      labels: '',
      borderColor: '#000000',
      backgroundColor: '#000000',
      data: result.data,
      pointBackgroundColor,
      pointRadius,
    },
  ],
}})

</script>

<template>
      <div class="chart rounded p-2">
        <Line
            id="elasticity"
            :options="{
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
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
              }
           }
        },
      }"
            :data="chartData"
        />
      </div>
</template>

<style scoped lang="scss">
.chart {
  flex: 1;
  display: block;
  height: 100%;
  max-height: 650px;
  background-color: white;
  overflow: hidden;
}

.canvas { border-radius: 16px; }
</style>