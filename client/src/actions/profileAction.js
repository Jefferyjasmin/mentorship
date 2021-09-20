import axios from "axios";

import { logOutUser } from "./authActions";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_CURRENT_USER,
  GET_PROFILES,
} from "./type";
const proxyApi = " http://localhost:5000";
// ${proxyApi}
//GET ALL PROFILES
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`${proxyApi}/api/profile/all`)
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      })
    );
};

export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`${proxyApi}/api/profile`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};
// Get Profile By ID
export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());

  axios
    .get(`${proxyApi}/api/profile/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Create profile ....

export const createProfile = (proData, history) => (dispatch) => {
  axios
    .post(`${proxyApi}/api/profile`, proData)
    .then(() => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// profile loading ...
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post(`${proxyApi}/api/profile/experience`, expData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addEducation = (eduData, history) => (dispatch) => {
  axios
    .post(`${proxyApi}/api/profile/education`, eduData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//Delete account and profile

export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure?  this can not be undone")) {
    axios
      .delete(`${proxyApi}/api/profile`)
      .then((res) =>
        dispatch({
          type: GET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }

  dispatch(logOutUser());
};

// Delete one Experience
export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`${proxyApi}/api/profile/experience/${id}`)
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`${proxyApi}/api/profile/education/${id}`)
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
