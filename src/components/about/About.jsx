import React from 'react'
import about from '../../assets/about.png'
import Services from './services/Services'
import Person from './person/Person'
import Service from '../home/service/Service'
import { Helmet } from 'react-helmet'

export default function About() {
return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>About</title>
        </Helmet>
    <div className="container">
            <div className="about mt-4">
                <div className="row">
                    <div className="col-md-6 my-auto">
                        <div >
                            <h2 className='fw-bold h1'>Our Story</h2>
                            <p>
                                Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. 
                                Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 my-4">
                        <img src={about} alt="about" className='w-100' />
                    </div>
                </div>
            </div>
            <Services/>
            <Person/>
            <Service/>
        </div>
    </>
  )
}
