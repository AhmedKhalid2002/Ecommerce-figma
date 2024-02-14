import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgetPassword() {
    let [loading,setloading]=useState(false);
    let [error,setError]=useState("");
    let navigate=useNavigate();

    let validationSchema=Yup.object({
        email:Yup.string().email('Email is not valid ').required("Email is required"),
    });

    let codeValidationSchema=Yup.object({
        resetCode:Yup.string().required("code is required")
    })
    async function sendEmail(value){
        setloading(true)
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,value).catch((err)=>{
            setError(err)
            setloading(false)
        });
        if(data.statusMsg === "success"){
            document.querySelector(".send-email").classList.add('d-none');
            document.querySelector(".verify-code").classList.remove('d-none')
        }
        setloading(false)
    }
    async function sendCode(value){
        setloading(true)
        let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',value).catch((err)=>{
            setError(err)
            setloading(false)
        })
        setloading(false)
        if(data.status === "Success"){
            navigate('/resetPassword')
        }
    }
    let formik=useFormik({
        initialValues:{
            email:''
        },
        validationSchema,
        onSubmit:sendEmail,
    })
    let formikVerify=useFormik({
        initialValues:{
            resetCode:""
        },
        validationSchema:codeValidationSchema,
        onSubmit:sendCode,
    })
  return (
    <>  
        <Helmet>
                <meta charSet="utf-8" />
                <title>Forget Password</title>
        </Helmet>
        <div className="forgetPass send-email">
                <h3 className='text-center mt-3'>Forgot Password</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className='text-center'>
                        <label htmlFor="email" >Enter your registered email </label>
                        <input type="email" id='email' className='form-control mt-1 w-50 m-auto' name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email&&formik.touched.email?<p className='alert alert-danger mt-2 w-50 m-auto'>{formik.errors.email}</p>:''}
                    </div>
                    <div className='d-flex justify-content-center align-items-center mt-4'>
                    {loading?<button className='btn bg-orange'><i className="fa-solid fa-spinner fa-spin"></i></button>:<button type='submit' className='btn bg-orange '>send code</button>}
                    </div>
                </form>
        </div>

        <div className="forgetPass verify-code d-none">
                {error?<p className='alert alert-warning'>Reset code is invalid or has expired</p>:""}
                <h3 className='text-center mt-3'>Forgot Password</h3>
                <form onSubmit={formikVerify.handleSubmit}>
                    <div className='text-center'>
                        <label htmlFor="verify" >Verify Code </label>
                        <input type="text" id='verify' className='form-control mt-1 w-50 m-auto' name="resetCode" value={formikVerify.values.resetCode}  onChange={formikVerify.handleChange} onBlur={formikVerify.handleBlur}/>
                        {formikVerify.errors.resetCode&&formikVerify.touched.resetCode?<p className='alert alert-danger mt-2 w-50 m-auto'>{formikVerify.errors.resetCode}</p>:''}
                    </div>
                    <div className='d-flex justify-content-center align-items-center mt-4'>
                    {loading?<button className='btn bg-orange'><i className="fa-solid fa-spinner fa-spin"></i></button>:<button type='submit' className='btn bg-orange '>verify code</button>}
                    </div>
                </form>
        </div>
    </>
  )
}
