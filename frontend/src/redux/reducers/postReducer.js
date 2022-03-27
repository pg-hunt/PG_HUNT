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

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true };
    case CREATE_POST_SUCCESS:
      return { loading: false, newPost: action.payload };
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editPostReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_POST_REQUEST:
      return { loading: true };
    case EDIT_POST_SUCCESS:
      return { loading: false, editedPost: action.payload };
    case EDIT_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true };
    case DELETE_POST_SUCCESS:
      return { loading: false };
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewPostReducer = (state = {}, action) => {
  switch (action.type) {
    case VIEW_POST_REQUEST:
      return { loading: true };
    case VIEW_POST_SUCCESS:
      return { loading: false, current_post: action.payload };
    case VIEW_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewAllPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case VIEW_ALL_POSTS_REQUEST:
      return { loading: true };
    case VIEW_ALL_POSTS_SUCCESS:
      return { loading: false, all_posts: action.payload };
    case VIEW_ALL_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchReducer = (state = { all_posts: [] }, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { loading: true };
    case SEARCH_SUCCESS:
      return { loading: false, all_posts: action.payload };
    case SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
