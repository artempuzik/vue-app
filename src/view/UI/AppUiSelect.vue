<script setup lang="ts">
import { computed, PropType, ref } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array as PropType<string[]>,
    default: () => []
  }
});

const isOpen = ref(false);

const toggleSelect = () => (isOpen.value = !isOpen.value);

const selectValue = (v: string) => (value.value = v);

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
    <div
      class="w-100 d-flex flex-row align-items-center m-1 position-relative app_select"
      tabindex="0"
      @click="toggleSelect"
      @focusout="isOpen = false"
    >
      <div class="w-100 d-flex flex-column align-items-start justify-content-center px-2">
        <span v-if="placeholder && !value" style="opacity: 0.5">{{ placeholder }}</span>
        <span v-else>{{ value }}</span>
      </div>
      <img
        src="../../assets/svg/chevron.svg"
        :class="{ rotate: isOpen }"
      >
      <div
        v-if="isOpen"
        class="app_select_modal shadow"
      >
        <div
          v-for="option in options"
          :key="option"
          @click="selectValue(option)"
        >
          <span>{{ option }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.app_select {
  padding: 5px 5px;
  min-height: 50px;
  border-radius: $input-border-radius;
  background-color: $white-color;
  border: 1px solid $grey-app;
  cursor: pointer;
}

.app_select_modal {
  position: absolute;
  padding: 9px 9px;
  background-color: $white-color;
  border-radius: $button-border-radius;
  left: -1px;
  top: 60px;
  width: 100%;
  z-index: 9999;

  div {
    padding: 13px;
    border-radius: $input-border-radius;
    cursor: pointer;

    &:hover {
      background-color: $blue-light-light;
      color: $purple-light;
    }
  }
}

.shadow {
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.active {
  border-color: $black-color;

  &:focus {
    outline: none !important;
    border-color: $black-color;
  }
}

.rotate {
  transform: rotate(180deg);
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
