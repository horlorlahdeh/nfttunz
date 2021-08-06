import {
  GET_BALANCES,
  GET_NFT_DEFINITION,
  GET_NFT_INSTANCES,
} from "../actions/types";

const initialState = {
  balances: [],
  nfts: [],
  instances: [],
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
    case GET_NFT_DEFINITION:
      return {
        ...state,
        nfts: payload,
        loading: false,
      };
    case GET_NFT_INSTANCES:
      return {
        ...state,
        instances: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default nftsReducer;
