<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ""
  },
  value: {
    type: String,
    default: ""
  },
  sub: {
    type: String,
    default: ""
  },
})

</script>

<template>
  <div class="border border-1 rounded forecast">
    <div class="border-bottom border-1 px-1">
      <span class="title">{{title}}</span>
    </div>
    <div class="mt-1 w-100 text-center">
      <span>{{value}}</span>
    </div>
    <div class="w-100 text-end sub">
      <span>{{sub}}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/variables.scss';

.forecast {
  width: 90px;
  height: 90px;
  background-color: $white-color;
  padding: 7px;
}

.title {
  font-size: 10px;
  color: $black-color;
}

.sub {
  height: 12px;
  font-size: 10px;
  color: $green-blur;
}

</style>