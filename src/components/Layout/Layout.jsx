import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  
  return (
    <>
      <Navbar/>
        <Outlet/>
      <Footer/>
    </>
  )
}
