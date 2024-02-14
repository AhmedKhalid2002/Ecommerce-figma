import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
export default function CategorySlider() {
    let [categorys,setCategorys]=useState([]);
    async function getSliderCategory(){
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        setCategorys(data.data)
    }
    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
                },
                {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
                }
            ]
    };
    useEffect(()=>{
        getSliderCategory()
    },[])
  return (
    <div className='my-5'>
        <Slider {...settings}>
            {categorys.map((category,index)=><div className="col-md-3" key={category._id}>
                    <div className='position-relative card-prod '>
                        <img src={category.image} style={{width:"200px",height:"200px"}} className='w-100' alt={category.name} />
                        <div>
                            <p className='text-center'>{category.name}</p>
                        </div>
                    </div>
                </div>
            )}
        </Slider>
      </div>
  )
}
