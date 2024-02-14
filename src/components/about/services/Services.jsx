import React from 'react'

export default function Service() {
  return (
    <>
        <div className="row my-5 g-4">
            <div className="col-lg-3 col-md-6">
                <div className=' service-card text-center border  border-secondary-subtle p-3  '>
                    <div className='fs-2 bg-secondary icon-service bg-secondary'>
                        <i className="fa-solid fa-store bg-black"></i>
                    </div>
                    <div className='mt-3'>
                        <h4>FREE AND FAST DELIVERY</h4>
                        <p>Free delivery for all orders over $140</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className='service-card text-center border border-secondary-subtle p-3'>
                    <div className='fs-2 icon-service bg-secondary '>
                        <i className="fa-solid fa-dollar-sign bg-black "></i>
                    </div>
                    <div className='mt-3'>
                        <h4>24/7 CUSTOMER SERVICE</h4>
                        <p>Friendly 24/7 customer support</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className='service-card text-center border border-secondary-subtle p-3'>
                    <div className='fs-2 bg-secondary icon-service'>
                        <i class="fa-solid fa-bag-shopping bg-black "></i>
                    </div>
                    <div className='mt-3'>
                        <h4>MONEY BACK GUARANTEE</h4>
                        <p>We reurn money within 30 days</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className='service-card text-center border border-secondary-subtle p-3'>
                    <div className='fs-2 bg-secondary icon-service'>
                        <i class="fa-solid fa-sack-dollar bg-black "></i>
                    </div>
                    <div className='mt-3'>
                        <h4>MONEY BACK GUARANTEE</h4>
                        <p>We reurn money within 30 days</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
