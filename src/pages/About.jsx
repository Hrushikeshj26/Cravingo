import React, { useState } from "react";
import { Link } from "react-router-dom";
import aboutbanner from "../assets/herobanner.jpg";
import { ImSpoonKnife } from "react-icons/im";
import { MdCelebration, MdDeliveryDining } from "react-icons/md";
import {
  ArrowRight,
  Star,
  Leaf,
  Award,
  Clock,
  ShieldCheck,
  Quote,
  MapPin,
  Phone,
} from "lucide-react";

function StarRating({ count }) {
  return (
    <div
      className="flex gap-0.5 text-orange-400"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < count ? "currentColor" : "none"}
          strokeWidth={i < count ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

function About() {
  const [activeReview, setActiveReview] = useState(0);

  const services = [
    {
      id: 1,
      title: "Signature dine-in",
      description:
        "A warm, inviting atmosphere perfect for any occasion, with attentive staff dedicated to top-tier hospitality.",
      icon: <ImSpoonKnife size={22} />,
    },
    {
      id: 2,
      title: "Custom catering",
      description:
        "Bring our culinary expertise to your event. We design a personalized menu that fits your exact theme.",
      icon: <MdCelebration size={24} />,
    },
    {
      id: 3,
      title: "Fast delivery",
      description:
        "Reliable delivery with meals packaged with care, so every order arrives fresh, hot, and delicious.",
      icon: <MdDeliveryDining size={25} />,
    },
  ];

  const values = [
    {
      title: "Farm fresh",
      desc: "We source organic, seasonal ingredients daily from local farmers.",
      icon: <Leaf size={22} />,
    },
    {
      title: "Master chefs",
      desc: "Our kitchen is led by culinary experts with decades of global experience.",
      icon: <Award size={22} />,
    },
    {
      title: "Lightning fast",
      desc: "Optimized kitchen routing ensures your food arrives piping hot.",
      icon: <Clock size={22} />,
    },
    {
      title: "Hygiene first",
      desc: "We maintain a 5-star rating for our spotless kitchen and safe packaging.",
      icon: <ShieldCheck size={22} />,
    },
  ];

  const milestones = [
    {
      year: "2011",
      text: "Cravingo opens its first dining room with a 12-seat kitchen counter.",
    },
    {
      year: "2016",
      text: "Launched catering services after demand from local corporate clients.",
    },
    {
      year: "2020",
      text: "Introduced app-based delivery, reaching homes across the city in under 30 minutes.",
    },
    {
      year: "2025",
      text: "Crossed 10,000 happy guests served across dine-in, catering, and delivery.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      {/* --- 1. HERO BANNER --- */}
      <div className="relative md:w-7xl w-full h-50 flex rounded-b-3xl items-center justify-center overflow-hidden">
        <div className="absolute inset-0 rounded-b-3xl bg-linear-to-r from-black/80 via-black/60 to-black/80 z-10" />
        <img
          src={aboutbanner}
          alt="About Cravingo"
          className="absolute inset-0 w-full h-50 object-cover scale-105"
        />
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
          <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-sm mb-3">
            Our heritage
          </span>
          <h1 className="md:text-5xl text-2xl font-extrabold text-white tracking-tight drop-shadow-2xl mb-4">
            About us
          </h1>
          <p className="text-gray-200 text-sm md:text-base font-medium drop-shadow-md max-w-xl">
            Discover the passion, history, and culinary magic behind every dish
            we serve at Cravingo.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* --- 2. OUR STORY SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-14">
          {/* Left: Image with offset design */}
          <div className="relative w-full h-80 md:h-95 rounded-2xl group">
            <div className="absolute inset-0 bg-orange-500 rounded-2xl translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
            <img
              src="https://imgs.search.brave.com/H-A5OiTU_6NdhKuZK9KHeRHVlBggR6Tnfl43DW0Oxas/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jZG4udHJpcGFk/dmlzb3IuY29tL21l/ZGlhL3Bob3RvLW8v/MTgvMTQvYjUvOTYv/ZGluaW5nLWFyZWEu/anBn"
              alt="Cravingo dining area"
              className="absolute inset-0 h-full w-full object-cover rounded-2xl shadow-lg z-10"
            />
          </div>

          {/* Right: Text Content & Stats */}
          <div className="flex flex-col justify-center md:my-12">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2">
              The beginning
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
              Redefining the{" "}
              <span className="text-orange-500">culinary experience</span>
            </h2>

            <div className="space-y-3 text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              <p>
                Founded by visionary head chef{" "}
                <strong className="text-gray-900">Hrushikesh Jadhav</strong>,
                Cravingo is a celebration of modern gastronomy and timeless
                tradition. A meal is more than sustenance, it's an experience
                meant to be savored.
              </p>
              <p>
                By sourcing the finest seasonal ingredients from local artisans,
                our kitchen crafts innovative dishes that push the boundaries of
                flavor while honoring classic technique.
              </p>
            </div>

            <div className="grid grid-cols-3 w-full place-content-center place-items-center gap-4 p-5 border-t border-gray-400">
              <div>
                <h4 className="text-2xl font-black text-gray-900 mb-0.5">
                  15+
                </h4>
                <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                  Years exp.
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-black text-gray-900 mb-0.5">
                  50+
                </h4>
                <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                  Dishes
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-black text-gray-900 mb-0.5">
                  10k+
                </h4>
                <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                  Happy guests
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. CORE VALUES (Gray Background) --- */}
      <div className="bg-gray-100/70 mx-5 md:my-10 py-16 rounded-2xl shadow-xl">
        <div className="max-w-7xl px-8 mx-auto">
          <div className="text-center mb-10">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-1 block">
              Why choose us
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              The Cravingo difference
            </h2>
          </div>

          <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-400 border-t border-b border-gray-400">
            {values.map((val, idx) => (
              <div key={idx} className="flex items-start gap-2 py-4 px-3">
                <div className="text-orange-500 shrink-0 mt-1">{val.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {val.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- 5. OUR SERVICES --- */}
        <div className="py-25">
          <div className="text-center mb-20">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-3xl font-extrabold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-700 text-base max-w-2xl mx-auto">
              Satisfy your cravings with freshly prepared meals, whether you are
              dining in with us or relaxing at home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {services.map((service) => (
              <div
                key={service.id}
                className="relative flex flex-col bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 pt-15 group"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900 text-center mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-base text-center leading-relaxed grow mb-8">
                  {service.description}
                </p>
                <Link
                  to="/menu"
                  className="my-2 text-orange-500 font-bold uppercase text-sm tracking-wider flex items-center justify-center gap-1 hover:text-orange-600 transition-colors"
                >
                  Order Now <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* --- 7. VISIT US --- */}
        <div className="py-14 border-t border-gray-400 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-900">
          <div className="flex items-center justify-center gap-4 pb-6 sm:pb-0 sm:pr-8">
            <MapPin size={30} className="text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                Visit our kitchen
              </h3>
              <p className="text-sm text-gray-900 leading-relaxed">
                42 MG Road, Mysuru, Karnataka. Open daily, 11am to 11pm.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 pb-6 sm:pb-0 sm:pr-8">
            <Phone size={30} className="text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                Talk to us
              </h3>
              <p className="text-sm text-gray-900 leading-relaxed">
                Catering inquiries and reservations: +91 98765 43210.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 8. CALL TO ACTION BANNER --- */}
      <div className="md:w-7xl w-full px-4 mb-12">
        <div className="bg-gray-900 w-full py-20 px-5 md:px-10 rounded-2xl text-center shadow-lg">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
            Hungry? Let's fix that.
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-7 max-w-lg mx-auto">
            Explore our menu of hand-crafted dishes and experience the best food
            delivery in the city today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/menu"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:-translate-y-0.5 text-sm"
            >
              Explore menu
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-gray-700 hover:border-white text-white font-bold py-3 px-8 rounded-xl transition-all hover:bg-gray-800 text-sm"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
