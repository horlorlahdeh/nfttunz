import { toast } from "react-toastify";

export const setToastNotification =  async (message, type) => {
  toast(message, {type});
}

export async function dataRequest(url, requestType, credentials, headers, formdata){ //removed referrer: "https://nfttunz.io/", referrerPolicy: "strict-origin-when-cross-origin",
  const response = formdata ? fetch(url, { method: requestType, mode: "cors", credentials: credentials, headers: headers, body: formdata,})
    : fetch(url, { method: requestType, mode: "cors", credentials: credentials, headers: headers,});
  return (await response).json();
}