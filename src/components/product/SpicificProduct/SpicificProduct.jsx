import React, {  useContext, useEffect, useState } from 'react'
import { GetSpicificProduct } from '../../../redux/productRedux/GetProduct';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import heart from '../../../assets/heart.png';
import Loading from '../../Loading/Loading';
import { CartContext } from '../../../Contex/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../../Contex/WishListContext';
import { Helmet } from 'react-helmet';

export default function SpicificProduct() {
  
    let {product,isLoading}=useSelector((state)=>state.allProduct);
    let {addCart,setNumProductCart}=useContext(CartContext)
    let categoryId=useParams();
    let {addToWishlist,getWishId,getWishlist,deleteFromWishlist,setWishlistId}=useContext(WishlistContext);
    let dispatchProduct=useDispatch();
    let [wishlist,setWishlist]=useState([]);

    async function spicificProduct(id){
        let data=await dispatchProduct(GetSpicificProduct(id));
        product=data.payload;
    }
    async function addToCart(ProductId){
      let data=await addCart(ProductId);
      setNumProductCart(data?.data?.numOfCartItems)
      if(data.data.status == "success"){
          toast.success('Product added successfully to your cart 💖');
      }else{
          toast.error('You are not logged in. Please login 💔')
      }
  }

  async function addWishlist(ProductId){
    let data=await addToWishlist(ProductId);
    setWishlistId(data?.data?.data)
    if(data.data?.status == "success"&&localStorage.getItem('userToken')!==null ){
        toast.success('Product added successfully to your wishlist 💖');
    }else{
        toast.error('You are not logged in. Please login 💔')
    }
}
async function getproductWishlists(){
    let {data}=await getWishlist();
    setWishlist(data?.data)
    for(let i=0;i<data?.data.length;i++){
        wishId.push(data?.data[i].id)
        setWishlistId(wishId)
    }
}
async function removewishlist(productId){
    let {data}=await deleteFromWishlist(productId);
    setWishlistId(data?.data)
    getproductWishlists()
}
    useEffect(()=>{
      spicificProduct(categoryId.id)
    },[])
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Specific Product</title>
        </Helmet>
      <div className="container">
              <h2 className='text-center my-3'>{product[0]?.category?.name}</h2>
            {
                isLoading?<Loading/>:product.length===0?<h2 className='vh-100 d-flex justify-content-center align-items-center'>No product Now for this is Category 💘</h2>:<div className='row my-4 g-3'>
                {product?.map((products)=><div className='col-lg-3 col-md-4' key={products._id}>
                    <div className='card-prod position-relative   border rounded-2'>
                            <div className='d-flex flex-column m  justify-content-center align-items-end p-2'>
                            {
                                    getWishId(products.id)?<i className="fa-solid fa-heart  fs-5 text-danger" onClick={()=>removewishlist(products.id)}></i>:<i className="fa-regular fa-heart  fs-5  " onClick={()=>addWishlist(products._id)}></i>
                            }
                                <Link to={`/productDetails/${products.id}`}><i className="fa-regular fa-eye text-dark fs-5 mt-2"></i></Link>
                            </div>                     
                        <Link className='nav-link'>
                        <img src={products.imageCover} className='w-100' alt={products.title} />
                        <button className=' btn btn-dark text-white w-100 add-cart ' onClick={()=>addToCart(products.id)}>Add To Cart</button>
                        <div className='bg-secondary-subtle p-2'>
                            <p >{products.title.slice(0,20).split(" ,").join()}</p>
                            <div >
                                <span className='color-orange'>${products.price}</span>
                                <span className='ms-3 del'>${products.price * 2}</span>
                            </div>
                            <div className='d-flex '>
                                <div className="rating"><i className="fa-solid fa-star"></i></div>
                                <div className="rating"><i className="fa-solid fa-star"></i></div>
                                <div className="rating"><i className="fa-solid fa-star"></i></div>
                                <div className="rating"><i className="fa-solid fa-star"></i></div>
                                <div className="rating"><i className="fa-solid fa-star-half-stroke"></i></div>
                                <p>({products.ratingsAverage})</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>)}
            </div>
            }
      </div>
    </>
  )
}
