import React, { useState } from 'react';
import { MapPin, Phone, Mail, ChefHat } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thanks for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen py-16 px-6 sm:px-12 lg:px-24">

      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Get in Touch with <span className="text-orange-500">Cravingo</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Have a question, feedback, or want to book a large event? We'd love to hear from you!
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Contact Information */}
        <div className="bg-white rounded-3xl shadow-xl p-10 border-t-8 border-orange-500">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
          
          <div className="space-y-6 text-gray-600">
            <div className="flex items-start">
              <MapPin className="text-orange-500 w-7 h-7 mr-4 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Our Location</h3>
                <p>123 Flavor Street, Foodie District<br />Culinary City, CC 90210</p>
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="text-orange-500 w-7 h-7 mr-4 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="text-orange-500 w-7 h-7 mr-4 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Email</h3>
                <p>hello@cravingo.com</p>
              </div>
            </div>

            <div className="flex items-center">
              <ChefHat className="text-orange-500 w-7 h-7 mr-4 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Management</h3>
                <p>Hrushikesh Jadhav</p>
              </div>
            </div>

            <hr className="border-orange-100 my-6" />

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Opening Hours</h3>
              <ul className="space-y-1">
                <li className="flex justify-between"><span>Monday - Friday</span> <span>10:00 AM - 10:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday - Sunday</span> <span>9:00 AM - 11:00 PM</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-gray-50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-gray-50"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-gray-50 resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}