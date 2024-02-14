import React, { useContext, useEffect, useState } from 'react'
import { ProductDetailsContext } from '../../Contex/ProductDetailsContext';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import delivery from '../../assets/delivery.png'
import retur from '../../assets/return.png'
import { CartContext } from '../../Contex/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
export default function ProductDetails() {
    let [products,setProducts]=useState([]);
    let {addCart,setNumProductCart}=useContext(CartContext)
    let {GetProductDetails}=useContext(ProductDetailsContext);
    let [isLoading,setIsLoading]=useState(false);
    let {id}=useParams();
    async function getProductId(id){
        setIsLoading(true)
        let data=await GetProductDetails(id);
        setProducts(data)
        setIsLoading(false)
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
    useEffect(()=>{
        getProductId(id)
    },[])
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Product details</title>
        </Helmet>
        <div className="container">
            <div className="productDetails my-5 p-2">
               {isLoading?<Loading/> :<div className="row g-3 " >
                    <div className="col-lg-3">
                        {products.images?.map((product)=><div className='col-image' key={product._id} >
                            <div className='d-none d-lg-block'>
                                <img src={product} alt={product.title} className='w-50 mb-2' />
                            </div>
                        </div>).slice(0,4)}
                    </div>
                    <div className="col-lg-4 ">
                        <img src={products.imageCover} className='w-100 mt-5 pt-5' alt={products.title} />
                    </div>
                    <div className="col-lg-5">
                        <div className='row'>
                                <h3>{products.title}</h3>
                                <div className='d-flex '>
                                    <div className="rating"><i className="fa-solid fa-star"></i></div>
                                    <div className="rating"><i className="fa-solid fa-star"></i></div>
                                    <div className="rating"><i className="fa-solid fa-star"></i></div>
                                    <div className="rating"><i className="fa-solid fa-star"></i></div>
                                    <div className="rating"><i className="fa-solid fa-star-half-stroke"></i></div>
                                    <p>({products.ratingsAverage}) | <span className='color-green'>In Stock</span></p>
                                </div>
                                <h3>{products.price}$</h3>
                                <p>{products.description}</p>
                            <hr />
                                <div className='d-flex align-items-center '>
                                    <h3>Colors:</h3>
                                    <input type="radio" className='ms-2 form-check-input' name='color' />
                                    <input type="radio" className='ms-2 form-check-input' name='color'/>
                                </div>
                                <div className='d-flex   justify-content-between  align-items-center mt-2 w-75'>
                                    <h3>Size:</h3>
                                    <div className='size ms-1 ' >
                                        <div>XS</div>
                                    </div>
                                    <div className='size  ms-1 '>
                                        <div>S</div>
                                    </div>
                                    <div className='size  ms-1 '>
                                        <div>M</div>
                                    </div>
                                    <div className='size ms-1 '>
                                        <div>L</div>
                                    </div>
                                    <div className='size ms-1 '>
                                        <div>XL</div>
                                    </div>
                                </div>
                                <div className='d-flex flex-sm-row flex-column  align-items-center mt-3'> 
                                    <div className='count d-flex   justify-content-between  align-items-center w-100'>
                                        <button className='btn'>-</button>
                                        <p className='my-auto'>2</p>
                                        <button className='btn'>+</button>
                                    </div>
                                    <div >
                                        <button className='btn bg-orange ms-4 mt-2 m-auto' onClick={()=>addToCart(products._id)}>Add To Cart</button>
                                    </div>
                                    <div className='w-100 ms-4 fs-4 mt-2 border d-flex justify-content-center align-items-center rounded' style={{width:"40px",height:"40px"}}>
                                        <i className="fa-regular fa-heart "></i>
                                    </div>
                                </div>
                                <div className='mt-4 border  m-auto'>
                                    <div className='d-flex align-items-center border-bottom p-2'>
                                        <div>
                                            <img src={delivery} alt="delivery" />
                                        </div>
                                        <div className='ms-3'>
                                            <h5>Free Delivery</h5>
                                            <p>Enter your postal code for Delivery Availability</p>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center p-2'>
                                        <div>
                                            <img src={retur} alt="return" />
                                        </div>
                                        <div className='ms-3'>
                                            <h5>Return Delivery</h5>
                                            <p>Free 30 Days Delivery Returns. Details</p>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    </>
  )
}
