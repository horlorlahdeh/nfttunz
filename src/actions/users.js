import { LOGIN_SUCCESS, AUTH_ERROR, SET_USER, LOGOUT, GET_NOTIFICATIONS, READ_NOTIFICATIONS } from "./types";
import { setToastNotification } from "../utils/helpers";
import axios from "../utils/axios";
import setAuthToken from "../utils/setAuthToken";

const config = {
  headers: {
    'Content-Type': 'application/json',
   
  },
};

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

export const loadUser = () => async (dispatch) => {
  try {
    const username = localStorage.getItem("username");

    let data = await axios.get(
      "/auth/me",
      { params: { username } },
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: SET_USER,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    console.log(err.message);
  }
};



export const logout = () => async dispatch => {
  dispatch({type: LOGOUT})
}

export const getNotifications = () => async dispatch => {
  try {
    const data = await axios.get('/users/notifications');
    console.log('notifications', data.data)
    const filteredData = data.data.filter(d => d.read === false);
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: filteredData
    })
  } catch (err) {
  console.log(err.message);
  }
}
export const readNotifications = (id) => async dispatch => {
  try {
    const ids = [];
    ids.push(id);
    console.log(ids);
    const data = await axios.post('/users/notifications', {ids: ids});
    console.log('notifications', data.data)
    
    dispatch({
      type: READ_NOTIFICATIONS,
      payload: data.data
    })
  } catch (err) {
  console.log(err.message);
  }
}



