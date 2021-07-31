import { SET_PROFILE, GET_PROFILE } from "../actions/types";

const intialState = {
  profile: {},
  loading: true,
};

const profileReducer = (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default profileReducer;
