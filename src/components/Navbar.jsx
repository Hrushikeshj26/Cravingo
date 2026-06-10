import { CookingPot, ShoppingBag } from 'lucide-react'
import React from 'react'

function Navbar() {
  return (
    <div className='max-w-7xl mx-auto flex items-center justify-between border-b border-gray-400 px-5 h-15 pt-10 pb-10'>
        <div className='w-full h-full flex gap-2 items-center text-2xl font-bold'>
          <CookingPot size={30}/><h1>Cravingo</h1>
        </div>
       <div className='w-full h-full flex list-none justify-between items-center font-semibold text-[1rem'>
            <li>Home</li>
            <li>Our Menu</li>
            <li>About</li>
            <li>Contact</li>
        </div>
        <div className='w-full h-full flex justify-end items-center font-semibold gap-5'>
          <button className='bg-orange-400 hover:bg-orange-500 text-white py-2 px-8 rounded'>Login</button>

          <ShoppingBag size={30}/>
        </div>
    </div>
  )
}

export default Navbar