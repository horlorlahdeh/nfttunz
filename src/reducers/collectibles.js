import { GET_COLLECTIBLES } from "../actions/types";

const intialState = {
  collectibles: [],
  collectible: null,
  loading: true
};

export const collectiblesReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COLLECTIBLES:
      return {
        ...state,
        collectibles: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default collectiblesReducer;
