<script setup lang="ts">
import { PropType } from 'vue';

const emit = defineEmits(['click']);

const { isInActive, text, size } = defineProps({
  isInActive: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'large' | 'normal' | 'small'>,
    default: 'normal'
  },
  text: {
    type: String,
    default: ''
  },
});
</script>

<template>
  <button
    class="border-radius"
    :disabled="isInActive"
    style="width: 100%; height: 100%; height: 55px"
    :class="`${isInActive ? 'inactive' : 'active'} ${size}`"
    @click="emit('click')"
  >
    <span
      v-if="isLoading"
      class="spinner-border text-secondary"
      style="width: 25px; height: 25px;"
      role="status"
    />
    <span v-else>{{ text }}</span>
  </button>
</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.large {
  color: $white-color;
  font-weight: bold;
  border: none;

  &.active {
    background-color: $purple-light;
    &:active {
      background-color: $purple-normal;
    }
  }
  &.inactive {
    background-color: $grey-app;
    border: 1px solid $black-color;
  }
}

.normal {
  color: $white-color;
  font-weight: bold;
  border: none;

  &.active {
    background-color: $blue-dark;
    &:active {
      background-color: $blue-normal;
    }
  }
  &.inactive {
    background-color: $grey-app;
  }
}

.small {
  color: $blue-normal;
  font-weight: normal;
  border: none;

  &.active {
    background-color: $blue-dark-light;
    &:active {
      background-color: $blue-light-light;
    }
  }
  &.inactive {
    background-color: $white-color;
  }
}

.border-radius {
  border-radius: $button-border-radius;
}
</style>
