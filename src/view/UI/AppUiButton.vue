<script setup lang="ts">
import {PropType} from "vue";

const emit = defineEmits(['click'])

const {isInActive, text, size} = defineProps({
  isInActive: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'large'|'normal'|'small'>,
    default: "normal"
  },
  text: String,
})

</script>

<template>
  <button
      @click="emit('click')"
      class="shadow border-radius"
      style="width: 100%; height: 100%; min-height: 40px;"
      :class="`${isInActive ? 'inactive' : 'active'} ${size}`"
  >
    {{text}}
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

.shadow {
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.border-radius {
  border-radius: $button-border-radius;
}

</style>