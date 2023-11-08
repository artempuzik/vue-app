<script setup lang="ts">
</script>

<template>
  <div class="w-100 static-block">
    <h2 class="second-title text-start static-block_title_margin">
      Absolutely new vision of making pricing in my business!
    </h2>
    <div
      class="w-100 d-flex flex-row align-items-center justify-content-between"
      style="max-width: 800px"
    >
      <div class="w-50 d-flex flex-column align-items-start">
        <h3 class="category-title">
          - Dirk Burger
        </h3>
        <h4 class="main-text fw-light">
          CEO, any-lamp.com
        </h4>
      </div>
      <div class="w-50 d-flex flex-row align-items-start justify-content-center">
        <img
          src="../../../assets/svg/star.svg"
          width="25"
        >
        <img
          src="../../../assets/svg/star.svg"
          width="25"
        >
        <img
          src="../../../assets/svg/star.svg"
          width="25"
        >
        <img
          src="../../../assets/svg/star.svg"
          width="25"
        >
        <img
          src="../../../assets/svg/star.svg"
          width="25"
        >
      </div>
    </div>
    <div class="w-100 d-flex flex-row justify-content-end">
      <div class="static-block_img"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.static-block {
  padding: 0 0 0 44px;
  overflow: hidden;
  &_title_margin {
    margin: 0px 0px 44px;
  }

  &_img {
    width: 100%;
    height: 514px;
    margin: 87px 0 0 0;
    background-image: url("../../../assets/png/auth_image.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
    @media screen and (max-width: 1200px) {
      width: 90%;
      height: 35vh;
    }
  }
}
</style>
