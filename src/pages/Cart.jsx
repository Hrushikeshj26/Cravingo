import { useState } from "react";
import { useCart } from "../context/cartContext";
import { supabase } from "../supabase/supabaseClient";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom"; // Added for the empty state button

export default function Cart() {
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  const { user } = useAuth();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save order to database
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user?.id,
            customer_name: customerInfo.name,
            phone: customerInfo.phone,
            address: customerInfo.address,
            total_amount: cartTotal,
            status: "Pending",
          },
        ])
        .select();

      if (orderError) throw orderError;

      // Save order items
      const itemsToInsert = cart.map((item) => ({
        order_id: orderData[0].id,
        menu_item_id: item.id,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      alert("Order placed successfully!");
      clearCart();
      setCustomerInfo({ name: "", phone: "", address: "" });
    } catch (error) {
      alert("Checkout failed: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- EMPTY CART UI ---
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center px-4">
        <div className="bg-orange-100 p-6 rounded-full text-orange-500 mb-6">
          <ShoppingCart size={60} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added any delicious food yet.
        </p>
        <Link
          to="/"
          className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-sm"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  // --- MAIN CART UI ---
  return (
    <div className="min-h-screen py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 flex items-center gap-3">
          <ShoppingCart size={32} className="text-orange-500" /> Checkout
        </h1>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Side: Cart Items */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden group"
              >
                {/* Orange accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-200"></div>

                <div className="pl-4 w-full sm:w-auto text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-orange-600 font-extrabold text-lg mt-0.5">
                    ₹{item.price}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  {/* Modern Pill Quantity Controls */}
                  <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-orange-500 transition-colors"
                    >
                      <Minus size={16} strokeWidth={3} />
                    </button>
                    <span className="w-10 text-center font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-orange-500 transition-colors"
                    >
                      <Plus size={16} strokeWidth={3} />
                    </button>
                  </div>

                  {/* Clean Trash Icon */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Delivery Details Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Delivery Details
              </h2>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    placeholder="Full street address..."
                    rows="3"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="border-t border-gray-100 pt-6 mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-500 font-medium">
                      Total to pay
                    </span>
                    <span className="text-orange-600 text-2xl font-black">
                      ₹{cartTotal}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition-all ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5"
                    }`}
                  >
                    {isSubmitting ? "Processing..." : "Confirm Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
