import { LogOut, ShoppingCart } from 'lucide-react'
import React from 'react'
import { GiFireBowl } from 'react-icons/gi'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/authContext'

function Navbar() {
  const { totalItems } = useCart();
  const { user, logOut } = useAuth(); 

  return (
    <div className='max-w-7xl mx-auto flex items-center justify-between border-b-2 border-gray-400 px-5 h-15 pt-10 pb-10'>
        
        {/* Logo Section */}
        <div className='w-full h-full flex gap-2 items-center text-[1.6rem] font-extrabold text-orange-600'>
          <GiFireBowl size={30}/><h1>Cravingo</h1>
        </div>

        {/* Navigation Links (Centered) */}
        <div className='w-full h-full flex list-none justify-between items-center font-semibold text-[1rem] gap-4'>
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
                `relative w-20 text-center after:absolute after:left-0 after:bottom-0
                after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }
            >Our Menu</NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative w-20 text-center after:absolute after:left-0 after:bottom-0
                after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }
            >About</NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative w-20 text-center after:absolute after:left-0 after:bottom-0
                after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }
            >Contact</NavLink>

            {/* ✨ My Orders - Appears in the center list ONLY if a regular customer is logged in */}
            {user && user.email !== 'admin@cravingo.com' && (
              <NavLink
                to="/myorder"
                className={({ isActive }) =>
                `relative w-20 text-center after:absolute after:left-0 after:bottom-0
                after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }
              >Orders</NavLink>
            )}
        </div>

        {/* Right Action Side (Login/Logout & Cart) */}
        <div className='w-full h-full flex justify-end items-center font-semibold gap-5 relative'>
          
          {user ? (
            <div className='flex gap-3 border-2 border-gray-300 shadow-2xs py-2 px-4 text-sm rounded items-center bg-white'>
              <span className='text-gray-700 max-w-30 truncate'>{user.email}</span>
              <Link 
                to='/' 
                onClick={logOut}
                className='text-red-500 hover:scale-95 transition-transform'
              >
                <LogOut size={20} strokeWidth={3} />
              </Link>
            </div>
          ) : (
            <Link to='/login' className='border-2 hover:bg-orange-400 hover:text-white hover:border-black py-2 px-8 text-sm rounded cursor-pointer'>Login</Link>
          )}

          {/* Cart Icon */}
          <Link to='/cart' className='relative'>
            <ShoppingCart size={30} strokeWidth={1.6}/>
            <span className='bg-orange-500 absolute -top-3 -right-2 text-white font-semibold text-[0.8rem] px-[0.4rem] rounded-full'>{totalItems}</span>
          </Link>

        </div>
    </div>
  )
}

export default Navbar