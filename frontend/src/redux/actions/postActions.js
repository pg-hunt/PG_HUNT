import axios from 'axios';
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  VIEW_POST_REQUEST,
  VIEW_POST_SUCCESS,
  VIEW_POST_FAIL,
  VIEW_ALL_POSTS_REQUEST,
  VIEW_ALL_POSTS_SUCCESS,
  VIEW_ALL_POSTS_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from '../constants/postConstants';
import { toast } from 'react-toastify';

export const createPost = (postDetails) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_POST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      '/api/posts/createpost',
      postDetails,
      config
    );

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data,
    });

    toast.success(`Post Created successfully!`);
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`Error: ${err}`);
    dispatch({
      type: CREATE_POST_FAIL,
      payload: err,
    });
  }
};

export const editPost = (postId, postDetails) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_POST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/posts/${postId}`,
      postDetails,
      config
    );

    dispatch({
      type: EDIT_POST_SUCCESS,
      payload: data,
    });

    toast.success(`Post Edited successfully!`);
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`Error: ${err}`);
    dispatch({
      type: EDIT_POST_FAIL,
      payload: err,
    });
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_POST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/posts/${id}`, config);
    dispatch({
      type: DELETE_POST_SUCCESS,
    });

    dispatch(viewAllPosts());

    toast.success(`Post Deleted successfully!`);
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`Error: ${err}`);
    dispatch({
      type: DELETE_POST_FAIL,
      payload: err,
    });
  }
};

export const viewPost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIEW_POST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/posts/${id}`, config);

    dispatch({
      type: VIEW_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`Error: ${err}`);
    dispatch({
      type: VIEW_POST_FAIL,
      payload: err,
    });
  }
};

export const viewAllPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIEW_ALL_POSTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/posts/`, config);

    dispatch({
      type: VIEW_ALL_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`Error: ${err}`);
    dispatch({
      type: VIEW_ALL_POSTS_FAIL,
      payload: err,
    });
  }
};

export const searchAction = (search) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCH_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/posts/search`, search, config);

    dispatch({
      type: SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`Error: ${err}`);
    dispatch({
      type: SEARCH_FAIL,
      payload: err,
    });
  }
};
