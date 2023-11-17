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
  <div class="w-100 my-4">
    <div class="w-100">
      <div class="w-100 d-flex flex-row align-items-center justify-content-start my-3">
        <span class="fw-bolder me-2">Choose your platform</span>
        <div style="width: 200px">
          <app-ui-select />
        </div>
      </div>
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart {
  display: block;
  height: 600px;
  background-color: white;
}
</style>