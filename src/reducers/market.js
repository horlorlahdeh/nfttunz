import { GET_MARKET } from '../actions/types';

const initialState = {
  market: [],
  loading: true,
};

export const marketReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MARKET:
      return {
        ...state,
        market: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default marketReducer;
