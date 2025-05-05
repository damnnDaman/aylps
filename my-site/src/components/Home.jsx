import React from 'react'
import TextAnimation from './TextAnimation'
// import Earth from './Earth'
import { Canvas } from '@react-three/fiber'
import GlobeScene from './Globe'
import { Header } from './Header'


const Home = () => {


  return (
    <div className=''>

      <div className='position-absolute z-index-2'>

        <Header text ="As you Like Tour and Travels" />
      </div>
    
      <div className='position-relative'>

    <GlobeScene />

      </div>

      
      
    </div>
  )
}

export default Home