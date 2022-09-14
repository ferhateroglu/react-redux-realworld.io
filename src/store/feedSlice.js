import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeed = createAsyncThunk('articles/feed',(token,{rejectWithValue})=>{
    const config = { headers: { Authorization: `Token ${token}`}}
    return axios
    .get("https://api.realworld.io/api/articles/feed?limit=20&offset=0",config)
    .then(response => response)
    .catch(err => rejectWithValue(err))
})

export const feedSlice = createSlice({
    name: "feedSlice",
    initialState: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchFeed.pending, (state)=>{
            state.feedLoading = true;
        })
        builder.addCase(fetchFeed.fulfilled, (state, action)=>{
            state.feedLoading = false;
            state.feedError = "";
            state.feedArticles = action.payload.data.articles;//[{article},...]
        })
        builder.addCase(fetchFeed.rejected, (state,action)=>{
            state.feedLoading = false;
            state.feedArticles = [];
            state.feedError = "unexpected error";
           
        })
    }
})

export default feedSlice.reducer;