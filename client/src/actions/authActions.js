import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

//register user
export const RegisterUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//login user -Get Token
export const LoginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get data
      const decoded = jwt_decode(token);
      //set the user
      dispatch(SetCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Set logged in user
export const SetCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//log the user out
export const LogoutUser = () => dispatch => {
  //remove the token from local storage
  localStorage.removeItem("jwtToken");
  //remove the auth header for future requests
  setAuthToken(false);
  //set the current user to empty object which will set isAuthenticated to false
  dispatch(SetCurrentUser({}));
};
