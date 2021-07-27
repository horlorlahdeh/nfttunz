import { GET_COLLECTIBLES, GET_USER_COLLECTIBLES } from "./types";
import axios from "../utils/axios";

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
    const data = await axios.get(`/collectibles/list`);
     dispatch({
       type: GET_USER_COLLECTIBLES,
       payload: data.data,
     });
  } catch (err) {
    console.log(err)
  }
}


// /collectibles/list{?username=${username}&${published}&${limit}&${page}}