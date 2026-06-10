import { CookingPot } from 'lucide-react'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
    <div className='max-w-7xl mx-auto flex flex-col items-center justify-between border-t border-gray-400 mt-10 py-10'>
      <div className='flex w-full items-center justify-between'>
        <p className='flex w-full gap-2 text-xl items-center justify-center font-bold'> <CookingPot size={25}/> Cravingo</p>

        <ul className='flex w-full items-center flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 my-2 font-semibold text-zinc-500 cursor-pointer'>
          <li className=''><a href="/">Home</a></li>
          <li className='hover:text-orange-500 transition-colors'><a href="/menu">Our Menu</a></li>
          <li className='hover:text-orange-500 transition-colors'><a href="/about">About</a></li>
          <li className='hover:text-orange-500 transition-colors'><a href="/contact">Contact Us</a></li>
        </ul>
        <ul className='flex w-full items-center justify-center gap-6 sm:gap-8 my-4 cursor-pointer'>
          <FaFacebook className='text-xl md:text-2xl hover:text-orange-500 transition-colors' />
          <FaInstagram className='text-xl md:text-2xl hover:text-orange-500 transition-colors' />
          <FaTwitter className='text-xl md:text-2xl hover:text-orange-500 transition-colors' />
          <FaLinkedin className='text-xl md:text-2xl hover:text-orange-500 transition-colors' />
        </ul>

      </div>
      <div className='my-5 w-full items-center justify-center flex'>
         <p>
            {new Date().getFullYear()} <span className="text-orange-500 font-semibold">Cravingo</span>. All rights reserved,
            Made with ❤ by <span className="text-orange-500 underline font-medium"><a href="https://github.com/Hrushikeshj26" target="_blank" rel="noopener noreferrer">Hrushikeshj26</a></span>
          </p>
      </div>
    </div>
  )
}

export default Footer