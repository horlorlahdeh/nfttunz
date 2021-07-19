import { LOGIN_SUCCESS } from "../actions/types";

const initialState = {
    username: '',
    authenticated: false,
}
export const users = (state) => state;
export default function usersReducer(state = initialState, action) {
  const { payload, types } = action;
  switch (types) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: payload.data,
      };

    default:
      return state;
  }
}

