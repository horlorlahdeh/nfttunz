import { toast } from "react-toastify";

export const setToastNotification =  async (message, type) => {
  toast(message, {type});
}

export const toFixedWithoutRounding = (t, l = 3) => {
  const a = 10 ** l
  const s = t * a
  return Math.trunc(s) / a
}