import {
  GET_COLLECTIBLES,
  GET_USER_COLLECTIBLES,
  GET_COLLECTIBLE,
  SET_MORE_INTERESTS,
  SET_INTERESTS,
  SET_PAGINATION,
  SET_ON_MARKET,
  SET_SERIES,
  SEARCH_COLLECTIBLES,
} from './types';
import axios from '../utils/axios';
import store from '../store';
import { arrayChunk } from '../utils/helpers';

// Chain Configuration
const sidechain_rpc = 'https://hetestnet.dtools.dev/rpc/';
const symbol = 'TUNEZ';

const call = async (endpoint, request) => {
  const postData = {
    jsonrpc: '2.0',
    id: Date.now(),
    ...request,
  };
  let result = null;
  const query = await axios.post(`${sidechain_rpc}/${endpoint}`, postData, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  result = query.data.result;

  return result;
};

const contract = async (request) => await call('contracts', request);

export const getCollectibles = () => async (dispatch) => {
  try {
    const data = await axios.get(`/collectibles/list`);
    dispatch({
      type: GET_COLLECTIBLES,
      payload: data.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getUserCollectibles = () => async (dispatch) => {
  try {
    const user = await store.getState().users.username;
    const data = await axios.get(`/collectibles/list`);
    const userData = data.data.filter((d) => d.creator === user);
    console.log(userData);
    dispatch({
      type: GET_USER_COLLECTIBLES,
      payload: userData,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getCollectible = (series) => async (dispatch) => {
  try {
    const data = await axios.get(`/collectibles/info?series=${series}`);
    dispatch({
      type: GET_COLLECTIBLE,
      payload: data.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchSeries = (seriesNames) => async (dispatch) => {
  let seriesData = {};

  if (Array.isArray(seriesNames)) {
    const promises = [];

    const chunks = arrayChunk(seriesNames, 500);

    for (let i = 0; i < chunks.length; i += 1) {
      promises.push(
        axios.post('collectibles/info', { series: chunks[i].toString() })
      );
    }

    seriesData = (await Promise.all(promises)).flat(Infinity);
  } else {
    seriesData = await axios.call('collectibles/info', {
      series: seriesNames,
    });
  }

  dispatch({
    type: SET_SERIES,
    payload: seriesData.data,
  });
};

export const fetchOnMarket =
  (query, offset = 0, limit = 1000) =>
  async (dispatch) => {
    try {
      const request = {
        method: 'find',
        params: {
          contract: 'nftmarket',
          table: `${symbol}sellBook`,
          query,
          offset,
          limit,
        },
      };
      let market = await contract(request);

      market = market.map((c) => ({
        account: c.account,
        nft_id: Number(c.nftId),
        series: c.grouping.series,
        price: Number(c.price),
        symbol: c.priceSymbol,
        fee: c.fee,
      }));
      console.log('fetchOnMarket', market);
      dispatch({ type: SET_ON_MARKET, payload: market });

      const seriesNames = Array.from(new Set(market.map((c) => c.series)));
      console.log(seriesNames);
      await dispatch(fetchSeries(seriesNames));
    } catch (e) {
      console.log(e.message);
    }
  };

export const fetchInterests =
  (infinity = false) =>
  async (dispatch) => {
    try {
      const state = store.getState().market.pagination;
      console.log(state);
      const {
        page,
        limit,
        sort_by: sortBy,
        has_more: hasMore,
        price_min: priceMin,
        price_max: priceMax,
        rights,
        category,
      } = state;

      if (hasMore) {
        const params = { page: page + 1, limit, sort_by: sortBy };

        if (priceMin) {
          params.price_min = priceMin;
        }
        if (priceMax) {
          params.price_max = priceMax;
        }
        if (rights) {
          params.rights = rights;
        }
        if (category) {
          params.category = category;
        }

        const data = await axios.get('market', params);
        console.log(data.data);
        if (data.data.length > 0) {
          if (infinity) {
            dispatch({ type: SET_MORE_INTERESTS, payload: data.data });
          } else {
            dispatch({ type: SET_INTERESTS, payload: data.data });
          }

          dispatch({ type: SET_PAGINATION, payload: { page: page + 1 } });
        } else {
          if (page === 0) {
            dispatch({ type: SET_INTERESTS, payload: data.data });
          }

          dispatch({ type: SET_PAGINATION, payload: { has_more: false } });
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

export const searchCollectibles = (query) => async dispatch => {
  try {
     const data = await axios.post(`/search`, {q: query});
     console.log('search route', data.data);
     dispatch({
       type: SEARCH_COLLECTIBLES,
       payload: data.data,
     });
  } catch (err) {
    console.log(err.message)
  }
}