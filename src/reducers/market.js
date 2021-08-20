import {
  GET_MARKET,
  SET_INTERESTS,
  SET_MORE_INTERESTS,
  SET_PAGINATION,
} from '../actions/types';

const initialState = {
  market: [],
  interests: [],
  series: [],
  nfts: [],
  history: [],
  trades_history: [],
  search_results: [],
  pagination: {
    limit: 30,
    page: 0,
    sort_by: 'newest',
    rights: null,
    category: null,
    price_min: '',
    price_max: '',
    has_more: true,
  },
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
    case SET_MORE_INTERESTS:
      return {
        ...state,
        interests: payload,
        loading: false,
      };
    case SET_INTERESTS:
      return {
        ...state,
        interests: payload,
        loading: false,
      };
    case SET_PAGINATION:
      return {
        ...state,
        pagination: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default marketReducer;
