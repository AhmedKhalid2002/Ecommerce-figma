import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let GetAllProduct=createAsyncThunk('GetProduct/products',async ()=>{
    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    return data.data;
})
export let GetSpicificProduct=createAsyncThunk('GetProduct/WomanProducts',async (categoryId)=>{
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`);
    return data.data;
})
let initialState={product:[],isLoading:false,isError:null}
export let GetProductSlice=createSlice({
    name:"products",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(GetAllProduct.fulfilled,(state,action)=>{
            state.product=action.payload;
            state.isLoading=false;
        });
        builder.addCase(GetAllProduct.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(GetAllProduct.rejected,(state,action)=>{
            state.isError=action.payload;
            state.isLoading=false;
        });
        builder.addCase(GetSpicificProduct.fulfilled,(state,action)=>{
            state.product=action.payload;
            state.isLoading=false;
        });
        builder.addCase(GetSpicificProduct.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(GetSpicificProduct.rejected,(state,action)=>{
            state.isError=action.payload;
            state.isLoading=false;
        });
        
    }
})
export let allProductReducer=GetProductSlice.reducer;