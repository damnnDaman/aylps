import React from 'react'
import TextAnimation from './TextAnimation'
// import Earth from './Earth'
import { Canvas } from '@react-three/fiber'
import GlobeScene from './Globe'
import { Header } from './Header'


const Home = () => {


  return (
    <div className='bg-black'>

      <div className='text-white '>

        <Header text ="As you Like Tour and Travels" />
      </div>
    
      <div className=''>

    <GlobeScene />

      </div>

      
      
    </div>
  )
}

export default Home