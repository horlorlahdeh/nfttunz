import { GET_PROFILE, SET_PROFILE } from "./types";
import axios from "../utils/axios";

export const setProfile = (formData) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    console.log(formData);
    const data = axios.post("/users/profile", formData, config);
    dispatch({
      type: SET_PROFILE,
      payload: data.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getProfile =  () => async dispatch => {
    try {
        const data = await axios.get('/users/profile');
        dispatch({
            type: GET_PROFILE,
            payload: data.data
        })
    } catch (err) {
        console.log(err.message)
    }
}
