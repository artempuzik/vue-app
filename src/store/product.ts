import { defineStore } from 'pinia';
import {productApi} from '../app/api'
import {useAppStore} from "./";
import {ref} from "vue";

export default defineStore('product', () => {
  const categories = ref([])

  const appStore = useAppStore()
  const getProductCategories = () => productApi.getProductCategories(appStore.appConfig.Bearer_Auth).then((response) => {
      if(response.status === 200) {
        categories.value = response.data.categories
      }
    })
  const init = async () => {
    await getProductCategories()
  }

  return {
    categories,
    init,
  };
});
