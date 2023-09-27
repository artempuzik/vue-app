<script setup lang="ts">
import {computed} from "vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  isInActive: {
    type: Boolean,
    default: false
  },
  placeholder: {
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
  <div class="d-flex flex-row align-items-center m-1 position-relative">
    <img v-if="withIcon" class="icon" :class="{'inactive': isInActive}" src="../../assets/svg/search.svg" width="24" height="24">
    <input
        style="width: 100%; height: 100%;"
        :placeholder="placeholder"
        class="app_input"
        :disabled="isInActive"
        :class="{'active': !isInActive, 'inactive': isInActive, 'with_icon': withIcon}"
        type="text"
        v-model="value"
    />
  </div>

</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.app_input {
  padding: 10px 12px;
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