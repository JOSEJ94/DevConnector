import {
  ADD_POST,
  GET_ERRORS,
  POST_LOADING,
  GET_POSTS,
  DELETE_POST,
  CLEAR_ERRORS,
  GET_POST
} from "./types";
import axios from "axios";

//add a post
export const AddPost = postData => dispatch => {
  dispatch(ClearErrors());
  axios
    .post("/api/posts/", postData)
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//get posts
export const GetPosts = () => dispatch => {
  dispatch(SetPostLoading());
  axios
    .get("/api/posts")
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};

//get post with this id
export const GetPost = id => dispatch => {
  dispatch(SetPostLoading());
  axios
    .get("/api/posts/" + id)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_POST, payload: null }));
};

//profile Loading
export const SetPostLoading = () => {
  return { type: POST_LOADING };
};

//clearErrors
export const ClearErrors = () => {
  return { type: CLEAR_ERRORS };
};

//Delete post
export const DeletePost = postId => dispatch => {
  axios
    .delete("/api/posts/" + postId)
    .then(res => dispatch({ type: DELETE_POST, payload: postId }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Delete comment
export const DeleteComment = (postId, commentid) => dispatch => {
  axios
    .delete("/api/posts/comment/" + postId + "/" + commentid)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Add a like
export const AddLike = postId => dispatch => {
  axios
    .post("/api/posts/like/" + postId)
    .then(res => dispatch(GetPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Remove like
export const RemoveLike = postId => dispatch => {
  axios
    .post("/api/posts/unlike/" + postId)
    .then(res => dispatch(GetPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//add comment
export const AddComment = (postId, commentData) => dispatch => {
  dispatch(ClearErrors());
  axios
    .post("/api/posts/comment/" + postId, commentData)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
