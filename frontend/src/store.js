import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer,
} from './redux/reducers/userReducer';
import {
  createPostReducer,
  editPostReducer,
  deletePostReducer,
  viewPostReducer,
  viewAllPostsReducer,
  searchReducer,
} from './redux/reducers/postReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  posts: combineReducers({
    createPost: createPostReducer,
    editPost: editPostReducer,
    deletePost: deletePostReducer,
    viewPost: viewPostReducer,
    viewAllPosts: viewAllPostsReducer,
    search: searchReducer,
  }),
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
