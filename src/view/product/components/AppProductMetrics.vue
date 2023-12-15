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
import {PropType, computed, ref} from "vue";
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

const activeIndex = ref(0)

const chartData = computed(() => {
  const result = mapPriceHistory((props.product as ProductItem).price_history.graph)
return {
  labels: result.labels,
  datasets: [
    {
      labels: '',
      borderColor: '#000000',
      backgroundColor: '#000000',
      data: result.data
    },
  ],
}})

const tabs = ['product.profit', 'product.revenue', 'product.sales', 'product.margin', 'product.traffic']

</script>

<template>
  <div class="chart">
    <div class="w-100 pb-1">
      <span class="ms-4 category-title">{{$t('product.metric')}}</span>
    </div>
    <div class="my-1 d-flex flex-row align-items-center justify-content-start position-relative mb-3">
      <template v-for="(tab, index) in tabs" :key="index">
        <span @click="activeIndex = index" class="category" :class="{active: activeIndex === index}">{{ $t(tab) }}</span>
      </template>
      <div class="w-100 border"></div>
    </div>
    <Line
        id="metrics"
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
@import '../../../styles/variables.scss';

.chart {
  display: block;
  height: 320px;
}

#metrics {
  height: 250px !important;
}

.category {
  color: $placeholder;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: $black-color;
  };
}
.border {
  position: absolute;
  bottom: 1px;
}
.active {
  color: $black-color;
  font-weight: bolder;
  border-bottom: 4px solid $blue-normal;
  z-index: 2;
}
</style>
