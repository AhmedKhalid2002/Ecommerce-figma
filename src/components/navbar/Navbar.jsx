import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import wishlist from '../../assets/wishlist.png'
import user from '../../assets/user.png'
import cart from '../../assets/Cart.png'
import { UserToken } from '../../Contex/userTokenContext'
import { CartContext } from '../../Contex/CartContext'
export default function Navbar() {
  let {isLogin,setIsLogin}=useContext(UserToken);
  let {numProductCart}=useContext(CartContext);
  let navigate=useNavigate();
  function logOut(){
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail")
    setIsLogin(null);
    navigate("/signIn")
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg border-bottom ">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="">Exclusive</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className={`navbar-nav ${isLogin!=null?'m-auto':'ms-auto'} mb-2 mb-lg-0`}>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="">Home</NavLink>
              </li>
           
              <li className="nav-item">
                <NavLink className="nav-link" to="about">About</NavLink>
              </li>
              {isLogin!=null?"":<>
                <li className="nav-item">
                  <NavLink className="nav-link" to="signUp">Sign Up</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="signIn">Sign In</NavLink>
                </li>
              </>}
              {isLogin!=null?<> 
                <li className="nav-item">
                <NavLink className="nav-link" to="contact">Contact</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="product">Product</NavLink>
              </li>
              <li className="nav-item">
                <span className="nav-link cursor" onClick={logOut}>Logout</span>
              </li> </>:''}
            </ul>
            {isLogin!=null?<>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="wishlist"><img src={wishlist} alt="wishlist"/></NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link" aria-current="page" to="cart">
                  <img src={cart} alt="cart"/>
                  <span className='bg-dark text-white p-1 rounded-2 '>{numProductCart==null?0:numProductCart}</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="profile"><img src={user} alt="user"/></NavLink>
              </li>
            </ul>
            </>:""}
          </div>
        </div>
    </nav>
    </>
  )
}
