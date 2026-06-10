import React from 'react'
import Navbar from '../components/Navbar'
import heroimg from '../assets/herobanner3.jpg'
import heroimg2 from '../assets/herobanner2.jpg'
import { Motorbike, ScrollText, Utensils } from 'lucide-react'
import { bestSellers } from '../data/bestSellers'
import { Link } from 'react-router-dom'
import { MdDeliveryDining } from 'react-icons/md'

function Home() {


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

  return (
    <div className='max-w-7xl mx-auto'>

    {/* Hero section */}
    <div className='w-full relative h-135 rounded-4xl bg-black my-12 flex justify-start items-center'>
        <div  className='z-1 mx-15 font-bold text-white absolute'>
          <h1 className='text-7xl text-shadow-lg tracking-tight'>Order Your Favourate <br /> Food Here</h1>

        <p className='text-lg mt-5 mb-20 font-semibold text-shadow-lg w-3xl'>Food is what we eat to stay alive and healthy. It comes in many different forms and flavors, from fruits and vegetables to meats and grains.</p>

        <Link to={'/menu'} className='font-semibold py-3 px-12 rounded bg-white text-black shadow-xl/30 hover:shadow-xl/40'>View Menu</Link>
        </div>
      
     <img src={heroimg} alt="heroimg" 
        className='w-full rounded-4xl absolute object-cover h-full opacity-75'
      />
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
              <div className='bg-orange-500 text-white w-15 h-15 flex items-center justify-center rounded-full'>
                {items.image}
              </div>
              <div className='flex flex-col justify-center'>
                <div className='font-semibold text-lg'>
                  {items.title}
                </div>
                <div className='w-100 text-sm text-gray-500'>
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
          {bestSellers.map((dish) => (
            <div 
              key={dish.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Zoom effect on hover */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold uppercase px-2.5 py-1 rounded-md shadow-sm">
                  {dish.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
                  {dish.name}
                </h3>
                
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 grow">
                  {dish.info}
                </p>
                
                {/* Price and Action Button */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold text-gray-900">
                    ${dish.price}
                  </span>
                  
                  <button className="bg-orange-400 text-white px-12 py-2 rounded-lg text-sm font-bold hover:bg-orange-500 transition-colors cursor-pointer duration-300">
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

      <div className="relative overflow-hidden">
        <div className="flex gap-6 animate-scroll">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="min-w-75 bg-gray-100 p-6 rounded-2xl border border-gray-400 shadow"
            >
              <p className="text-gray-600 mb-4">"{item.review}"</p>
              <h3 className="font-semibold text-lg">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    </div>
  )
}

export default Home