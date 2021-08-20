import axios from "axios";
import store from "../store";
import { GET_BALANCES, GET_NFT_DEFINITION, GET_NFT_INSTANCES, GET_NFT_SELLBOOK } from "./types";

// Chain Configuration
const sidechain_rpc = "https://hetestnet.dtools.dev/rpc/";
const symbol = "TUNEZ";

const call = async (endpoint, request) => {
  const postData = {
    jsonrpc: "2.0",
    id: Date.now(),
    ...request,
  };
  let result = null;
  const query = await axios.post(
    `${sidechain_rpc}/${endpoint}`,
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

const blockchain = async (request) => await call("blockchain", request);

const contract = async (request) => await call("contracts", request);

export const getBalances = (account, symbol) => async (dispatch) => {
  try {
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
    const data = await contract(request);
    dispatch({
      type: GET_BALANCES,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getNFTDefinition =
  (query = {}) =>
  async (dispatch) => {
    query = { symbol: symbol, ...query };
    const request = {
      method: "findOne",
      params: {
        contract: "nft",
        table: "nfts",
        query,
      },
    };
    const data = await contract(request);
    dispatch({
      type: GET_NFT_DEFINITION,
      payload: data,
    });
    return data;
  };

export const getNFTInstances =
  (query, series, offset = 0, limit = 1000) =>
  async (dispatch) => {
    const request = {
      method: "find",
      params: {
        contract: "nft",
        table: `${symbol}instances`,
        query,
        offset,
        limit,
        indexes: [
          {
            index: "priceDec",
            descending: false,
          },
          {
            index: "_id",
            descending: false,
          },
        ],
      },
    };
    const data = await contract(request);
    console.log(data)
    const filteredData = data.filter(d => d.properties.series === series)
    console.log(filteredData);
    dispatch({
      type: GET_NFT_INSTANCES,
      payload: filteredData,
    });
    return data;
  };

export const getNFTInstance = (id) => async (dispatch) => {
  

  const request = {
    method: "findOne",
    params: {
      contract: "nft",
      table: `${symbol}instances`,
      query: { _id: id },
    },
  };

  const data = await contract(request);
  return data;
};

export const getNFTSellBook = (query, offset = 0, limit = 1000) => async dispatch => {
  try {
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
    let data = await contract(request);
    data = data.map((c) => ({
      account: c.account,
      nft_id: Number(c.nftId),
      series: c.grouping.series,
      price: Number(c.price),
      symbol: c.priceSymbol,
      fee: c.fee,
    }));
    console.log('nftsellbook', data)
    dispatch({
      type: GET_NFT_SELLBOOK,
      payload: data
    })
  } catch (err) {
    console.log(err.message);
  }
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
