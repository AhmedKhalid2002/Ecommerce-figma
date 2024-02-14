import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { CartContext } from '../../Contex/CartContext'
import { Helmet } from 'react-helmet'
export default function Checkout() {
    let {onlinePayment}=useContext(CartContext)
    let schemaValidate=Yup.object(
        {
            details:Yup.string().required("details is required"),
            phone:Yup.string().matches(/(002)?01[0-25][0-9]{8}$/,'phone not match').required("phone is required"),
            city:Yup.string().required("city is required"),
        }
    )
    async function payment(values){
        let {data} =await onlinePayment(values)
        window.location=data?.session?.url
        console.log(data);
    }

    let formik=useFormik({
        initialValues:{
            details: "",
            phone: "",
            city: ""
        },
        onSubmit:payment,
        validationSchema:schemaValidate,
    })
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Check out</title>
        </Helmet>
        <div className='container-fluid mt-5'>
                        <div className='payment p-5'>
                            <form action="" className='p-4' onSubmit={formik.handleSubmit}>
                                <input type="text" name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}  className='form-control mt-3' placeholder="Details" />
                                {formik.errors.details&&formik.touched.details?<p className='alert alert-danger mt-2'>{formik.errors.details}</p>:''}
                                <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mt-4' placeholder="Phone" />
                                {formik.errors.phone&&formik.touched.phone?<p className='alert alert-danger mt-2'>{formik.errors.phone}</p>:''}
                                <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mt-4' placeholder="City" />
                                {formik.errors.city&&formik.touched.city?<p className='alert alert-danger mt-2'>{formik.errors.city}</p>:''}
                                <button className='btn bg-orange float-end mt-3'>Buy Now</button>
                            </form>
                        </div>
        </div>
    </>
  )
}
