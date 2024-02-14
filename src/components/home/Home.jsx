import React from 'react'
import Banar from './banar/Banar'
import Today from './today/Today'
import SliderProduct from './sliderProduct/SliderProduct'
import CategorySlider from './categorySlider/CategorySlider'
import Radio from './radio/Radio'
import Arrival from './arrival/Arrival'
import Service from './service/Service'
import { Helmet } from 'react-helmet'
export default function Home() {
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
      </Helmet>
      <div className="container home">
          <Banar/>
          <Today/>
          <SliderProduct/>
          <Radio/>
          <CategorySlider/>
          <Arrival/>
          <Service/>
      </div>
    </>
  )
}
