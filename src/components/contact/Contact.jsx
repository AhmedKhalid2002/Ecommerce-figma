import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Contact() {
    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_k1k3zfn', 'template_wtjijg9', form.current, {
                publicKey: 'u9Ch_9wNRr_yy9fwV',
            })
            .then(
                () => {
                    toast.success('The email was sent successfully')
                },
                (error) => {
                    toast.error(error.text)
                },
            );
        };
        
  return (
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Contact us</title>
        </Helmet>
        <div className="contact ">
            <div className="container ">
                <div className="row my-5 g-4">
                    <div className="col-md-4">
                        <div>
                            <div className='d-flex'>
                                <div className='icon-orange'>
                                    <i className="fa-solid fa-phone fs-5 icon-orange"></i>
                                </div>
                                <p className='ms-2 my-auto '>Call To Us</p>
                            </div>
                            <p className='mt-2'>We are available 24/7, 7 days a week.</p>
                            <p>Phone: 01050541668</p>
                        </div>
                        <hr />
                        <div>
                            <div className='d-flex '>
                                <div className='icon-orange'>
                                    <i className="fa-solid fa-envelope fs-5 "></i>
                                </div>
                                <p className='ms-2 my-auto '>Write To US</p>
                            </div>
                            <p className='mt-2'>Fill out our form and we will contact you within 24 hours.</p>
                            <p>Emails: ahmedokab2002@gmail.com</p>
                            <p>Emails: kmalahmdkhald927@gmail.com</p>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <form action="" ref={form} onSubmit={sendEmail}>
                            <div className='d-flex justify-content-between '>
                                <input type="text" name="to_name" className='form-control bg-secondary-subtle ' placeholder="Your Name  "/>
                                <input type="text"  name="from_name" className='form-control ms-3 bg-secondary-subtle' placeholder ="Your Email  "/>
                                <input type="text" name='phone' className='form-control ms-3 bg-secondary-subtle' placeholder ="Your Phone "/>
                            </div>
                            <textarea className='form-control bg-secondary-subtle mt-4 p-5' name="message" placeholder="Your Massege" ></textarea>
                            <button className='btn bg-orange mt-3 float-end '>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
