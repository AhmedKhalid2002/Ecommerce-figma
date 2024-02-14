import React from 'react'
import style from '../arrival/arrival.module.css'
import arrival1 from '../../../assets/arrival1.png'
import arrival2 from '../../../assets/arrival2.png'
import arrival3 from '../../../assets/arrival3.png'
import arrival4 from '../../../assets/arrival4.png'

export default function Arrival() {
  return (
    <>   
        <div className={`${style.arrival} my-5 p-4`}>
            <h6>Featured</h6>
            <h2 className='mt-4'>New Arrival</h2>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className='bg-black'>
                        <img src={arrival1} alt="arrival1" className='w-100' style={{objectFit:"cover"}}/>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="row g-4">
                        <div className="col-md-12 ">
                            <div className='bg-black'>
                                <img src={arrival3} alt="arrival3" className='w-100' style={{objectFit:"cover"}}/>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className='bg-black p-4'>
                                <img src={arrival2} alt="arrival2" className='w-75' style={{objectFit:"cover"}}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className='bg-black p-4' style={{objectFit:"cover"}}>
                            <img src={arrival4} alt="arrival4" className='w-75' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}
