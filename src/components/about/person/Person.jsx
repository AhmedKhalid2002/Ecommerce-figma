import React from 'react'
import person1 from '../../../assets/person1.png'
import person2 from '../../../assets/person2.png'
import person3 from '../../../assets/person3.png'

export default function Person() {
return (
    <>
        <div className="person my-5">
            <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                    <div>
                        <img src={person1} className='w-100'  alt="person1" />
                        <h3 className='mt-3'>Tom Cruise</h3>
                        <p>Founder & Chairman</p>
                        <div className='d-flex'>
                            <i className="fa-brands fa-twitter "></i>
                            <i className="fa-brands fa-instagram ms-3"></i>
                            <i className="fa-brands fa-linkedin-in ms-3"></i>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div>
                        <img src={person2} className='w-100'  alt="person2" />
                        <h3 className='mt-3'>Emma Watson</h3>
                        <p>Managing Director</p>
                        <div className='d-flex'>
                            <i className="fa-brands fa-twitter "></i>
                            <i className="fa-brands fa-instagram ms-3"></i>
                            <i className="fa-brands fa-linkedin-in ms-3"></i>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div>
                        <img src={person3} className='w-100'  alt="person3" />
                        <h3 className='mt-3'>Will Smith</h3>
                        <p>Product Designer</p>
                        <div className='d-flex'>
                            <i className="fa-brands fa-twitter "></i>
                            <i className="fa-brands fa-instagram ms-3"></i>
                            <i className="fa-brands fa-linkedin-in ms-3"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}
