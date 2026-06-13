import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import heroimg from '../assets/herobanner3.jpg'
import heroimg2 from '../assets/herobanner5.jpg'
import heroimg3 from '../assets/hero-banner4.jpg'
import { Motorbike, ScrollText, Utensils } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { MdDeliveryDining } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase/supabaseClient'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/authContext'


function Home() {

  const [bestSellingDishes, setBestSellingDishes] = useState([]);
  const {addToCart} = useCart();
  const { user } = useAuth();
  const navigate = useNavigate()
  
  useEffect(() => {
    async function fetchBestSellingDishes() {
      const {data, error} = await supabase
      .from('menu_items')
      .select('*');

      if(error){
        console.log(error.message);
      }else{
        setBestSellingDishes(data)        
      }
    }
    fetchBestSellingDishes();
  },[])

  const handleAddToCartClick = (item) => {
    if(!user){
      navigate('/login');
    }else{
      addToCart(item);
    }
  }

  const servicesData = [
    {
      id: 1,
      title: 'Convenient and Reliable',
      info: 'Whether you dine in, take out, or order delivery, our service is convenient, fast, and reliable, making mealtime hassle-free.',
      image: <MdDeliveryDining size={30}/>
    },
    {
      id: 2,
      title: 'Variety of Options',
      info: 'From hearty meals to light snacks, we offer a wide range of options to suit every taste and craving.',
      image: <ScrollText size={25}/>
    },
    {
      id: 3,
      title: 'Quality Food',
      info: 'Whether you dine in, take out, or order delivery, our service is convenient, fast, and reliable, making mealtime hassle-free.',
      image: <Utensils size={25}/>
    },
  ]

  const testimonials = [
  {
    id: 1,
    name: "John Doe",
    review: "Amazing food and excellent service. Highly recommended!",
  },
  {
    id: 2,
    name: "Sarah Smith",
    review: "Best restaurant in town. The ambiance was fantastic.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    review: "Fresh ingredients and delicious meals. Will visit again!",
  },
  {
    id: 4,
    name: "Emily Davis",
    review: "Friendly staff and great taste. Loved it!",
  },
];

const bannerImages = [
  heroimg,
  heroimg3,
  heroimg2 
];


const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
     
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3500); 
    
    return () => clearInterval(timer);
  }, []);


  const filteredBestSellingDishes = bestSellingDishes.filter( (item) => item.best_selling_prodct === true)

  return (
    <div className='max-w-7xl mx-auto'>

    {/* Hero section */}
    {/* Added 'overflow-hidden' to the parent */}
    <div className='w-full relative h-135 rounded-4xl bg-black my-12 flex justify-start items-center overflow-hidden'>
      
      {/* TEXT CONTENT (Unchanged) */}
      <div className='z-10 mx-15 font-bold text-white absolute'>
        <h1 className='text-7xl text-shadow-lg tracking-tight'>
          Order Your Favourate <br /> Food Here
        </h1>
        <p className='text-lg mt-5 mb-20 font-semibold text-shadow-lg w-3xl'>
          Food is what we eat to stay alive and healthy. It comes in many different forms and flavors, from fruits and vegetables to meats and grains.
        </p>
        <Link to={'/menu'} className='font-semibold py-3 px-12 rounded bg-white text-black shadow-xl/30 hover:shadow-xl/40'>
          View Menu
        </Link>
      </div>
      
      {/* SWIPING IMAGE CAROUSEL */}
      <AnimatePresence initial={false}>
        <motion.img

          key={currentIndex} 
          src={bannerImages[currentIndex]}
          alt={`banner-${currentIndex}`}
          
          initial={{ x: "100%", opacity: 0.5 }}
          animate={{ x: 0, opacity: 0.75 }}
          exit={{ x: "-100%", opacity: 0.5 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          
          className='absolute inset-0 w-full h-full object-cover rounded-4xl'
        />
      </AnimatePresence>

    </div>

    {/* Hero 2 section */}
    <div className='w-full pb-10 border-gray-400'>
      <h2 className='text-3xl font-bold'>Why Choose Us!</h2>

      <div className='flex items-center justify-between gap-15 pt-5'>
        <div className='w-full '>
          <img src={heroimg2} alt="" 
          className='w-full h-full rounded-4xl object-cover'
          />
        </div>

        <div className='w-full my-4'>
          {servicesData.map( (items) => 
          (
            <div key={items.id} className='w-full h-auto p-5 border-b border-gray-500 my-3 gap-5 flex items-center bg-gray-100'>
              <div className='bg-orange-600 text-white w-15 h-15 flex items-center justify-center rounded-full'>
                {items.image}
              </div>
              <div className='flex flex-col justify-center'>
                <div className='font-semibold text-lg'>
                  {items.title}
                </div>
                <div className='w-100 text-sm text-gray-600'>
                  {items.info}
                </div>
              </div>
            </div>
          )
          )}
        </div>
      </div>
    </div>

    {/* Hero 2 section */}    

    <div className='w-full my-5 py-20 px-10 border-t border-gray-400 flex flex-col justify-center'>
          <h2 className='text-3xl font-bold'>Our best Seller Dishes</h2>
          <p className='text-[1rem] mt-2 mb-15'>Our fresh garden salad is a light and refreshing option. It features a mix of crisp lettuce, juicy tomatoe all tossed in your choice of dressing.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredBestSellingDishes.map((item) => (
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
                  onClick={() => handleAddToCartClick(item)}
                  className="bg-orange-400 text-white px-12 py-2 rounded-lg text-sm font-bold hover:bg-orange-500 transition-colors cursor-pointer duration-300">
                    Add +
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
    </div>

    {/* Feedback section */}
    <section className="w-full my-10 px-10 py-20 border-t border-gray-400 flex flex-col justify-center overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Customers Say
      </h2>

      <div className="relative overflow-hidden h-50 flex items-center">
        <div className="flex gap-6 animate-scroll">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="min-w-100 bg-gray-100 p-6 rounded-2xl border border-gray-300 shadow-xl"
            >
              <p className="text-gray-700 mb-4">"{item.review}"</p>
              <h3 className="font-semibold text-lg">- {item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    </div>
  )
}

export default Home