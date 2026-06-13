import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/supabaseClient';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function Menu() {

  const {addToCart} = useCart();

  const {user} = useAuth();
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState('all');
  const categories = ['all', 'starters', 'asian', 'indian', 'desserts', 'drinks'];

  useEffect(() => {
    async function fetchMenu() {
      const {data, error} = await supabase
        .from('menu_items')
        .select('*');

        if(error){
          console.log(error.message);
        }else{
          setMenu(data);
        }
        setLoading(false);
    }
    fetchMenu();
  },[])  

  const handleAddToCartClick = (item) => {
    if(!user){
      navigate('/login');
    }else{
      addToCart(item);
    }
  }

  if(loading) return <p className='w-full flex items-center justify-center h-screen font-semibold text-2xl'>Loading Delicous Food...</p>;


 

  const filteredDishes = activeCategory === 'all' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Explore Our Menu
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            From sizzling starters to sweet desserts, find exactly what you're craving.
          </p>
        </div>

        {/* --- CATEGORY BUTTONS (Scrollable on mobile) --- */}
        <div className="flex justify-center">
          <div className="flex space-x-3 overflow-x-auto pb-4 no-scrollbar px-2 my-5">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-8 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#FF4500] text-white shadow-lg/10'
                    : 'bg-gray-100 text-gray-600 shadow-lg/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- FOOD CARDS GRID --- */}
        {/* Shows exactly 5 columns on huge screens, 3 on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 py-10">
          {filteredDishes.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Zoom effect on hover */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold uppercase px-2.5 py-1 rounded-md shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
                  {item.name}
                </h3>
                
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 grow">
                  {item.description}
                </p>
                
                {/* Price and Action Button */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold text-gray-900">
                    {item.price} ₹
                  </span>
                  
                  <button
                  onClick={()=> handleAddToCartClick(item)}
                  className="bg-orange-400 cursor-pointer text-white px-12 py-2 rounded-lg text-sm font-bold hover:bg-orange-500 transition-colors duration-300">
                    Add +
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* --- EMPTY STATE (Just in case a category has no items) --- */}
        {filteredDishes.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-400">No dishes found in this category.</h3>
          </div>
        )}

      </div>
    </div>
  )
}

export default Menu