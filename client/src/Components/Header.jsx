import React from 'react'
import logo from '../assets/logo.png'
const Header = () => {
  return (
    <div className='h-[10vh] flex items-center justify-between w-full'>
      <div className="logo flex items-center justify-center h-full w-1/2 ">
        <img src={logo} alt="logo" className='w-24'/>
      </div>
      <div className="links  h-full w-1/2 flex items-center justify-center">
        <ul className='flex gap-10 text-lg font-semibold'>
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/login">Login </a>
            <a href="/signup">Sign Up</a>
        </ul>
      </div>
    </div>
  )
}

export default Header
