import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from "./types";
import axios from "axios";

//register user
export const GetCurrentProfile = () => dispatch => {
  dispatch(SetProfileLoading());
  axios
    .get("/api/profile/")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

//profile Loading
export const SetProfileLoading = () => {
  return { type: PROFILE_LOADING };
};

//Clear Profile
export const ClearCurrentProfile = () => {
  return { type: CLEAR_CURRENT_PROFILE };
};
