<script setup lang="ts">
defineProps(['role'])

</script>

<template>
  <div class="item_role">
    <span>{{role}}</span>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.item_role {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 98px;
  height: 31px;
  background-color: $blue-normal;
  color: $white-color;
  border-radius: $button-border-radius;
}

</style>