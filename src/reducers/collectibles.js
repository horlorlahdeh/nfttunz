import {
  GET_COLLECTIBLE,
  GET_COLLECTIBLES,
  GET_USER_COLLECTIBLES,
} from '../actions/types';

const intialState = {
  collectibles: [],
  user_collectible: [],
  collectible: null,
  loading: true,
};

export const collectiblesReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COLLECTIBLES:
      return {
        ...state,
        collectibles: payload,
        loading: false,
      };
    case GET_USER_COLLECTIBLES:
      return {
        ...state,
        user_collectibles: payload,
        loading: false,
      };
    case GET_COLLECTIBLE:
      return {
        ...state,
        collectible: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default collectiblesReducer;
