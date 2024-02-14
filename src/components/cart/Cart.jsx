import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Contex/CartContext'
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import cancle from '../../assets/icon-cancel.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Cart() {
  let {getCart,updateCountCart,deleteCart,setNumProductCart}=useContext(CartContext);
  let [showProduct,setShowProduct]=useState(null);
  let [isLoading,setisLoading]=useState(false);
  async function getPrpductFromCart(){
    setisLoading(true)
    let {data}=await getCart();
    setShowProduct(data);
    setNumProductCart(data?.numOfCartItems)
    setisLoading(false)
  }
  async function removeItem(id){
    let {data}= await deleteCart(id);
    setShowProduct(data)
    setNumProductCart(data?.numOfCartItems)
   }
   async function updateItem(id,count){
    let {data}=await updateCountCart(id,count);
    setShowProduct(data);
   }
  useEffect(()=>{
    getPrpductFromCart()
  },[])
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
    </Helmet>
  <div className="container mt-5">
    {isLoading ? (
      <Loading />
    ) : (
      <div className="table-responsive">
        <table className='table table-borderless shadow-sm p-3'>
          <thead>
            <tr className='text-center'>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {showProduct?.data?.products?.map((product) => (
              <tr className='text-center m-auto vertical' key={product?._id}>
                <td className='w-25'><img src={product?.product?.imageCover} alt="" className='w-50' /></td>
                <td>{product?.product?.title?.slice(0, 12).split(', ').join()}</td>
                <td>{product?.price}</td>
                <td>
                  <div className='d-flex justify-content-around align-items-center border w-75 m-auto'>
                    <span className=' '>{product?.count}</span>
                    <div className='d-flex flex-column'>
                      <span className='cursor fw-bold' onClick={() => updateItem(product.product.id, product.count + 1)}>+</span>
                      <span className='cursor fw-bold' onClick={() => updateItem(product.product.id, product.count - 1)}>-</span>
                    </div>
                  </div>
                </td>
                <td><img src={cancle} alt="cancel" className='cursor' onClick={() => removeItem(product?.product.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    <div className='row justify-content-center my-5'>
      <div className="col-lg-6 col-md-8 col-sm-10">
        <div className="cartTotal border border-black p-4">
          <h3>Cart Total</h3>
          <div className='d-flex border-bottom'>
            <p>Number of items:</p>
            <p>{showProduct?.numOfCartItems}</p>
          </div>
          <div className='d-flex mt-2'>
            <p>Total:</p>
            <p>{showProduct?.data?.totalCartPrice} $</p>
          </div>
          <div className='d-flex justify-content-center align-items-center mt-3'>
            <Link className='btn bg-orange' to="/checkout">Proceed to checkout</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  )
}
