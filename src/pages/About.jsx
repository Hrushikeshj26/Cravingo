import React from 'react'
import aboutbanner from '../assets/herobanner.jpg'
import { ImSpoonKnife } from 'react-icons/im';
import { MdCelebration, MdDeliveryDining } from 'react-icons/md';



function About() {


  const services = [
  {
    id: 1,
    title: "Signature Dine-In Experience",
    description: "Enjoy a warm and inviting atmosphere perfect for any occasion. Our attentive staff is dedicated to providing top-tier hospitality, ensuring that your time with us is relaxing and memorable. Reserve a table for an intimate dinner, a family gathering, or a business lunch, and let us take care of the rest.",
    icon: <ImSpoonKnife/> 
  },
  {
    id: 2,
    title: "Custom Catering & Private Events",
    description: "Bring our culinary expertise to your next big event. Whether it is a corporate gathering, a wedding reception, or a birthday celebration, our catering team works with you to design a personalized menu that fits your theme and budget. We also offer private dining room bookings for an exclusive in-house experience.",
    icon: <MdCelebration/>
  },
  {
    id: 3,
    title: "Seamless Delivery & Takeaway",
    description: "Craving your favorite dishes from the comfort of your home? We offer fast, reliable delivery and easy curbside pickup. All of our takeaway meals are packaged with care to ensure they arrive fresh, hot, and just as delicious as they would be in our dining room.",
    icon: <MdDeliveryDining/>
  }
];

  return (
    <div className="max-w-7xl mx-auto my-8">
        <div className='w-full relative h-50 rounded bg-black flex justify-center items-center'>
        <div  className='z-1 mx-15 font-bold text-white absolute'>
          <h1 className='text-6xl text-shadow-lg tracking-tight'>About Us</h1>
        </div>
      
        <img src={aboutbanner} alt="aboutbanner" 
            className='w-full absolute rounded object-cover h-50 opacity-40'
          />
        </div>


        {/* Section 1 */}
        <div className='my-4 flex items-center justify-between gap-15 w-full h-full py-15 border-b border-gray-400'>
          <div className='w-full h-90 rounded-2xl'>
              <img src='https://imgs.search.brave.com/H-A5OiTU_6NdhKuZK9KHeRHVlBggR6Tnfl43DW0Oxas/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jZG4udHJpcGFk/dmlzb3IuY29tL21l/ZGlhL3Bob3RvLW8v/MTgvMTQvYjUvOTYv/ZGluaW5nLWFyZWEu/anBn' alt="abouotimg" 
                className='h-full w-full object-cover rounded-2xl'
              />
          </div>
          <div className='w-full flex-col text-left p-5'>

              <h1 className='text-4xl font-bold'>Cravingo</h1>
              <p className='w-full mt-10 text-gray-700/90 text-[1rem] font-medium'>Founded by visionary head chef Hrushikesh Jadhav, The Culinary Canvas is a celebration of modern gastronomy and timeless tradition. We believe that a meal is more than just sustenance; it is an experience meant to be savored. By sourcing the finest seasonal ingredients from local artisans, our kitchen crafts innovative dishes that push the boundaries of flavor while honoring classic techniques. Whether you are joining us for an intimate dinner or a grand celebration, our dedicated team is here to provide an unforgettable evening of exceptional food, curated wines, and warm hospitality.</p>

              <button className='bg-orange-400 hover:bg-orange-500 cursor-pointer py-2 px-8 rounded-lg mt-5 text-white font-semibold'>Read More </button>
          </div>
        </div>

        {/* Section 2 */}

        <div className='my-10 flex flex-col items-center justify-center gap-5 w-full h-full py-8'>
            <h1 className='text-4xl font-bold underline'>Our Services</h1>
            <p className='w-full mt-2 text-gray-700/90 text-center text-[1.2rem] font-semibold' >Satisfy Your Cravings with Freshly Prepared Meals Delivered Fast to Your Doorstep.</p>

            <div className='w-full mt-15 flex items-center justify-center gap-5'>
              {services.map( (service) => 
                (
                  <div key={service.id} className='w-100 flex-wrap relative flex flex-col gap-2 p-6 items-center justify-center shadow-2xl/20 bg-gray-100 rounded-2xl border border-gray-300'>
                      <p className='rounded-full absolute -top-8 border-5 text-white text-[1.8rem] bg-orange-600 p-5'>{service.icon}</p>
                      <p className='font-bold text-center bg-orange-100 py-2 px-6 rounded-full text-base mt-8'>{service.title}</p>
                      <p className='line-clamp-5 text-gray-800/80 text-center font-medium tracking-wide text-sm mt-4'>{service.description}</p>
                      <p className='text-blue-600 mt-5 flex justify-end w-full'>read more</p>
                  </div>
                )
              )}
            </div>
        </div>
    </div>
  )
}

export default About