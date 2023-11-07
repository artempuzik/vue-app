<script setup lang="ts">
defineProps(['role'])

</script>

<template>
  <div class="item">
    <span>{{role}}</span>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 98px;
  height: 31px;
  background-color: $blue-light-light;
  color: $blue-normal;
  border-radius: $button-border-radius;
}

</style>