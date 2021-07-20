import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_LOADING,
  SET_USER,
} from "../actions/types";

const initialState = {
  username: "",
  authenticated: false,
  loading: true,
  token: localStorage.getItem("token"),
  smartLock: false
};
// export const users = (state) => state;
export default function usersReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case SET_USER:
      return {
        ...state,
        ...payload,
        authenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("username", payload.username);
      return {
        ...state,
        ...payload,
        authenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return {
        ...state,
        token: null,
        authenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
