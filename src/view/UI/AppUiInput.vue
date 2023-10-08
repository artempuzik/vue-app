<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  isInActive: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  withIcon: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  }
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>

<template>
  <div class="w-100 d-flex flex-column align-items-start">
    <label
      v-if="label"
      class="mb-1 main-text"
    >{{ label }}</label>
    <div class="w-100 d-flex flex-row align-items-center position-relative">
      <img
        v-if="withIcon"
        class="icon"
        :class="{ inactive: isInActive }"
        src="../../assets/svg/search.svg"
        width="24"
        height="24"
      >
      <input
        v-model.trim="value"
        style="width: 100%"
        :placeholder="placeholder"
        class="app_input"
        :disabled="isInActive"
        :class="{
          active: !isInActive,
          inactive: isInActive || !value,
          with_icon: withIcon
        }"
        type="text"
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.app_input {
  height: 50px;
  border-style: solid;
  padding: 10px 12px;
  border-width: 1px;
  border-radius: $input-border-radius;
  background-color: $white-color;
  &::placeholder {
    color: $placeholder;
    opacity: 1;
  }
}

.active {
  border-color: $black-color;
  &:focus {
    outline: none !important;
    border-color: $black-color;
  }
}

.inactive {
  border-color: $grey-border;
  &:focus {
    outline: none !important;
    border-color: $grey-border;
  }
}

.icon {
  position: absolute;
  left: 5px;
  width: 25px;
  height: 25px;

  &.inactive {
    filter: invert(63%) sepia(0%) saturate(319%) hue-rotate(167deg) brightness(96%) contrast(91%);
  }
}

.with_icon {
  padding-left: 35px;
}
</style>
