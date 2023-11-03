import {toast, ToastType} from "vue3-toastify";

const toastAlert = (text: string, type: ToastType, time: number) => {
    toast(text, {
        autoClose: time,
        type: type,
    })
}

export default toastAlert