import {
  configureStore,
  combineReducers,
  Action,
  ThunkAction,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { postsApi } from "../features/posts/postsApi";
import postReducer from "../slice/PostSlice";
import usersReducer from "../slice/UserSlice";
import { usersApi } from "../features/users/usersApi";
import singleUserReducer from "../slice/singleUserSlice";
import followersReducer from "../slice/followersSlice";

const rootReducer = combineReducers({
  posts: postReducer,
  users: usersReducer,
  singleUser: singleUserReducer,
  followers: followersReducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, usersApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { useAppDispatch, useAppSelector };
