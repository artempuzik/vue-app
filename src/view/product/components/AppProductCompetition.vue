<script setup lang="ts">
import {computed} from "vue";

const props = defineProps(['red', 'green'])

const competition = computed(() => props.red /(props.red + props.green) * 100)

</script>

<template>
  <div class="w-100 d-flex flex-row align-items-center">
      <span class="me-1">
      {{red}}
      <span class="red">&#x2193;</span>
    </span>
    <div class="competition rounded">
      <div
          class="line rounded-start"
          :style="{
      width: `${competition}%`
        }"
      ></div>
    </div>
    <span class="ms-1">
      <span class="green">&#x2191;</span>
      {{green}}
    </span>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.competition {
  flex: 1;
  background-color: $green-blur;
  height: 10px;
}

.line {
  height: 100%;
  background-color: $error-red;
}

.green {
  color: $green-blur;
}

.red {
  color: $error-red;
}

</style>