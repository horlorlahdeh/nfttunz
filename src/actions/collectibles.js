import { GET_COLLECTIBLES, GET_USER_COLLECTIBLES, GET_COLLECTIBLE } from "./types";
import axios from "../utils/axios";
import store from '../store'

export const getCollectibles = () => async (dispatch) => {
  try {
    const data = await axios.get(
      `/collectibles/list`
    );
    dispatch({
      type: GET_COLLECTIBLES,
      payload: data.data
    })
  } catch (err) {
    console.log(err.message);
  }
};

export const getUserCollectibles = () => async (dispatch) => {
  try {
    const user = await store.getState().users.username;
    const data = await axios.get(`/collectibles/list`);
    const userData = data.data.filter(d => d.creator === user);
    console.log(userData);
     dispatch({
       type: GET_USER_COLLECTIBLES,
       payload: userData,
     });
  } catch (err) {
    console.log(err.message)
  }
}

export const getCollectible = (series) => async dispatch => {
  try {
    const data = await axios.get(`/collectibles/info?series=${series}`)
    console.log(data.data)
    dispatch({
      type: GET_COLLECTIBLE,
      payload: data.data
    })
  } catch (err) {
    console.log(err.message)
  }
}


// /collectibles/list{?username=${username}&${published}&${limit}&${page}}