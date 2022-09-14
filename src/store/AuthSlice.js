import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("/users/login", (user,{rejectWithValue}) => {
  return axios
    .post("https://api.realworld.io/api/users/login", user)
    .then((response) => response)
    .catch(err => rejectWithValue(err))
});

const initialState = {
  isAuth: false,
};

export const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuth = false;
      state.currentUser = {};
    },
    updateToken: (state,action)=>{
      state.currentUser.token= action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.data.user; //{"email": "ferhat@ferhat1234.com","username": "ferhat","bio": "ornekBio","image": "ornekBio","token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlcmhhdEBmZXJoYXQxMjM0LmNvbSIsInVzZXJuYW1lIjoiZmVyaGF0IiwiaWF0IjoxNjYwNjQ1MzA0LCJleHAiOjE2NjU4MjkzMDR9.7X4cE1J8PTMivc8rMfV8ceeB3JWRLaQvLuxiJJgO1fU"
      state.isAuth = true;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.currentUser = {};
      state.isAuth = false;
      state.error = action.payload.response.data.errors
    });
  },
});

export default AuthSlice.reducer;
export const { logOut, updateToken } = AuthSlice.actions;
