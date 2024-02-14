import React, {  useEffect, useState } from 'react'
import Slider from "react-slick";
import banar from "../../../assets/banar.png"
import banar2 from "../../../assets/banar2.jpg"
import banar3 from "../../../assets/banar3.jpg"
import banar4 from "../../../assets/banar4.jpg"
import banar5 from "../../../assets/banar5.jpg"
import banar6 from "../../../assets/banar6.jpg"
import banar7 from "../../../assets/banar7.jpg"
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../Loading/Loading';

export default function Banar() {
    let [category,setCategory]=useState([]);
    let [isLoading,setIsLoadind]=useState(false)
    async function getCategory(){
        setIsLoadind(true)
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        setIsLoadind(false)
        setCategory(data.data)

    }
    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    useEffect(()=>{
        getCategory()
    },[])
  return (
    <>
        <div className="row g-3">
            <div className="col-lg-3 border-0 border-end">
                <ul className='mt-4 banar-text'>
                    {isLoading?<Loading/>:category.map((categories)=>
                        <li key={categories._id}> <Link to={`/spicificProduct/${categories._id}`} className='nav-link '>{categories.name} <i className="fas fa-angle-right m-2"></i></Link></li>
                    )}
                </ul>
            </div>
        <div className="col-lg-9 mt-4">
        <Slider {...settings}>
            
            <img src={banar} alt="banar" className='w-100' />
            <img src={banar2} alt="banar" className='w-100' />
            <img src={banar3} alt="banar" className='w-100' />
            <img src={banar4} alt="banar" className='w-100' />
            <img src={banar5} alt="banar" className='w-100' />
            <img src={banar6} alt="banar" className='w-100' />
            <img src={banar7} alt="banar" className='w-100' />
        </Slider>
        </div>
        </div>
    </>
)
}
