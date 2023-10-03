<script setup lang="ts">
import {computed} from "vue";
import {bottom} from "@popperjs/core";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  isError: {
    type: Boolean,
    default: false
  },
  isInActive: {
    type: Boolean,
    default: false
  },
  isPassword: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
})

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

</script>

<template>
  <div class="w-100 d-flex flex-column align-items-start m-1">
    <label v-if="label" class="mb-1 main-text">{{ label }}</label>
    <input
        style="width: 100%; height: 100%;"
        :placeholder="placeholder"
        class="app_input"
        :disabled="isInActive"
        :class="{'error': isError, 'active': !isInActive, 'inactive': isInActive}"
        :type="!isPassword ? 'text' : 'password'"
        :style="{marginBottom: isError ? '0px' : '28px'}"
        v-model="value"
    />
    <span v-if="isError" class="error_text mt-1 mb-1">{{errorMessage}}</span>
  </div>

</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.app_input {
  padding: 10px 12px;
  border-radius: $input-border-radius;
  border-width: .7px;
  &::placeholder {
    color: $placeholder;
    opacity: 1;
  }
}

.error_text {
  color: $error-red;
}

.active {
  border-color: $grey-border;
  &:focus {
    outline: none !important;
    border-color: $purple-normal;
  }

  &.error {
    border-width: 1px;
    border-color: $error-red;
    background: $error-bg;
  }
}

.inactive {
  border-color: $grey-border;
  &:focus {
    outline: none !important;
    border-color: $grey-border;
  }
}

</style>