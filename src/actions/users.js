import { LOGIN_SUCCESS } from "./types";
import { setToastNotification } from "../utils/helpers";
import axios from "../utils/axios";
import setAuthToken from "../utils/setAuthToken";

export const login = (username) => async (dispatch) => {
    try {
        if (!username) {
          return;
        }
        if (!window.hive_keychain) {
          return;
        }
        const ts = Date.now();

        window.hive_keychain.requestSignBuffer(
          username,
          `${username}${ts}`,
          "Posting",
          async (r) => {
            if (r.success) {
              const sig = r.result;
              await dispatch(processLogin(username, ts, sig));
              setToastNotification("Login Successfull", "success");
            } else {
              setToastNotification("Login Failed, try again", "error");
            }
          }
        );
    } catch (err) {
        console.log(err.message)
    }
}

export const processLogin = (username, ts, sig) => async (dispatch) => {
  const ref = localStorage.getItem("ref");

  try {
    const data = await axios.get("/auth/login", {
      params: { username, ts, sig, ref },
    });
    console.log(data.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.data,
    });
    setAuthToken(data.data.token);

    // TODO Login BeeChatter and Fetch Notifications
    // await dispatch('message/beeChatLogin', { username, ts, sig }, { root: true })
    // await dispatch('fetchNotifications')
  } catch (err) {
    console.log(err.message);
  }
};