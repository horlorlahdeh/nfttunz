import { GET_MARKET_LISTED } from "./types";
import axios from '../utils/axios'

export const getMarketListed = (params) => async dispatch => {
 try {
     const data = await axios.get(`collectibles/market?series=${params.series}`);
     console.log(data.data);
 } catch (err) {
     console.log(err.message)
 }
}