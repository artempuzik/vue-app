<script setup lang="ts">

</script>

<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.spinner {
  background: $white-color;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
}

.spinner-container {
  background: conic-gradient($white-color, $blue-normal);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>