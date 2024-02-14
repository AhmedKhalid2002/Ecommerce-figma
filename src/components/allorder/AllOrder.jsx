import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function AllOrder() {
    let [userOrder,setUserOrder]=useState(null);
    let [isLoading,setisLoading]=useState(null);
    async function getUserOrder(id){
      setisLoading(true)
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
        setUserOrder(data)
        setisLoading(false);
    }
    
    useEffect(()=>{
      let {id}=jwtDecode(localStorage.getItem('userToken'));
      console.log(id);
      getUserOrder(id)
    },[])
  return (
    
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Orders</title>
        </Helmet>
      <div className="container">
          {isLoading?<Loading/>: userOrder?.map((order)=> <div className="orders rounded  shadow-sm  p-4 m-5" key={order._id}>
            <h2>Order ID : {order?._id}</h2>
            <div className='d-flex justify-content-between align-items-center  mt-3'>
              <h6><span className='text-orange'>Order date:</span> {order.paidAt.slice(0,10)}</h6>
              <p className='text-orange'><i className="fa-solid fa-money-check-dollar me-2"></i>total price : {order?.totalOrderPrice}</p>
            </div>
            <hr />
              {order?.cartItems.map((cart)=><div className='row' key={cart?._id}>
                <div className="col-md-6">
                  <div className='row'>
                    <div className="col-md-6">
                      <img src={cart?.product?.imageCover} className='w-100 rounded mt-2' alt="" />
                    </div>
                    <div className="col-md-6">
                      <p className='text-center mt-5'>{cart?.product?.title.slice(0,15).split(', ').join()}</p>
                      <p>{}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className='text-center mt-5'>${cart?.price}</p>
                  <p className='text-center text-secondary'>oty : {cart?.count}</p>
                </div>
              </div>)}
              <hr />
              <div className='d-flex justify-content-between flex-wrap '>
                <div >
                  <h4>Payment</h4>
                  <p>{order?.paymentMethodType}</p>
                </div>
                <div >
                  <h4>Delivery</h4>
                  <p>Address</p>
                  <p>{order?.shippingAddress?.city}</p>
                  <p>{order?.user?.email}</p>
                  <p>{order?.user?.phone}</p>
                </div>
              </div>
              <hr />
              <div className='d-flex justify-content-between flex-wrap '>
                <div >
                  <h4>Need Help</h4>
                  <p><i className="fa-solid fa-exclamation text-orange me-1"></i>Order Issues</p>
                  <p><i className="fa-solid fa-truck text-orange me-1"></i>Delivery Info</p>
                  <p><i className="fa-solid fa-box text-orange me-1"></i> Returns</p>
                </div>
                <div >
                  <h4>Order Summary</h4>
                  <p>shipping price : {order?.shippingPrice}</p>
                  <p>Tax Price : {order?.taxPrice}</p>
                  <p className='fw-bold'>Total : {order?.totalOrderPrice}</p>
                </div>
              </div>
          </div>
          )
          }
      </div>
    </>
  )
}
