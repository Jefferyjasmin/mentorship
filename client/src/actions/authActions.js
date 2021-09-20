import { GET_ERRORS } from "./type";
import { GET_CURRENT_USER } from "./type";

import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
// eslint-disable-next-line no-unused-vars
const proxyApi = " http://localhost:5000";
// ${proxyApi}
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(`${proxyApi}/api/users/register`, userData)
    .then(() => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - Get User Token

export const loginUser = (userData) => (dispatch) => {
  axios
    .post(`${proxyApi}/api/users/login`, userData)
    .then((res) => {
      // saving token to local storage:
      const { token } = res.data;
      // set token to local storage
      localStorage.setItem("jwtToken", token);
      //set Token to auth header
      setAuthToken(token);
      //decode token to get user Data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// set Logged in User
export const setCurrentUser = (decoded) => {
  return { type: GET_CURRENT_USER, payload: decoded };
};

export const logOutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future reqouest
  setAuthToken(false);
  // setCurrent user to {} which will also set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
