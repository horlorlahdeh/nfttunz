import { toast } from "react-toastify";
import axios from "./axios";

export const setToastNotification = async (message, type) => {
  toast(message, { type });
};

export const toFixedWithoutRounding = (t, l = 3) => {
  const a = 10 ** l;
  const s = t * a;
  return Math.trunc(s) / a;
};

export const uploadFile = async (file, type) => {
  try {
    var percentage;
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: function (progressEvent) {
        var percentCompleted = parseInt(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        percentage = percentCompleted;
      },
    };
    const data_upload = new FormData();
    data_upload.append("file", file);
    data_upload.append("type", type);
    const data = await axios.post("/upload", data_upload, config);
    if(!data) {
      setToastNotification('Unsurpported file type', 'error')
      return {}
    }
    const obj = {
      data: data.data,
      progress: percentage,
    };
    return obj;
  } catch (err) {
    console.log(err.message);
  }
};

export const arrayChunk = (array, size = 20) => {
  const chunkedArray = [];
  let index = 0;

  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index));
    index += size;
  }

  return chunkedArray;
};