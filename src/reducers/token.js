import { MINT_TOKEN } from "../actions/types";

const initialState = {};

const tokenReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MINT_TOKEN:
      return {
        ...state,
        ...payload,
      };

    default:
      return state
  }
};

export default tokenReducer;
