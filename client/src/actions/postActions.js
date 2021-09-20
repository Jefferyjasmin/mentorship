import axios from "axios";
import {
  GET_ERRORS,
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  DELETE_POST_COMMENT,
} from "./type";
const proxyApi = " http://localhost:5000";
// ${proxyApi}
export const addPost = (postData) => (dispatch) => {
  axios
    .post(`${proxyApi}/api/posts`, postData)

    .then((res) =>
      dispatch({
        type: ADD_POST,
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
//GET ALL POST request

export const getPosts = () => (dispatch) => {
  setPostsLoading();
  axios
    .get(`${proxyApi}/api/posts`)
    .then((res) =>
      dispatch({
        type: GET_POSTS,

        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

// Set Loading State

export const setPostsLoading = () => {
  return {
    type: POST_LOADING,
  };
};

//Set Loading State
export const deletePosts = (id) => (dispatch) => {
  axios
    .delete(`${proxyApi}/api/posts/${id}`)
    .then(
      dispatch({
        type: DELETE_POST,

        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//Add Like Action

export const addLike = (id) => (dispatch) => {
  axios
    .post(`${proxyApi}/api/posts/like/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Remove Like Action

export const removeLike = (id) => (dispatch) => {
  axios
    .post(`${proxyApi}/api/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//GET   POST request

export const getPost = (id) => (dispatch) => {
  setPostsLoading();
  axios
    .get(`${proxyApi}/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: GET_POST,

        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

//addComment request

export const addComment = (commentData, postId) => (dispatch) => {
  setPostsLoading();

  axios
    .post(`${proxyApi}/api/posts/comment/${postId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_POST,

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

//Set Loading State
export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(`${proxyApi}/api/posts/comment/${postId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,

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
