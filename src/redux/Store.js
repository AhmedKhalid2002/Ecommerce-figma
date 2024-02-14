import { configureStore } from "@reduxjs/toolkit";
import {  signUpAuth } from "./Authentication/SignUp";
import { allProductReducer } from "./productRedux/GetProduct";


export let store=configureStore({
    reducer:{
        AuthSignUp:signUpAuth,
        allProduct:allProductReducer,
    }
})