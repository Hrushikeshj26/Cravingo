import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  X,
  Check,
  ArrowUpDown,
  SlidersHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const CATEGORIES = ["all", "starters", "asian", "indian", "desserts", "drinks"];

const SORT_OPTIONS = [
  { value: "default", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A to Z" },
];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col animate-pulse">
      <div className="h-40 w-full bg-gray-100" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 w-3/4 bg-gray-100 rounded" />
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-5/6 bg-gray-100 rounded" />
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="h-5 w-12 bg-gray-100 rounded" />
          <div className="h-8 w-16 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function Menu() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      const { data, error } = await supabase.from("menu_items").select("*");

      if (error) {
        console.log(error.message);
      } else {
        setMenu(data);
      }
      setLoading(false);
    }
    fetchMenu();
  }, []);

  const handleAddToCartClick = (item) => {
    if (!user) {
      navigate("/login");
    } else {
      addToCart(item);
      setToast(item.name);
      window.clearTimeout(window.__menuToastTimer);
      window.__menuToastTimer = window.setTimeout(() => setToast(null), 2200);
    }
  };

  const categoryCounts = useMemo(() => {
    const counts = { all: menu.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== "all")
        counts[cat] = menu.filter((m) => m.category === cat).length;
    });
    return counts;
  }, [menu]);

  const filteredDishes = useMemo(() => {
    let result =
      activeCategory === "all"
        ? menu
        : menu.filter((item) => item.category === activeCategory);

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.name?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q),
      );
    }

    const sorted = [...result];
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "name-asc")
      sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    return sorted;
  }, [menu, activeCategory, searchTerm, sortBy]);

  const clearFilters = () => {
    setActiveCategory("all");
    setSearchTerm("");
    setSortBy("default");
  };

  const hasActiveFilters = activeCategory !== "all" || searchTerm.trim() !== "";

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans relative">
      <div className="max-w-8xl mx-auto">
        {/* --- HEADER --- */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Explore our menu
          </h2>
          <p className="mt-2 text-gray-500 text-sm md:text-base max-w-xl mx-auto">
            From sizzling starters to sweet desserts, find exactly what you're
            craving.
          </p>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="max-w-4xl mx-auto mb-6 relative">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dishes, e.g. paneer, noodles..."
            className="w-full bg-white border border-gray-200 text-sm pl-11 pr-10 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* --- CATEGORY BUTTONS --- */}
        <div className="flex items-center justify-center backdrop-blur-sm mb-5">
          <div className="flex items-center px-2 md:justify-center h-20 w-full gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap flex justify-center items-center px-8 py-2.5 rounded-xl text-sm font-bold capitalize text-center transition-all duration-300 shadow-sm shrink-0 ${
                  activeCategory === category
                    ? "bg-orange-500 text-white shadow-orange-500/30"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- RESULTS BAR: count + sort --- */}
        <div className="flex items-center justify-between mb-5 px-1">
          <p className="text-sm text-gray-500">
            {loading ? (
              "Loading dishes..."
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {filteredDishes.length}
                </span>{" "}
                of {menu.length} dishes
              </>
            )}
          </p>

          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 px-3.5 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <ArrowUpDown size={14} />
              <span className="hidden sm:inline">
                {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              </span>
              <span className="sm:hidden">Sort</span>
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-40"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setSortOpen(false);
                      }}
                      className={`w-full flex items-center justify-between text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === opt.value
                          ? "text-orange-600 font-semibold bg-orange-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                      {sortBy === opt.value && <Check size={14} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- FOOD CARDS GRID --- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <SlidersHorizontal
              size={28}
              className="text-gray-300 mx-auto mb-3"
            />
            <h3 className="text-lg font-bold text-gray-700 mb-1">
              No dishes match your filters
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              Try a different search term or category.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-orange-500 font-bold text-sm bg-orange-50 px-5 py-2.5 rounded-lg hover:bg-orange-100 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDishes.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-50 w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm text-orange-600 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 flex flex-col grow">
                  <h3 className="text-base font-bold text-gray-900 leading-tight mb-1 truncate">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 grow leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200">
                    <span className="text-lg font-black text-gray-900">
                      ₹{item.price}
                    </span>

                    <button
                      onClick={() => handleAddToCartClick(item)}
                      className="bg-gray-900 flex items-center justify-center gap-1 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-500 active:scale-95 transition-all duration-300"
                    >
                      Add <Plus size={13} strokeWidth={4} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- ADD TO CART TOAST --- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 z-50 bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2"
          >
            <div className="bg-orange-500 rounded-full p-1">
              <Check size={12} strokeWidth={3} />
            </div>
            {toast} added to cart
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Menu;
