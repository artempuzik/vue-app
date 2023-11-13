<script setup lang="ts">
import {computed, PropType} from "vue";

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  id: String,
  value: Number,
  width: {
    type: Number,
    default: 16
  },
  modelValue: {
    type: Array as PropType<number[]>,
    default: [] as number[],
  },
})

const state = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

</script>

<template>
  <input
      class="form-check-input"
      v-model="state"
      :style="{width: `${width}px`, height: `${width}px`}"
      :value="value"
      type="checkbox" :id="id">
</template>

<style scoped lang="scss">
@import '../../styles/variables.scss';

input[type="checkbox"] {
  box-shadow:none !important;
}

input[type="checkbox"]:focus {
  border-color: $grey-border;
}

</style>