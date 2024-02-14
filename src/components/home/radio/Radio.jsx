import React, { useContext, useEffect, useRef, useState } from 'react'
import radio from '../../../assets/radio.png'
export default function Radio() {
    let [days,setDays]=useState("00");
    let [hours,setHours]=useState("00");
    let [minutes,setMinutes]=useState("00");
    let [seconds,Setseconds]=useState("00");
    let interval=useRef();
    const startTimer=()=>{
        let dateDowen=new Date('Dec 31, 2024 00:00:00').getTime();
        interval=setInterval(()=>{
            let dayNow=new Date().getTime();
            let diffTime=dateDowen - dayNow;
            let day=Math.floor(diffTime / (1000 * 60 * 60 * 24));
            let hour=Math.floor(diffTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            let minute=Math.floor(diffTime % (1000 * 60 * 60) / (1000 * 60));
            let second=Math.floor(diffTime % (1000 * 60) / 1000);
            if(diffTime < 0){
                clearInterval(interval.current);
            }else{
                setDays(day)
                setHours(hour)
                setMinutes(minute)
                Setseconds(second)
            }
        },1000)
    }
    useEffect(()=>{
        startTimer()
        return ()=>{
            clearInterval(interval.current)
        }
    },[])
  return (
    <>
        <div className="radio">
            <div className="row ">
                <div className="col-md-6 p-5">
                    <h6>Categories</h6>
                    <h2 className='text-white mt-4'>Enhance Your </h2>
                    <h2 className='text-white '>Music Experience</h2>
                    <div className='d-flex justify-content-around align-align-items-center mt-4 '>
                        <div className='circle-radio bg-white d-flex flex-column  justify-content-around align-align-items-center '>
                            <p className='fw-bold m-auto fs-2'>{days}</p>
                            <p className='fs-12 m-auto fw-bold '>Days</p>
                        </div>
                        <div  className=' circle-radio bg-white d-flex flex-column  justify-content-around align-align-items-center  '>
                        <p className='fw-bold m-auto fs-2 '>{hours}</p>
                            <p className='fs-12 m-auto fw-bold '>Hours</p>
                        </div>
                        <div  className=' circle-radio bg-white d-flex flex-column  justify-content-around align-align-items-center  '>
                        <p className='fw-bold m-auto fs-2'>{minutes}</p>
                            <p className='fs-12 m-auto fw-bold '>Minutes</p>
                        </div>
                        <div  className=' circle-radio bg-white d-flex flex-column  justify-content-around align-align-items-center  '>
                        <p className='fw-bold m-auto fs-2'>{seconds}</p>
                            <p className='fs-12 m-auto fw-bold '>Seconds</p>
                        </div>
                    </div>
                    <button className='btn mt-5 text-white px-5 py-3'>Buy Now</button>
                </div>
                <div className="col-md-6 p-4">
                    <img src={radio} alt="" className='w-100' />
                </div>
            </div>
        </div>
    </>
  )
}
