import { configureStore,combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./reducers/posts/postsSlice";
import userReducer from "./reducers/user/userSlice";
import commentsReducer from "./reducers/comments/commentsSlice";
import modalReduser from "./reducers/modal/modalSlice";

const combineReducer = combineReducers({
    posts: postsReducer,
    user: userReducer,
    comments: commentsReducer,
    modal: modalReduser
  });

const store = configureStore({
    reducer: combineReducer,
  });
 
export type RootState = ReturnType<typeof combineReducer>;
export type AppDispatch = typeof store.dispatch
export default store;