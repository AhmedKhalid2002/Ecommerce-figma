import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext=createContext();


export function CartContextProvider({children}){

    function addCart(productId){
        let headers={
            token:localStorage.getItem('userToken')
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{headers}).then((response)=>response).catch((err)=>err);
    }
    function getCart(){
        let headers={
            token:localStorage.getItem('userToken')
        }
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).then((response)=>response).catch((error)=>error);
    }
    function updateCountCart(productId,count){
        let headers={
            token:localStorage.getItem('userToken')
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:count} , {headers}).then((response)=>response).catch((error)=>error);
    }
    function deleteCart(id){
        let headers={
            token:localStorage.getItem('userToken')
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:headers}).then((res)=>res).catch((err)=>err)
    }
    function onlinePayment(shippingAddress){
        let headers={
            token:localStorage.getItem('userToken')
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{shippingAddress},{headers})
    }
    
    let [cartId,setCartId]=useState(null);
    let [numProductCart,setNumProductCart]=useState(null);
    async function getinitialCart(){
        let {data}=await getCart();
        setNumProductCart(data?.numOfCartItems);
        setCartId(data?.data?._id)
    }
    useEffect(()=>{
        getinitialCart()
    },[])
    return <CartContext.Provider value={{addCart,getCart,updateCountCart,deleteCart,onlinePayment,cartId,setCartId,numProductCart,setNumProductCart}}>
        {children}
    </CartContext.Provider>
}