import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk(("/users"), (user,{rejectWithValue})=>{
    return axios
    .post("https://api.realworld.io/api/users",user)
    .then(response =>response )
    .catch(err => rejectWithValue(err))
});

export const signUpSlice = createSlice({
    name: "signUpSlice",
    initialState: {},
    extraReducers: (builder) =>{
        builder.addCase(register.pending, (state) =>{
            state.loading = true;
        });
        builder.addCase(register.fulfilled, (state, action) =>{
            state.loading = false;
            state.isSucces = true;
            state.error = "";
        });
        builder.addCase(register.rejected, (state, action)=>{
            state.loading = false;  
            state.isSucces = false;
            state.error = action.payload.response.data.errors;
        })

    }
})

export default signUpSlice.reducer;