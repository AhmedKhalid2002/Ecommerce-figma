import React, { useContext, useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Home from './components/home/Home';
import Layout from './components/Layout/Layout';
import SignUp from './components/register/SignUp';
import Login from './components/login/Login';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import Cart from './components/cart/Cart';
import Wishlist from './components/wishlist/Wishlist';
import Profile from './components/Profile/Profile';
import { UserToken } from './Contex/userTokenContext';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import ProductDetails from './components/productDetails/ProductDetails';
import Product from './components/product/Product';
import SpicificProduct from './components/product/SpicificProduct/SpicificProduct';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import NotFound from './components/notFound/NotFound';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/checkout/Checkout';
import AllOrder from './components/allorder/AllOrder';
import ResetPassword from './components/resetPassword/ResetPassword';
import { WishlistContext } from './Contex/WishListContext';
import ForgetPassword from './components/forget password/ForgetPassword';

export default function App() {
  let {isLogin,setIsLogin,}=useContext(UserToken);
  let {getWishlist,wishlistId,setWishlistId}=useContext(WishlistContext);
  let [wishlist,setWishlist]=useState([]);
   
  async function showWishlist(){
    let {data}=await getWishlist();
    setWishlist(data?.data);
    for(let i=0;i<data?.data.length;i++){
      wishlistId.push(data?.data[i].id)
      setWishlistId(wishlistId)
  }
  }
  useEffect(()=>{
    showWishlist()
  },[])
  let routes=createHashRouter([
    {path:"/",element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"profile",element:<ProtectedRoute><Profile/></ProtectedRoute>},
      {path:"about",element:<About/>},
      {path:"product",element:<ProtectedRoute><Product/></ProtectedRoute>},
      {path:"spicificProduct/:id",element:<ProtectedRoute><SpicificProduct/></ProtectedRoute>},
      {path:"contact",element:<ProtectedRoute><Contact/></ProtectedRoute>},
      {path:"productDetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"wishlist",element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:"checkout",element:<ProtectedRoute><Checkout/></ProtectedRoute>},
      {path:"allorders",element:<ProtectedRoute><AllOrder/></ProtectedRoute>},
      {path:"signUp",element:<SignUp/>},
      {path:"signIn",element:<Login/>},
      {path:"forgetPass",element:<ForgetPassword/>},
      {path:"resetPassword",element:<ResetPassword/>},
      {path:'*',element:<NotFound/>}
    ]},
]);
useEffect(()=>{
  if(localStorage.getItem('userToken')!=null){
    setIsLogin(localStorage.getItem('userToken'));
  }
},[])
  return (
      <Provider store={store}>
            <RouterProvider router={routes}>
            </RouterProvider>
            <Toaster />
      </Provider>
  )
}
