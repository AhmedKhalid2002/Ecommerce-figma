import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <Helmet>
            <meta charSet="utf-8" />
            <title>Not Found</title>
      </Helmet>
        <div className="container vh-100 d-flex flex-column  justify-content-center align-items-center ">
            <h2 className='fs-1 mb-3'>404 Not Found</h2>
            <p className='mb-3'>Your visited page not found. You may go home page.</p>
            <Link className='btn bg-orange' to="">Back to home page</Link>
        </div>
    </>
  )
}
