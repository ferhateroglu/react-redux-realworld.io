import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "./AuthSlice";
import articleReducer from "./articleSlice"
import signUpReducer from './signUpSlice';
import feedReducer from './feedSlice';
import profileReducer from './ProfileSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
    register: signUpReducer,
    feeds: feedReducer,
    profile : profileReducer,
    theme : themeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export default store;