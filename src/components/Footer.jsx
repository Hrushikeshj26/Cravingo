import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { GiFireBowl } from 'react-icons/gi';
import { Link } from 'react-router-dom'; // Use Link instead of <a> for internal routing

function Footer() {
  return (
    <footer className='bg-white/95 backdrop-blur-2xl   border-t-2 border-gray-200 mt-20 pt-16 pb-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 text-center md:text-left'>
          
          {/* Brand Section */}
          <div className='flex flex-col items-center md:items-start'>
            <Link to="/" className='flex items-center gap-2 text-3xl font-black text-orange-600 mb-4 hover:scale-105 transition-transform'>
              <GiFireBowl size={36} /> Cravingo
            </Link>
            <p className='text-gray-500 max-w-sm leading-relaxed'>
              Delivering happiness to your doorstep. The best food, cooked with love and fresh ingredients, served blazing hot.
            </p>
          </div>

          {/* Quick Links */}
          <div className='flex flex-col items-center md:items-center'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Quick Links</h3>
            <ul className='flex flex-col gap-3 font-medium text-gray-500'>
              <li><Link to="/" className='hover:text-orange-500 hover:translate-x-1 transition-all inline-block'>Home</Link></li>
              <li><Link to="/menu" className='hover:text-orange-500 hover:translate-x-1 transition-all inline-block'>Our Menu</Link></li>
              <li><Link to="/about" className='hover:text-orange-500 hover:translate-x-1 transition-all inline-block'>About</Link></li>
              <li><Link to="/contact" className='hover:text-orange-500 hover:translate-x-1 transition-all inline-block'>Contact Us</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className='flex flex-col items-center md:items-end'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Follow Us</h3>
            <div className='flex gap-4'>
              {/* Added subtle brand-color hover effects to the social icons */}
              <a href="#" className='bg-gray-50 p-3 rounded-full text-gray-600 hover:text-white hover:bg-blue-600 transition-all shadow-sm hover:shadow-md hover:-translate-y-1'>
                <FaFacebook size={20} />
              </a>
              <a href="#" className='bg-gray-50 p-3 rounded-full text-gray-600 hover:text-white hover:bg-pink-600 transition-all shadow-sm hover:shadow-md hover:-translate-y-1'>
                <FaInstagram size={20} />
              </a>
              <a href="#" className='bg-gray-50 p-3 rounded-full text-gray-600 hover:text-white hover:bg-blue-400 transition-all shadow-sm hover:shadow-md hover:-translate-y-1'>
                <FaTwitter size={20} />
              </a>
              <a href="#" className='bg-gray-50 p-3 rounded-full text-gray-600 hover:text-white hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-1'>
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className='pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500'>
          <p>
            © {new Date().getFullYear()} <span className="font-bold text-orange-500">Cravingo</span>. All rights reserved.
          </p>
          <p>
            Made with ❤ by <a href="https://github.com/Hrushikeshj26" target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold hover:underline">Hrushikesh Jadhav</a>
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;