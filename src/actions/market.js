import { GET_MARKET } from "./types";
import axios from '../utils/axios'

export const getMarketListed = (params) => async dispatch => {
 try {
     const data = await axios.get(`collectibles/market?series=${params.series}`);
     console.log(data.data);
 } catch (err) {
     console.log(err.message)
 }
}
export const getMarket = (params) => async dispatch => {
    try {
        const data = await axios.get(`market`)
        console.log('market', data.data);
        dispatch({
            type: GET_MARKET,
            payload: data.data
        })
    } catch (err) {
        console.log(err.message)
    }
}