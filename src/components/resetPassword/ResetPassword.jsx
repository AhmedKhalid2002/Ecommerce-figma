import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ResetPassword() {
  let [loading,setLoading]=useState(false);
  let [error,setError]=useState(null);
  let navigate=useNavigate();
  async function resetPassword(value){
    setLoading(true)
    const {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,value).catch((err)=>{
      setError(err)
      console.log(err);
      setLoading(false)
    })
    console.log(data);
    if(data.token){
      navigate("/signIn")
    }
    setLoading(false)
  }

  const validationSchema= Yup.object({
    email:Yup.string().email().required("Email is required"),
    newPassword:Yup.string().matches(/[A-Z][a-z0-9]{5}/,'password not match , Begin capital letter and length 5 letter ').required("Password is required"),
  })

  let formik=useFormik({
    initialValues:{
      email:'',
      newPassword:'',
    },
    onSubmit:resetPassword,
    validationSchema,
  })
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Reset Password</title>
      </Helmet>
        <div className="forgetPass">
          <h3 className='text-center mt-3'>Reset password</h3>
          {error?<p className='alert alert-warning mt-3 w-50 m-auto'>{error.response.data.message}</p>:""}
          <form onSubmit={formik.handleSubmit}>
              <div className='text-center'>
                  <input type="email" id='email' className='form-control mt-3 w-50 m-auto' name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange}   placeholder='Email'/>
                    {formik.errors.email&&formik.touched.email?<p className='alert alert-danger mt-2 w-50 m-auto'>{formik.errors.email}</p>:""}
                  <input type="password" id='password' className='form-control mt-3 w-50 m-auto' name="newPassword" value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange}   placeholder='Password'/>
                  {formik.errors.newPassword&&formik.touched.newPassword?<p className='alert alert-danger mt-2 w-50 m-auto'>{formik.errors.newPassword}</p>:""}
              </div>
              <div className='d-flex justify-content-center align-items-center mt-4'>
              {loading?<button className='btn bg-orange'><i className="fa-solid fa-spinner fa-spin"></i></button>:<button type='submit' className='btn bg-orange '>reset password</button>}
              </div>
          </form>
        </div>
    </>
  )
}
