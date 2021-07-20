import axios from "../utils/axios";
import { SET_SETTINGS } from "./types";

export const getChainSettings = () => async dispatch => {
    try {
        const data = await axios.get('/settings')
        dispatch({
            type: SET_SETTINGS,
            payload: data.data
        })
    } catch (err) {
        console.log(err.message)
    }
}