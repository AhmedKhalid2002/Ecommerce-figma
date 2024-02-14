import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { CartContext } from '../../../Contex/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../../Contex/WishListContext';
export default function () {
    let [products,setProducts]=useState([]);
    let {addCart,setNumProductCart}=useContext(CartContext)
    let {addToWishlist,getWishId,deleteFromWishlist,setWishlistId,getWishlist}=useContext(WishlistContext);
    let [wishlist,setWishlist]=useState([]);

    async function getSliderProduct(){
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=2`);
        setProducts(data.data)
    }
    async function addToCart(ProductId){
        let data=await addCart(ProductId);
        setNumProductCart(data?.data?.numOfCartItems)
        if(data.data?.status == "success"&&localStorage.getItem('userToken')!==null ){
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
    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    };
    useEffect(()=>{
        getSliderProduct()
    },[])
  return (
    <>
       <div className="container">
            <div className='my-5'>
                <Slider {...settings}>
                    
                    {products.map((product,index)=><div className="col-md-3" key={product._id}>
                            <div className='position-relative card-prod border m-2 '>
                            <div className='d-flex flex-column  justify-content-center align-items-end p-2'>
                                {
                                    getWishId(product._id)?<i className="fa-solid fa-heart  fs-5  text-danger" onClick={()=>removewishlist(product._id)}></i>:<i className="fa-regular fa-heart  fs-5  " onClick={()=>addWishlist(product._id)}></i>
                                }
                                <Link to={`/productDetails/${product.id}`}><i className="fa-regular fa-eye text-dark fs-5 mt-2"></i></Link>
                            </div>
                                <Link className='nav-link'>
                                <img src={product.imageCover} className='w-100 p-3' alt={product.title} />
                                <button className=' btn btn-dark text-white w-100 add-cart ' onClick={()=>addToCart(product.id)}>Add To Cart</button>
                                <div className='p-2 bg-secondary-subtle'>
                                    <p >{product.title.slice(0,20).split(" ,").join()}</p>
                                    <div >
                                        <span className='color-orange'>${product.price}</span>
                                        <span className='ms-3 del'>${product.price * 2}</span>
                                    </div>
                                    <div className='d-flex '>
                                        <div className="rating"><i className="fa-solid fa-star"></i></div>
                                        <div className="rating"><i className="fa-solid fa-star"></i></div>
                                        <div className="rating"><i className="fa-solid fa-star"></i></div>
                                        <div className="rating"><i className="fa-solid fa-star"></i></div>
                                        <div className="rating"><i className="fa-solid fa-star-half-stroke"></i></div>
                                        <p>({product.ratingsAverage})</p>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        </div>
                    )}
                </Slider>
            </div>
       </div>
    </>
  )
}
