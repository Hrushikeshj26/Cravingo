import { useState } from "react";
import { useCart } from "../context/cartContext";
import { supabase } from "../supabase/supabaseClient";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../context/authContext";
import UserLogin from "./UserLogin";

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
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            customer_name: customerInfo.name,
            phone: customerInfo.phone,
            address: customerInfo.address,
            total_amount: cartTotal,
            status: "Pending",
          },
        ])
        .select();

      if (orderError) throw orderError;

      const itemsToInsert = cart.map((item) => ({
        order_id: orderData[0].id,
        menu_item_id: item.id,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      alert("🎉 Order placed successfully!");

      clearCart();
      setCustomerInfo({
        name: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      alert("Checkout failed: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="text-7xl mb-4"><ShoppingCart size={80}/></div>

        <h2 className="text-3xl font-bold text-gray-800">
          Your Cart is Empty 
        </h2>

        <p className="text-gray-500 mt-2 text-center">
          Looks like you haven't added any delicious food yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-20 flex items-center justify-center gap-2">
          Your Food Cart <ShoppingCart size={40} />
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-5">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-100 rounded-2xl border-l-5 border-orange-500 shadow-md p-5 flex flex-col sm:flex-row justify-between items-center gap-4"
                >

                  <div>
                    <h3 className="text-base font-semibold text-gray-800">
                      {item.name}
                    </h3>

                    <p className="text-orange-700 tracking-wide font-bold text-lg mt-1">
                      {item.price} ₹
                    </p>

                    {/* <p className="text-gray-500 text-sm">
                      Quantity: {item.quantity}
                    </p> */}
                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 rounded-full hover:bg-orange-600 hover:text-white hover:border-orange-600 font-bold text-black border-2 text-lg transition"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 rounded-full bg-gray-700 hover:bg-orange-600 text-white font-bold text-lg transition"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Checkout Section */}
          <div className="lg:sticky lg:top-24 h-fit">

            <div className="bg-gray-100 rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-6">
                Delivery Details
              </h2>

              <form
                onSubmit={handleCheckout}
                className="space-y-4"
              >

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <textarea
                  name="address"
                  placeholder="Delivery Address"
                  rows="4"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <div className="border-t pt-5">

                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Total Amount</span>

                    <span className="text-orange-700 text-xl font-extrabold tracking-wider">
                      {cartTotal} ₹
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 mt-5 rounded-xl text-white font-semibold transition ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-400 hover:bg-orange-500"
                    }`}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : `Place Order`}
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