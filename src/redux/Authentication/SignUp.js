import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export let postSignUp=createAsyncThunk('Authentication/SignUp', async   (values)=>{
     let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values);
     console.log(data);
     return data;
})
let initialState={signUp:[] , isLoading:false,isError:false}
export let signUpSlice=createSlice({
    name:"SignUp",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(postSignUp.fulfilled,(state,action)=>{
            state.signUp=action.payload;
            state.isLoading=false;
        });
        builder.addCase(postSignUp.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(postSignUp.rejected,(state,action)=>{
            state.isError=action.payload;
            state.isLoading=false
        })
    }
})
export let signUpAuth=signUpSlice.reducer;