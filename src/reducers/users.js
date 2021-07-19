import { LOGIN_SUCCESS } from "../actions/types";

const initialState = {
    username: '',
    authenticated: false,
    loading: true,
    token: localStorage.getItem('token')
}
export const users = (state) => state;
export default function usersReducer(state = initialState, action) {
  const { payload, types } = action;
  switch (types) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        authenticated: true,
        loading: false
      };

    default:
      return state;
  }
}

