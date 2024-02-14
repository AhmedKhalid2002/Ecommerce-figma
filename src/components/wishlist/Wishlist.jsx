import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../Contex/WishListContext';
import Loading from '../Loading/Loading';
import del from '../../assets/delete.png';
import { CartContext } from '../../Contex/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Wishlist() {
  let {getWishlist,deleteFromWishlist,wishlistId,setWishlistId}=useContext(WishlistContext);
  let {addCart}=useContext(CartContext);
  let [showWishlist,setWishlist]=useState([]);
  let [isLoading,setIsLoading]=useState(false);
  let wishId=[];
  async function addToCart(ProductId){
    let data=await addCart(ProductId);
    if(data.data?.status == "success"&&localStorage.getItem('userToken')!==null ){
        toast.success('Product added successfully to your cart 💖');
    }else{
        toast.error('You are not logged in. Please login 💔')
    }
  }
  async function getProductWishlist(){
    setIsLoading(true)
    let {data}=await getWishlist();
    setWishlist(data?.data);
    for(let i=0;i<data?.data.length;i++){
      wishId.push(data?.data[i].id)
      setWishlistId(wishId)
    }
    setIsLoading(false)
  }
  async function removeProduct(productId){
    let {data}=await deleteFromWishlist(productId);
    setWishlist(data?.data);
    getProductWishlist()
}
  useEffect(()=>{
    getProductWishlist()
  },[])
  return (
    <>
        <Helmet>
              <meta charSet="utf-8" />
              <title>Wishlist</title>
        </Helmet>
        <div className="container">
            <div className="wishlist mt-5">
              <div className="row g-3">
                {isLoading?<Loading/>:showWishlist?.map((product)=><div className='col-md-3' key={product._id}>
                  <div className='bg-secondary-subtle p-3'>
                      <img src={del} alt="puplish" className='float-end cursor' onClick={()=>removeProduct(product._id)}/>
                      <img src={product?.imageCover} alt={product?.title} className='w-100 mt-3'/>
                      <button className=' btn btn-dark text-white w-100  mt-3' onClick={()=>addToCart(product?._id)}>Add To Cart</button>
                      <p className='text-center mt-2'>{product.title.slice(0,20).split(" ,").join()}</p>
                      <span className='color-orange'>${product.price}</span>
                  </div>
                </div>)}
              </div>
            </div>
        </div>
    </>
  )
}
