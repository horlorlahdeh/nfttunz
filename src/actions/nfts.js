import axios from "axios";
import instance from '../utils/axios'
import store from "../store";
import { GET_BALANCES } from "./types";
const sidechain_rpc = async () => await (await instance.get('/settings')).data.sidechain_rpc
const call = async (endpoint, request) => {
  const postData = {
    jsonrpc: "2.0",
    id: Date.now(),
    ...request,
  };
//   const rpcURL = await (await instance.get('/settings')).data.sidechain_rpc
  let result = null;
  const query = await axios.post(
    `${await sidechain_rpc()}/${endpoint}`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  result = query.data.result;

  return result;
};

const blockchain = (request) => call("blockchain", request);

const contract = (request) => call("contracts", request);

export const getBalances = (account, symbol) => async (dispatch) => {
  const query = { account };
  if (symbol) {
    query.symbol = symbol;
  }

  const request = {
    method: "find",
    params: {
      contract: "tokens",
      table: "balances",
      query,
    },
  };
  console.log(store.getState().settings.sidechain_rpc);
  const data = await contract(request);
  dispatch({
    type: GET_BALANCES,
    payload: data,
  });
};

export const getManagedNFTInfo = (symbols) => {
  const query = { nft: symbols };

  if (Array.isArray(symbols)) {
    query.nft = { $in: symbols };
  }

  const request = {
    method: "find",
    params: {
      contract: "packmanager",
      table: "managedNfts",
      query,
    },
  };

  return contract(request);
};

export const getNFT = (query = {}) => {
  query = { symbol: store.getState().settings.nft_symbol, ...query };

  const request = {
    method: "findOne",
    params: {
      contract: "nft",
      table: "nfts",
      query,
    },
  };

  return contract(request);
};

export const getNFTSellBook = (query, offset = 0, limit = 1000) => {
  const symbol = query.symbol || store.getState().settings.nft_symbol;

  const request = {
    method: "find",
    params: {
      contract: "nftmarket",
      table: `${symbol}sellBook`,
      query,
      offset,
      limit,
    },
  };

  return contract(request);
};

export const getNFTInterests = (query = {}, offset = 0, limit = 1000) => {
  const symbol = query.symbol || store.getState().settings.nft_symbol;

  const request = {
    method: "find",
    params: {
      contract: "nftmarket",
      table: `${symbol}openInterest`,
      query,
      offset,
      limit,
    },
  };

  return contract(request);
};

export const getNFTInstances = (query, offset = 0, limit = 1000) => {
  const symbol = query.symbol || store.getState().settings.nft_symbol;

  const request = {
    method: "find",
    params: {
      contract: "nft",
      table: `${symbol}instances`,
      query,
      offset,
      limit,
    },
  };

  return contract(request);
};

export const getNFTInstance = (id) => {
  const query = { symbol: store.getState().settings.nft_symbol, _id: id };

  const request = {
    method: "findOne",
    params: {
      contract: "nft",
      table: `${query.symbol}instances`,
      query,
    },
  };

  return contract(request);
};

export const getNFTTradeHistory = (query, offset = 0, limit = 1000) => {
  const symbol = query.symbol || store.getState().settings.nft_symbol;

  const request = {
    method: "find",
    params: {
      contract: "nftmarket",
      table: `${symbol}tradesHistory`,
      query,
      offset,
      limit,
    },
  };

  return contract(request);
};

export const getRegisteredPacks = (query = {}) => {
  const request = {
    method: "find",
    params: {
      contract: "packmanager",
      table: "packs",
      query,
    },
  };

  return contract(request);
};

export const getToken = (symbol) => {
  const request = {
    method: "findOne",
    params: {
      contract: "tokens",
      table: "tokens",
      query: { symbol },
    },
  };

  return contract(request);
};

export const getTokens = (query = {}, offset = 0, limit = 1000) => {
  const request = {
    method: "find",
    params: {
      contract: "tokens",
      table: "tokens",
      query,
      offset,
      limit,
    },
  };

  return contract(request);
};

export const getTransaction = (txid) => {
  const request = {
    method: "getTransactionInfo",
    params: {
      txid,
    },
  };

  return blockchain(request);
};

export const getTypes = (query = {}, offset = 0, limit = 1000) => {
  const request = {
    method: "find",
    params: {
      contract: "packmanager",
      table: "types",
      query,
      offset,
      limit,
    },
  };

  return contract(request);
};
