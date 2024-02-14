import React, { useState } from 'react'
import beatsnoop from '../../assets/beatsnoop.png'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { postSignUp } from '../../redux/Authentication/SignUp';
import { Helmet } from 'react-helmet';
export default function SignUp() {
    let {signUp,isLoading,isError}=useSelector((state)=>state.AuthSignUp);
    let [error,setError]=useState();
    let navigate=useNavigate();
    let dispatchSignUp=useDispatch();
    async function signUpSubmit(value){
        let data=await dispatchSignUp(postSignUp(value));
        try {
            if(data.payload.message=="success"){
                navigate("/signIn")
            }
        } catch (error) {
            setError(data.error.message)        
        }
    }
    
    let schemaValidate=Yup.object(
        {
            name:Yup.string().min(3,"name is more or equal 3 character").max(5,"name is less or equal 5  character").required("name is required"),
            email:Yup.string().email("email not valid").required("email is required"),
            password:Yup.string().matches(/[A-Z][a-z0-9]{5}/,'password not match , Begin capital letter and length 5 letter ').required("Password is required"),
            rePassword:Yup.string().oneOf([Yup.ref('password')], "confirm password not matches password").required("confirm passwor is required"),
            phone:Yup.string().matches(/(002)?01[0-25][0-9]{8}$/,'phone not match').required("phone is required"),
        }
    )
    let formik=useFormik({
        initialValues:{
            name: "",
            email:"",
            password:"",
            rePassword:"",
            phone:"",
        },
        onSubmit:signUpSubmit,
        validationSchema:schemaValidate,
    })
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Sign up</title>
        </Helmet>
        <div className='container-fluid mt-5 singup'>
                <div className="row">
                    <div className="col-lg-6 col-md-7  d-none d-md-block">
                        <img src={beatsnoop} alt="beatsnoop" className='w-100' />
                    </div>
                    <div className="col-lg-6 col-md-5">
                        <div className='account p-5'>
                            {error ?<p className='alert alert-danger'>Acount is already exist </p>:''}
                            <h2>Create an account</h2>
                            <p>Enter your details below</p>
                            <form action="" className='p-4' onSubmit={formik.handleSubmit}>
                                <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}  className='form-control ' placeholder="Name" />
                                {formik.errors.name&&formik.touched.name?<p className='alert alert-danger mt-2'>{formik.errors.name}</p>:''}
                                <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  className='form-control mt-3' placeholder="Email" />
                                {formik.errors.email&&formik.touched.email?<p className='alert alert-danger mt-2'>{formik.errors.email}</p>:''}
                                <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mt-3' placeholder="Password" />
                                {formik.errors.password&&formik.touched.password?<p className='alert alert-danger mt-2'>{formik.errors.password}</p>:''}
                                <input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}  className='form-control mt-3' placeholder="Confirm Password" />
                                {formik.errors.rePassword&&formik.touched.rePassword?<p className='alert alert-danger mt-2'>{formik.errors.rePassword}</p>:''}
                                <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}  className='form-control mt-3' placeholder="Phone" />
                                {formik.errors.phone&&formik.touched.phone?<p className='alert alert-danger mt-2'>{formik.errors.phone}</p>:''}
                                <div className='d-flex justify-content-center mt-3'>
                                    {isLoading?<button className='btn bg-orange'><i className="fa-solid fa-spinner fa-spin"></i></button>
                                    :<button type='submit' className='btn bg-orange' disabled={!(formik.dirty&&formik.isValid)}>Create Account</button>}
                                </div>
                                <div className='d-flex justify-content-center mt-2'>
                                    <p className='d-flex'>Already have account?<Link className='text-orange nav-link' to="/signIn">Log in</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}
