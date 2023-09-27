<script setup lang="ts">
import {computed} from "vue";

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
  placeholder: {
    type: String,
    default: ''
  },
  errorMessage: {
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
  <div class="d-flex flex-column align-items-start m-1">
    <input
        style="width: 100%; height: 100%;"
        :placeholder="placeholder"
        class="app_input"
        :disabled="isInActive"
        :class="{'active': !isInActive, 'inactive': isInActive}"
        type="text"
        v-model="value"
    />
    <span v-if="isError" class="error_text mt-2 mb-1">{{errorMessage}}</span>
  </div>

</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.app_input {
  padding: 3px 10px;
  border-radius: $input-border-radius;
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

</style>