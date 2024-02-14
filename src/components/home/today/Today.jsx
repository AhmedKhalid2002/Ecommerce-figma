import React, { useEffect, useRef, useState } from 'react'
import style from '../today/today.module.css'
export default function Today() {
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
        <div className={`${style.today} mt-5`}>
            <h6>Today’s</h6>
            <div className='sales d-flex align-items-center  mt-5'>
                <h2>Flash Sales</h2>
                <div >
                    <ul className='d-flex justify-content-between align-items-center   '>
                    <li >
                    <p className='fs-12 fw-medium  m-0 mb-1'>Days</p>
                    <span className='h3'>{days<10?`0${days}`:`${days}`}</span>
                    <span className='color-orange ms-2 h3'>:</span>
                    </li>
                    <li className='ms-3'>
                    <p className='fs-12 fw-medium  m-0 mb-1'>Hours</p>
                    <span className='h3'>{hours<10?`0${hours}`:`${hours}`}</span>
                    <span className='color-orange ms-2 h3'>:</span>
                    </li>
                    <li className='ms-3'>
                    <p className='fs-12 fw-medium   m-0 mb-1'>Minutes</p>
                    <span className='h3'>{minutes<10?`0${minutes}`:`${minutes}`}</span>
                    <span className='color-orange ms-2 h3'>:</span>
                    </li>
                    <li className='ms-3'>
                    <p className='fs-12 fw-medium m-0 mb-1'>Seconds</p>
                    <span className='h3'>{seconds<10?`0${seconds}`:`${seconds}`}</span>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}
