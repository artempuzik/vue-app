<script setup lang="ts">
import { computed, ref } from 'vue';

const emit = defineEmits(['update:modelValue', 'enter', 'escape']);

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
    type: [String, Number],
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

const isFocused = ref(false)

const setIsFocused = (value: boolean) => isFocused.value = value;

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
        loading="lazy"
        :class="{ inactive: isInActive }"
        :style="{ opacity: value || isFocused ? 1 : 0.5}"
        src="../../assets/png/search-black.png"
        width="20"
      >
      <input
        v-model.trim="value"
        @focusin="setIsFocused(true)"
        @focusout="setIsFocused(false)"
        @keydown.enter="emit('enter')"
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
  min-height: 50px;
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
  padding: 2px 2px 4px 2px;
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
