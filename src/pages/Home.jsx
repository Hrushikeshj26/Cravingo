import React, { useEffect, useState } from "react";
import heroimg from "../assets/herobanner3.jpg";
import heroimg2 from "../assets/herobanner5.jpg";
import heroimg3 from "../assets/hero-banner4.jpg";
import {
  ScrollText,
  Utensils,
  Plus,
  MousePointerClick,
  ChefHat,
  Truck,
  Pizza,
  Coffee,
  Soup,
  Flame,
  Smartphone,
  Mail,
  ArrowRight,
  Star,
  ShieldCheck,
  Clock,
  Quote,
  ChevronDown,
  Salad,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MdDeliveryDining } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../supabase/supabaseClient";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";

const STATS = [
  { label: "Orders delivered", value: "250K+" },
  { label: "Avg. delivery time", value: "28 min" },
  { label: "Partner restaurants", value: "180+" },
  { label: "Customer rating", value: "4.8/5" },
];

const MARQUEE_TAGS = [
  "Biryani",
  "Wood-fired Pizza",
  "Sushi",
  "Burgers",
  "Pasta",
  "Tacos",
  "Ramen",
  "Shawarma",
  "Momos",
  "Pancakes",
  "Bubble Tea",
  "Butter Chicken",
];

const HOW_IT_WORKS = [
  {
    id: 1,
    title: "Choose your meal",
    desc: "Browse 180+ partner kitchens and pick what you love.",
    icon: <MousePointerClick size={35} />,
  },
  {
    id: 2,
    title: "We cook with love",
    desc: "Chefs prepare your order fresh, right when you place it.",
    icon: <ChefHat size={35} />,
  },
  {
    id: 3,
    title: "Fast delivery",
    desc: "Tracked in real time, hot and on time, every order.",
    icon: <Truck size={35} />,
  },
];

const WHY_US = [
  {
    title: "Lightning fast delivery",
    info: "Hot food delivered exactly when you need it, zero delays.",
    icon: <MdDeliveryDining size={25} />,
  },
  {
    title: "Premium quality",
    info: "Made with the finest, locally sourced ingredients.",
    icon: <Utensils size={24} />,
  },
  {
    title: "Verified kitchens",
    info: "Every partner restaurant is hygiene-checked and rated.",
    icon: <ShieldCheck size={24} />,
  },
];

const TESTIMONIALS = [
  {
    name: "Ananya R.",
    role: "Regular customer",
    quote:
      "Food always arrives hot and the tracking is spot on. My go-to app now.",
    rating: 5,
  },
  {
    name: "Karthik S.",
    role: "Food blogger",
    quote: "Great variety from local kitchens you wont find on bigger apps.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Office lunch lead",
    quote:
      "We order for the whole team weekly, delivery is consistently quick.",
    rating: 4,
  },
];

