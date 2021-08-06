import { SET_SETTINGS } from "../actions/types";

const intialState = {
  prefix: "",
  account: "",
  categories: "",
  currency: "",
  nft_symbol: "TUNES",
  nodes: [],
  maintenance: false,
  market_fee: 1000,
  sidechain_id: "ssc-mainnet-hive",
  sidechain_rpc: "https://api.hive-engine.com/rpc",
  token_issuance_base_fee: "",
  token_issuance_fee: 1,
};

const settingsReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SETTINGS:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
export default settingsReducer;
