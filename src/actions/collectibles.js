import { GET_COLLECTIBLES } from "./types";
import axios from "../utils/axios";

export const getCollectibles = () => async (dispatch) => {
  try {
    const data = await axios.get(
      `/collectibles/list`
    );
    console.log(data.data)
    dispatch({
      type: GET_COLLECTIBLES,
      payload: data.data
    })
  } catch (err) {
    console.log(err.message);
  }
};



// /collectibles/list{?username=${username}&${published}&${limit}&${page}}