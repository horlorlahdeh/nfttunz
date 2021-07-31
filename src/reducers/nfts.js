import { GET_BALANCES } from "../actions/types";

const initialState = {
  balances: [],
  loading: true,
};

const nftsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BALANCES:
      return {
        ...state,
        balances: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default nftsReducer;
