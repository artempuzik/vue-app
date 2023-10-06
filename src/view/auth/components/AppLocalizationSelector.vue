<script setup>
import {computed, ref, watch} from "vue";
import {useI18n} from "vue-i18n";

const countryCodes = {
  'en': 'fi fi-gb',
  'esp': 'fi fi-es',
  'pl': 'fi fi-pl',
  'de': 'fi fi-de',
};

const {locale} = useI18n();

const selectedCountries = ref(locale.value);
const isShowFlags = ref(false)

const toggleIsShowFlags = () => isShowFlags.value = !isShowFlags.value;
const selectedFlag = (countryCode) => {
  selectedCountries.value = countryCode;
  isShowFlags.value = false;
};

const currentFlag = computed(() => countryCodes[selectedCountries.value]);
const flags = computed(() => Object.keys(countryCodes).reduce((filtered, key) => {
  if (key !== selectedCountries.value) {
    filtered[key] = countryCodes[key];
  }
  return filtered;
}, {}))

watch(selectedCountries, () => {
  locale.value = selectedCountries.value;
})

</script>

<template>
  <div class="country-selector">
    <div class="flag-img" tabindex="0" @focusout="isShowFlags = false">
      <span :class="currentFlag" @click="toggleIsShowFlags"></span>
      <div class="country-selector_flags">
        <div v-if="isShowFlags" class="flag-img m-1" v-for="(countryCode, key) in flags" :key="key">
          <span :class="countryCode" @click="selectedFlag(key)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.country-selector {
  position: absolute;
  right: 100px;
  bottom: 100px;
  z-index: 100;
}

.flag-img {
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 50%;
  border: 1px solid inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 2px 16px 2px rgba(0,0,0,0.36);
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 16px 2px rgba(0,0,0,0.66);
  }
}

.country-selector_flags {
  width: 50px;
  bottom: 50px;
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
}
</style>
