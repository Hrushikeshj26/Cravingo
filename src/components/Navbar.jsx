import { ShoppingBag } from 'lucide-react'
import React from 'react'
import { GiFireBowl } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='max-w-7xl mx-auto flex items-center justify-between border-b-2 border-gray-400 px-5 h-15 pt-10 pb-10'>
        <div className='w-full h-full flex gap-2 items-center text-2xl font-extrabold text-orange-600'>
          <GiFireBowl size={35}/><h1>Cravingo</h1>
        </div>
       <div className='w-full h-full flex list-none justify-between items-center font-semibold text-[1rem]'>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative w-20 text-center after:absolute after:left-0 after:bottom-0
                after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }
            >Home</NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `relative w-20 text-center  after:absolute after:left-0 after:bottom-0
                after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }
            >Our Menu</NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative w-20 text-center  after:absolute after:left-0 after:bottom-0
                after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }
            >About</NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative w-20 text-center  after:absolute after:left-0 after:bottom-0
                after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }
            >Contact</NavLink>

        </div>
        <div className='w-full h-full flex justify-end items-center font-semibold gap-5 '>
          <button className='bg-orange-400 hover:bg-orange-500 text-white py-2 px-8 text-sm rounded cursor-pointer'>Login</button>

          <ShoppingBag size={30} strokeWidth={1.5}/>
        </div>
    </div>
  )
}

export default Navbar