import axios from "axios";
import { createContext, useState } from "react";


export let WishlistContext=createContext();


export function WishlistContextProvider({children}){
    let [wishlistId,setWishlistId]=useState([])
    function getWishId(productId){
        return wishlistId?.includes(productId);
    }
    function addToWishlist(productId){
        let headers={
            token:localStorage.getItem('userToken')
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{headers}).then((res)=>res).catch((err)=>err);
    }
    function getWishlist(){
        let headers={
            token:localStorage.getItem('userToken')
        }
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers}).then((res)=>res).catch((err)=>err);
    }
    function deleteFromWishlist(id){
        let headers={
            token:localStorage.getItem('userToken')
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers}).then((res)=>res).catch((err)=>err);
    }
    return <WishlistContext.Provider value={{addToWishlist,getWishlist,deleteFromWishlist,wishlistId,setWishlistId,getWishId}}>
            {children}
    </WishlistContext.Provider>
}
