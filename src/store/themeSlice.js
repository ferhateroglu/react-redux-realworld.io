import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light"
};

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        switchTheme: (state,action) =>{
            state.theme= action.payload;
        }
    }
})

export default themeSlice.reducer;
export const {switchTheme} = themeSlice.actions;