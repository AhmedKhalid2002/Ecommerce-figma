import React, {  useContext, useState } from 'react'
import beatsnoop from '../../assets/beatsnoop.png'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'
import { UserToken } from '../../Contex/userTokenContext';
import { Helmet } from 'react-helmet';


export default function Login() {
    let [error,setError]=useState(null);
    let navigate=useNavigate();
    let [loading,setLoading]=useState(false);
    let {isLogin,setIsLogin}=useContext(UserToken);
    
    let schemaValidate=Yup.object(
        {
            email:Yup.string().email("email not valid").required("email is required"),
            password:Yup.string().matches(/[A-Z][a-z0-9]{5}/,'password not match , Begin capital letter and length 5 letter ').required("Password is required"),
        }
    )
    async function loginSubmit(value){
        setLoading(true)
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,value).catch((error)=>{
            setError(error.response.data.message);
            setLoading(false)
        });
        if(data.message=="success"){
            localStorage.setItem("userToken",data.token);
            localStorage.setItem('userEmail',data.user.email)
            setIsLogin(data.token);
            navigate("/")
        }
        setLoading(false)
    }
  let formik=useFormik({
    initialValues:{
        email:"",
        password:"",
    },
    onSubmit:loginSubmit,
    validationSchema:schemaValidate,
    
})


  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
        </Helmet>
        <div className=' login container-fluid mt-5'>
                <div className="row">
                    <div className="col-lg-6 col-md-7  d-none d-md-block">
                        <img src={beatsnoop} alt="beatsnoop" className='w-100' />
                    </div>
                    <div className="col-lg-6 col-md-5">
                        <div className='account p-5'>
                            {error!=null?<p className='alert alert-danger'>{error}</p>:""}
                            <h2>Log in to Exclusive</h2>
                            <p>Enter your details below</p>
                            <form action="" className='p-4' onSubmit={formik.handleSubmit}>
                                <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  className='form-control mt-3' placeholder="Email" />
                                {formik.errors.email&&formik.touched.email?<p className='alert alert-danger mt-2'>{formik.errors.email}</p>:''}
                                <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mt-3' placeholder="Password" />
                                {formik.errors.password&&formik.touched.password?<p className='alert alert-danger mt-2'>{formik.errors.password}</p>:''}
                                <div className='d-flex justify-content-between align-items-center  mt-2'>
                                    {loading?<button className='btn bg-orange'><i className="fa-solid fa-spinner fa-spin"></i></button>:<button type='submit' className='btn bg-orange '>Login</button>}
                                    <Link className='text-orange nav-link' to="/forgetPass">Forget Password?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}
