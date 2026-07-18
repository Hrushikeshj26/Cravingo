import React, { useState } from "react";
import { MapPin, Phone, Mail, ChefHat } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Get in Touch
        </h1>
        <p className="mt-3 text-sm md:text-base text-gray-500 max-w-xl mx-auto">
          Have a question, feedback, or want to book an event? We would love to
          hear from you!
        </p>
      </div>

      {/* Main Container - Adjusted to max-w-5xl for a compact look */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left Side: Contact Information */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Info</h2>

          {/* Compact Info Cards */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-xl shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Location
              </p>
              <p className="text-sm font-bold text-gray-800">
                123 Flavor Street, Foodie District
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-xl shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Phone
              </p>
              <p className="text-sm font-bold text-gray-800">
                +1 (555) 123-4567
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-xl shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Email
              </p>
              <p className="text-sm font-bold text-gray-800">
                hello@cravingo.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-xl shrink-0">
              <ChefHat size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Management
              </p>
              <p className="text-sm font-bold text-gray-800">
                Hrushikesh Jadhav
              </p>
            </div>
          </div>

          {/* Compact Hours */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Opening Hours
            </h3>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Mon - Fri</span>
              <span className="font-bold text-gray-900">
                10:00 AM - 10:00 PM
              </span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>Sat - Sun</span>
              <span className="font-bold text-gray-900">
                9:00 AM - 11:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm font-medium"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm font-medium"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="3"
                className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all resize-none text-sm font-medium"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 mt-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
