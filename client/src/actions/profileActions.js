import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
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

//Create Profile
export const CreateProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//add experience
export const AddExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

// add education
export const AddEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//Delete experience record
export const DeleteExperience = id => dispatch => {
  if (window.confirm("Are your sure? This cannot be undone"))
    axios
      .delete("/api/profile/experience/" + id)
      .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
};

//Delete education record
export const DeleteEducation = id => dispatch => {
  if (window.confirm("Are your sure? This cannot be undone"))
    axios
      .delete("/api/profile/education/" + id)
      .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
};

//Delete account & profile
export const DeleteAccount = () => dispatch => {
  if (window.confirm("Are your sure? This cannot be undone"))
    axios
      .delete("/api/profile/")
      .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
};