const FAQS = [
  {
    q: "How long does delivery usually take?",
    a: "Most orders arrive within 25-35 minutes, depending on your distance from the restaurant and live traffic conditions.",
  },
  {
    q: "Can I track my order in real time?",
    a: "Yes, once a rider picks up your order you get a live map with GPS tracking and an updated ETA.",
  },
  {
    q: "What payment methods are supported?",
    a: "We accept UPI, credit and debit cards, net banking, and cash on delivery in most serviceable areas.",
  },
  {
    q: "Do you offer support if something goes wrong?",
    a: "Our support team is available in-app for refunds, missing items, or order issues, usually responding within minutes.",
  },
];

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

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-gray-100 rounded-xl bg-white overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base">
          {item.q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-orange-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Home() {
  const [bestSellingDishes, setBestSellingDishes] = useState([]);
  const [loadingDishes, setLoadingDishes] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBestSellingDishes() {
      setLoadingDishes(true);
      const { data, error } = await supabase.from("menu_items").select("*");
      if (error) {
        console.log(error.message);
      } else {
        setBestSellingDishes(data);
      }
      setLoadingDishes(false);
    }
    fetchBestSellingDishes();
  }, []);

  const handleAddToCartClick = (item) => {
    if (!user) {
      navigate("/login");
    } else {
      addToCart(item);
    }
  };

  const bannerImages = [heroimg, heroimg3, heroimg2];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredBestSellingDishes = bestSellingDishes.filter(
    (item) => item.best_selling_prodct === true,
  );

  return (
    <div className="pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- 1. HERO SECTION --- */}
        <div className="relative w-full h-110 sm:h-130 md:h-150 rounded-2xl mt-5 mb-3 overflow-hidden shadow-lg flex items-center">
          <div className="absolute inset-0 bg-linear-to-r from-black/60  via-black/55 to-transparent z-10" />

          <motion.div
            initial={{ opacity: 0, x: -230 }}
            animate={{ opacity: 1, x: 5 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative z-20 px-6 sm:px-12 md:px-16 text-white max-w-2xl"
          >
            <span className="inline-block py-1.5 px-3.5 rounded-md bg-orange-500/20 text-orange-400 font-bold text-xs tracking-widest uppercase mb-4 border border-orange-500/30 backdrop-blur-sm">
              100% Fresh Ingredients
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
              Satisfy your cravings{" "}
              <span className="text-orange-500">instantly</span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-6 font-medium leading-relaxed max-w-lg">
              Hot, delicious food delivered to your door in under 30 minutes
              from 180+ kitchens near you.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 font-bold text-base py-3.5 px-7 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-md shadow-orange-500/30 hover:-translate-y-0.5"
              >
                Explore menu <ArrowRight size={18} />
              </Link>
              <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-300">
                <Star
                  size={16}
                  className="text-orange-400"
                  fill="currentColor"
                />
                <span className="font-semibold text-white">4.8</span> rated by
                12k+ users
              </div>
            </div>
          </motion.div>

          <AnimatePresence initial={false}>
            <motion.img
              key={currentIndex}
              src={bannerImages[currentIndex]}
              alt="Delicious food"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, type: "tween" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {bannerImages.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-6 bg-orange-500" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* --- SIGNATURE MARQUEE STRIP --- */}
        <div className="relative mb-20 overflow-hidden rounded-xl border border-gray-100 bg-white py-3">
          <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-8 px-4">
            {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, idx) => (
              <span
                key={idx}
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                {tag}
              </span>
            ))}
          </div>
          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>
        </div>

        {/* --- STATS STRIP --- */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-20">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-zinc-800 border border-gray-300 rounded-xl px-4 py-6 text-center shadow-lg"
            >
              <p className="text-xl sm:text-2xl font-extrabold text-gray-100">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-sm font-medium text-gray-300 mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* --- 3. BEST SELLING DISHES (compact grid) --- */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Best sellers
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Our most loved and frequently ordered meals.
              </p>
            </div>
            <Link
              to="/menu"
              className="text-sm font-bold text-orange-500 hover:text-orange-600 items-center gap-1 hidden md:flex"
            >
              See all menu <ArrowRight size={14} />
            </Link>
          </div>

          {loadingDishes ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-orange-500" />
            </div>
          ) : filteredBestSellingDishes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 font-medium">
                Updating our best sellers. Please check the full menu!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBestSellingDishes.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-50  w-full overflow-hidden bg-gray-100">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-white/95 text-orange-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col grow">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-4 grow leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
                      <span className="text-lg sm:text-xl font-black text-gray-900">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => handleAddToCartClick(item)}
                        className="bg-gray-900 flex items-center justify-center gap-1 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-500 active:scale-95 transition-all duration-300"
                      >
                        Add <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="md:mt-20 mt-10 text-center md:hidden">
            <Link
              to="/menu"
              className="inline-block font-bold text-orange-500 bg-orange-50 px-6 py-3 rounded-lg w-full text-sm border border-orange-100"
            >
              View full menu
            </Link>
          </div>
        </div>

        {/* --- 4. HOW IT WORKS --- */}
        <div className="bg-white py-8 px-4 rounded-2xl border border-gray-100 mb-20 shadow-sm">
          <div className="text-center mb-10">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-1 block">
              Simple process
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              How it works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full relative">
            <div
              className="absolute z-0 bg-orange-300/90 rounded-full 
            w-[0.4rem] left-10 -translate-x-1/2 top-12 bottom-[15%]
            md:w-auto md:h-[0.4rem] md:left-[15%] md:right-[15%] md:translate-x-0 md:bottom-auto"
            />
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.id}
                className="relative z-10 flex justify-between md:flex-col md:items-center md:text-center"
              >
                <div className="md:w-25 w-20 h-20 md:h-25 bg-white border-[6px] border-orange-300/90 rounded-full flex items-center justify-center text-orange-500 mb-4 shadow-sm transition-transform hover:scale-105">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-md w-65 text-gray-600 max-w-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 5. WHY CHOOSE US (4 items, 2-col compact) --- */}
        <div className="mb-20 grid lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="md:h-110 rounded-2xl overflow-hidden shadow-md relative group order-2 lg:order-1">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img
              src={heroimg2}
              alt="Our service"
              className="w-full md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="flex flex-col gap-4 order-1 lg:order-2">
            <div>
              <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-1 block">
                Our promise
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
                Why Cravingo?
              </h2>
              <p className="text-gray-600 text-md mb-2">
                We prioritize quality, speed, and unforgettable taste in every
                order.
              </p>
            </div>
            <div className="grid sm:grid-cols-1 gap-4">
              {WHY_US.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-gray-300/50 py-4 px-4 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow"
                >
                  <div className="bg-orange-600 text-white p-4 rounded-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-md text-gray-900 mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.info}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- 6. TESTIMONIALS --- */}
        <div className="mb-20">
          <div className="text-center mb-7">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-1 block">
              Loved by foodies
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              What our customers say
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3"
              >
                <Quote size={20} className="text-orange-300" />
                <p className="text-md text-gray-700 font-medium leading-relaxed grow">
                  "{t.quote}"
                </p>
                <StarRating count={t.rating} size={26} />
                <div className="pt-3 border-t border-gray-100">
                  <p className="font-bold text-sm text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 7. FAQ --- */}
        <div className="mb-20">
          <div className="text-center mb-7">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-1 block">
              Got questions?
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Frequently asked questions
            </h2>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FAQS.map((item, idx) => (
              <FaqItem
                key={idx}
                item={item}
                isOpen={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              />
            ))}
          </div>
        </div>

        {/* --- 8. APP PROMO BANNER --- */}
        <div className="bg-gray-900 rounded-2xl p-7 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 mb-20 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_2px,transparent_2px)] bg-size-[22px_22px]" />
          <div className="relative z-10 text-center md:text-left max-w-lg">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2.5 flex items-center justify-center md:justify-start gap-2.5">
              <Smartphone size={24} className="text-orange-500" /> Get the
              Cravingo app
            </h2>
            <p className="text-sm md:text-base text-gray-400 flex items-center justify-center md:justify-start gap-1.5">
              <Clock size={15} className="text-orange-400 shrink-0" />
              Faster ordering, exclusive mobile discounts, and live GPS tracking
              on your phone.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <button className="bg-white text-gray-900 hover:bg-gray-100 text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
              App Store
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              Google Play
            </button>
          </div>
        </div>

        {/* --- 9. NEWSLETTER SUBSCRIPTION --- */}
        <div className="bg-orange-950/85 rounded-2xl p-8 md:p-12 text-center border border-orange-100">
          <div className="w-12 h-12 bg-white text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-orange-100">
            <Mail size={22} />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-100 mb-2.5">
            Subscribe for offers
          </h2>
          <p className="text-sm md:text-base text-gray-200 mb-6 max-w-md mx-auto">
            Join our VIP list to get weekly discounts, early access, and updates
            on new menu items.
          </p>
          <form
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed successfully!");
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="flex-1 bg-white border border-gray-200 text-sm px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-sm hover:-translate-y-0.5"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
