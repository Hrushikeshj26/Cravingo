import { LogOut, ShoppingCart, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { GiFireBowl } from 'react-icons/gi';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/authContext';

function Navbar() {
  const { totalItems } = useCart();
  const { user, logOut } = useAuth(); 
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Desktop link styling
  const navLinkClass = ({ isActive }) => 
    `relative px-1 text-[1rem] font-bold transition-colors duration-300 ${
      isActive ? "text-orange-600" : "text-gray-600 hover:text-orange-500"
    } after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  // Mobile link styling
  const mobileNavLinkClass = ({ isActive }) =>
    `block px-6 py-4 text-base font-bold transition-colors border-b border-gray-50 ${
      isActive ? "text-orange-600 bg-orange-50/50" : "text-gray-600 hover:text-orange-500 hover:bg-orange-50/50"
    }`;

  return (
    <nav className='sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm'>
      <div className='flex max-w-7xl mx-auto items-center justify-between px-4 py-4 min-w-10'>
          
          {/* --- LEFT: Logo Section --- */}
          <div className='flex-1 flex justify-start'>
            <Link to="/" onClick={closeMobileMenu} className='flex gap-2 items-center text-[1.6rem] font-black text-orange-600 hover:scale-105 transition-transform'>
              <GiFireBowl size={32}/>
              {/* FIXED: Changed font-extrablack to font-black */}
              <h1 className='tracking-tight font-black'>Cravingo</h1>
            </Link>
          </div>

          {/* --- CENTER: Desktop Navigation Links (Hidden on Mobile) --- */}
          <div className='flex-1 hidden md:flex justify-center items-center gap-8'>
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/menu" className={navLinkClass}>Menu</NavLink>
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

              {/* My Orders - Appears ONLY if a regular customer is logged in */}
              {user && user.email !== 'admin@cravingo.com' && (
                <NavLink to="/myorder" className={navLinkClass}>Orders</NavLink>
              )}
          </div>

          {/* --- RIGHT: Actions (Login/Logout, Cart & Mobile Menu Toggle) --- */}
          <div className='flex-1 flex justify-end items-center gap-3 sm:gap-5'>
            
            {user ? (
              // Logged In State
              <div className='flex gap-2 sm:gap-3 bg-gray-50 border border-gray-200 py-1.5 px-2 sm:px-3 rounded-xl items-center shadow-sm'>
                {/* FIXED: Changed max-w-30 to max-w-32 */}
                <span className='hidden sm:block text-gray-700 font-semibold max-w-32 truncate text-sm'>
                  {user.email}
                </span>
                <button 
                  onClick={logOut}
                  className='text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 sm:p-1.5 rounded-lg transition-all'
                  title="Logout"
                >
                  <LogOut size={18} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              // Logged Out State
              <Link 
                to='/login' 
                className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 sm:px-6 text-sm rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5'
              >
                Login
              </Link>
            )}

            {/* Cart Icon */}
            <Link 
              to='/cart' 
              className='relative p-2 text-gray-700 hover:text-orange-500 transition-colors'
            >
              <ShoppingCart size={28} strokeWidth={2}/>
              
              {/* Only show the badge if there are items in the cart! */}
              {totalItems > 0 && (
                <span className='absolute top-0 right-0 bg-orange-500 border-2 border-white text-white font-bold text-[0.7rem] w-6 h-6 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1 shadow-sm'>
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button (Hidden on Desktop) */}
            <button 
              className='md:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
            </button>

          </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col py-2">
          <NavLink to="/" onClick={closeMobileMenu} className={mobileNavLinkClass}>Home</NavLink>
          <NavLink to="/menu" onClick={closeMobileMenu} className={mobileNavLinkClass}>Menu</NavLink>
          <NavLink to="/about" onClick={closeMobileMenu} className={mobileNavLinkClass}>About</NavLink>
          <NavLink to="/contact" onClick={closeMobileMenu} className={mobileNavLinkClass}>Contact</NavLink>
          
          {user && user.email !== 'admin@cravingo.com' && (
            <NavLink to="/myorder" onClick={closeMobileMenu} className={mobileNavLinkClass}>Orders</NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;