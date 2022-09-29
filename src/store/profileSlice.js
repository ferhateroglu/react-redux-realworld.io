import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfile = createAsyncThunk('profiles/username',({token,username},{rejectWithValue})=>{
    const config = { headers: { Authorization: `Token ${token ? token : ""}`}}
    return axios
    .get(`https://api.realworld.io/api/profiles/${username}`,config)
    .then(response => response)
    .catch(err => rejectWithValue(err))
})

export const updateProfile = createAsyncThunk("user",({user,token},{rejectWithValue})=>{
    const config = { headers: { Authorization: `Token ${token ? token : ""}`}}
    const body = {user};
    return axios
    .put("https://api.realworld.io/api/user",body,config)
    .then(response => response)
    .catch(err => rejectWithValue(err))
})
export const followProfile = createAsyncThunk('profiles/username/follow',({token,username},{rejectWithValue})=>{
    const config = { headers: { Authorization: `Token ${token ? token : ""}`}}
    return axios
    .post(`https://api.realworld.io/api/profiles/${username}/follow`,{},config)
    .then(response => response)
    .catch(err => rejectWithValue(err))
})
export const unFollowProfile = createAsyncThunk('profiles/username/unfollow',({token,username},{rejectWithValue})=>{
    const config = { headers: { Authorization: `Token ${token ? token : ""}`}}
    return axios
    .delete(`https://api.realworld.io/api/profiles/${username}/follow`,config)
    .then(response => response)
    .catch(err => rejectWithValue(err))
})

export const profileSlice = createSlice({
    name: "profileSlice",
    initialState: {},
    reducers: {
        resetUpdateData: (state)=>{
            state.updateProfileLoading = false;
            state.updateProfileData = false;
            state.updateProfileError = false;
        }
      },
    extraReducers: (builder) =>{

        builder.addCase(fetchProfile.pending, (state)=>{
            state.profileLoading = true;
        })
        builder.addCase(fetchProfile.fulfilled, (state, action)=>{
            state.profileLoading = false;
            state.profileError = "";
            //{"username": "Gerome","bio": null,"image": "https://api.realworld.io/images/demo-avatar.png","following": false }
            state.profileData = action.payload.data.profile;

        })
        builder.addCase(fetchProfile.rejected, (state,action)=>{
            state.profileLoading = false;
            state.profileError = "unexpected error";
            state.profileData  = {};
        })

        //update profile
        builder.addCase(updateProfile.pending, (state)=>{
            console.log("1")
            state.updateProfileLoading = true;
        })
        builder.addCase(updateProfile.fulfilled, (state, action)=>{
            console.log("2")
            state.updateProfileLoading = false;
            state.updateProfileData = action.payload.data.user;
            state.updateProfileError = false;

        })
        builder.addCase(updateProfile.rejected, (state,action)=>{
            console.log("3")
            state.updateProfileLoading = false;
            state.updateProfileData  = false;
            state.updateProfileError = action.payload.response.data;
        })


        builder.addCase(followProfile.pending, (state)=>{
            state.followLoading = true;
        })
        builder.addCase(followProfile.fulfilled, (state, action)=>{
            state.followLoading = false;
            state.followData = action.payload.data;
            state.followError = "";

        })
        builder.addCase(followProfile.rejected, (state,action)=>{
            state.followLoading = false;
            state.followError = action.payload.data;
            state.followData  = {}
        })


        builder.addCase(unFollowProfile.pending, (state)=>{
            state.unFollowLoading = true;
        })
        builder.addCase(unFollowProfile.fulfilled, (state, action)=>{
            state.unFollowLoading = false;
            state.unFollowError = "";
            state.unFollowData = action.payload.data;

        })
        builder.addCase(unFollowProfile.rejected, (state,action)=>{
            state.unFollowLoading = false;
            state.unFollowError = action.payload.data;
            state.unFollowData  = {};
        })
    }
})


export default profileSlice.reducer;
export const { resetUpdateData } = profileSlice.actions;
