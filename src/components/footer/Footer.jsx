import React from 'react'
import arrow from '../../assets/footerArow.png'
import Qrcode from '../../assets/qrcode.png'
import googlePlay from '../../assets/google-play.png'
import playStore from '../../assets/appstore.png'
import facebook from '../../assets/facebook.png'
import twitter from '../../assets/Twitter.png'
import instagram from '../../assets/instagram.png'
import linkedin from '../../assets/linkedin.png'

export default function Footer() {
  return (
    <>
          <div className="footer-container">
      <div className="footer bg-black p-5">
        <div className='container-fluid'>
          <div className="row text-white g-5 mt-2 ">
            <div className="col-lg-3 ">
              <div>
                <h4>Exclusive</h4>
                <p>Subscribe</p>
                <p>Get 10% off your first order</p>
                <div className='d-flex justify-content-between align-items-center footer-input'>
                  <input type="text" placeholder='Enter your email' className='control bg-transparent' />
                  <img src={arrow} alt="arrow" className='m-2' />
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div>
                <h4>Support</h4>
                <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                <p>exclusive@gmail.com</p>
                <p>+88015-88888-9999</p>
              </div>
            </div>
            <div className="col-lg-2">
              <div>
                <h4>Account</h4>
                <p>My Account</p>
                <p>Login / Register</p>
                <p>Cart</p>
                <p>Wishlist</p>
                <p>Shop</p>
              </div>
            </div>
            <div className="col-lg-2">
              <div>
                <h4>Quick Link</h4>
                <p>Privacy Policy</p>
                <p>Terms Of Use</p>
                <p>FAQ</p>
                <p>Contact</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div>
                <h4>Download App</h4>
                <p>Save $3 with App New User Only</p>
                <div className='d-flex'>
                  <img src={Qrcode} alt="Qrcode" />
                  <div className='d-flex flex-column ms-3 '>
                    <img src={playStore} alt="playStore" />
                    <img src={googlePlay} alt="googlePlay" className='mt-3' />
                  </div>
                </div>
                <div className='social mt-3 d-flex justify-content-between align-items-center'>
                  <img src={facebook} alt="facebook" />
                  <img src={twitter} alt="twitter" />
                  <img src={instagram} alt="instagram" />
                  <img src={linkedin} alt="linkedin" />
                </div>
              </div>
            </div>
            <p className='text-center copyright'>@Copyright Rimel 2022. All right reserved</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
