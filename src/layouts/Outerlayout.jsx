import React from 'react'
import { Outlet } from 'react-router-dom'
import Outerheader from '../components/Outerheader'
import Footer from '../pages/shared/Footer'

function Outerlayout() {
  return (
    <div>
        <Outerheader/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Outerlayout