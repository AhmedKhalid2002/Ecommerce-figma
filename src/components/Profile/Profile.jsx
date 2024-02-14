import { jwtDecode } from 'jwt-decode'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
export default function Profile() {
  const data=jwtDecode(localStorage.getItem("userToken"));
  const [error,setError]=useState(null)
  async function updatePassword(value){
    let headers={
      token:localStorage.getItem("userToken")
    }
    const {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,value,{headers}).catch((err)=>{
      setError(err);
      console.log(err.response.data.message);
    });
    if(data.message === "success"){
      toast.success('password updated successfully');
    }
    
    console.log(data);
  }
  const passwordValidation=Yup.object({
    currentPassword:Yup.string().matches(/[A-Z][a-z0-9]{5}/,'password not match , Begin capital letter and length 5 letter ').required("Current password is required"),
    password:Yup.string().matches(/[A-Z][a-z0-9]{5}/,'password not match , Begin capital letter and length 5 letter ').required("Password is required"),
    rePassword:Yup.string().oneOf([Yup.ref('password')], "confirm password not matches password").required("confirm passwor is required"),
  })
  const formik =useFormik({
    initialValues:{
      currentPassword:'',
        password:'',
        rePassword:''
    },
    onSubmit:updatePassword,
    validationSchema:passwordValidation,
  })
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Profile</title>
      </Helmet>
    <div className="container m-5">
        <div className='d-flex justify-content-end'>
          <p>welcom <span className='color-orange'>{data.name}</span></p>
        </div>
        <div className="profile_info">
          <div className="row g-4">
            <div className="col-md-3">
              <h5>Manage My Account</h5>
              <div className='p-3'>
                <a href="" className='nav-link color-orange'>My Profile</a>
                <a href="" className='nav-link'>Address Book</a>
                <a href="" className='nav-link'>My Payment Options</a>
              </div>
              <h5>My Order</h5>
              <div className='p-3'>
                <a href="" className='nav-link color-orange'>My Returns</a>
                <Link to="/allorders" className='nav-link'>My order</Link>
              </div>
              <Link className='nav-link' to="/wishlist">My WishList</Link>
            </div>
            <div className="col-md-9 mt-5">
              <h5 className='color-orange'>Edit Your Profile</h5>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="FirstName">First Name</label><br />
                          <input type="text" placeholder={data.name} disabled className='form-control mt-2 bg-light'/>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="LastName" >Last Name</label><br />
                          <input id='LastName' type="text" placeholder='khalid' disabled className='form-control mt-2 bg-light'/>
                        </div>
                        <div className="col-md-6 mt-3">
                          <label htmlFor="Email">Email</label><br />
                          <input type="text" placeholder={localStorage.getItem("userEmail")} disabled className='form-control mt-2 bg-light'/>
                        </div>
                        <div className="col-md-6 mt-3">
                          <label htmlFor="Address" >Address</label><br />
                          <input id='LastName' type="text" placeholder='Kingston, 5236, United State' disabled className='form-control mt-2 bg-light'/>
                        </div>
                        <div className="col-md-12 mt-3">
                            <label htmlFor="Password Changes" >Password Changes</label><br />
                            {error?<p className='alert alert-danger mt-3 '>{error.response.data.message}</p>:""}
                            <input  type="text" name='currentPassword' value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Current Password'  className='form-control mt-3 bg-light'/>
                            {formik.errors.currentPassword&&formik.touched.currentPassword?<p className='alert alert-danger mt-2'>{formik.errors.currentPassword}</p>:''}
                            <input  type="text" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='New Passwod'  className='form-control mt-3 bg-light'/>
                            {formik.errors.password&&formik.touched.password?<p className='alert alert-danger mt-2'>{formik.errors.password}</p>:''}
                            <input  type="text" name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Confirm New Passwod'  className='form-control mt-3 bg-light'/>
                            {formik.errors.rePassword&&formik.touched.rePassword?<p className='alert alert-danger mt-2'>{formik.errors.rePassword}</p>:''}
                            <button type='submit' className=' btn bg-orange mt-3'>Save Changes</button>
                        </div>
                        
                    </div>
                </form>
            </div>
          </div>
        </div>
    </div>
</>
  )
}
