import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const CravingoPromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible === false) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "tween", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -top-4 -right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 hover:text-red-600 transition-colors"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {/* Banner Content */}
            <div className="relative bg-orange-50 overflow-hidden rounded-2xl shadow-xl flex flex-col-reverse md:flex-row items-center justify-between p-8 mx-auto max-w-4xl border border-orange-100 font-sans">
              <div className="relative z-10 md:w-2/3 mt-8 md:mt-0 space-y-5 text-center md:text-left">
                <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 font-bold rounded-full text-xs md:text-sm uppercase tracking-wider shadow-sm">
                  Special Promo
                </span>

                <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                  Crush Your Hunger with{" "}
                  <span className="text-orange-600">Cravingo</span>
                </h2>

                <p className="text-lg text-gray-600 font-medium">
                  Claim{" "}
                  <span className="text-red-500 font-extrabold text-xl">
                    50% OFF
                  </span>{" "}
                  your first delivery. Fresh, fast, and right to your door!
                </p>

                <div className="pt-2">
                  <a
                  onClick={() => setIsVisible(false)}
                    href="/login"
                    className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-full transform hover:scale-105 hover:shadow-xl shadow-md transition-transform"
                  >
                    Claim Offer Now
                  </a>
                </div>
              </div>

              <div className="relative z-10 md:w-1/2 flex justify-center md:justify-end">
                <img
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600"
                  alt="Delicious Cravingo Meal"
                  className="w-64 h-64 md:w-70 md:h-70 object-cover rounded-full shadow-2xl border-4 border-white transform md:rotate-0 hover:rotate-20 hover:scale-110 transition duration-300"
                />
              </div>

              <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-br from-transparent to-orange-100 opacity-20 pointer-events-none"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CravingoPromoPopup;
