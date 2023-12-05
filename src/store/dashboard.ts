import { defineStore } from 'pinia';
import {dashboardApi} from '../app/api'
import {useAppStore} from "./";
import {Ref, ref} from "vue";
import {Product} from "../app/types";

export default defineStore('dashboard', () => {
  const appStore = useAppStore()
  const isPageLoading = ref(false)

  const best: Ref<Product[]> = ref([])
  const expires: Ref<Product[]> = ref([])
  const last_viewed: Ref<Product[]> = ref([])
  const need_action: Ref<Product[]> = ref([])
  const overview: Ref<Product[]> = ref([])
  const potentials: Ref<Product[]> = ref([])
  const started_product: Ref<Product[]> = ref([])
  const last_auto_repriced: Ref<Product[]> = ref([])
  const last_manual_repriced: Ref<Product[]> = ref([])

  const getDashboard = () => dashboardApi.getDashboard(appStore.appConfig.Bearer_Auth).then((response) => {
    if(response.status === 200) {
      best.value = response.data.best
      last_viewed.value = response.data.last_viewed
      expires.value = response.data.expires
      need_action.value = response.data.need_action
      overview.value = response.data.overview
      potentials.value = response.data.potentials
      started_product.value = response.data.started_product
      last_auto_repriced.value = response.data.last_auto_repriced
      last_manual_repriced.value = response.data.last_manual_repriced
    }
  })

  const init = async () => {
    isPageLoading.value = true;
    await getDashboard().finally(() => {
      isPageLoading.value = false;
    })
  }

  return {
    init,
    isPageLoading,
    best,
    last_viewed,
    expires,
    need_action,
    overview,
    potentials,
    started_product,
    last_auto_repriced,
    last_manual_repriced,
  };
});
