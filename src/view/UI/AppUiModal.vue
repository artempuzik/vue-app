<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: '450px'
  }
});
const emit = defineEmits(['close']);
</script>

<template>
  <Teleport to="#app">
    <div
      class="modal_wrapper"
      @click.self="emit('close')"
    >
      <div
        class="modal_body shadow d-flex flex-column align-items-center justify-content-center"
        :style="{ width: width }"
      >
        <div class="w-100 d-flex flex-row align-items-center justify-content-end">
          <span
            class="close"
            @click="emit('close')"
          >&times;</span>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.modal_wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal_body {
  background-color: $white-color;
  border-radius: $button-border-radius;
  margin: 15% auto;
  padding: 0 10px 10px;
  border: 1px solid $grey-border;
  min-width: 350px;
  max-width: 600px;
}

.shadow {
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  :focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
