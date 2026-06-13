import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient"; // Adjust path
import { useAuth } from "../context/authContext";
import { Package } from "lucide-react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // If not logged in, do nothing
    if (!user) return;

    // 1. Fetch initial orders
    const fetchMyOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id) // Only get THIS user's orders
        .order("id", { ascending: false });

      if (!error) setOrders(data);
      setLoading(false);
    };

    fetchMyOrders();

    // 2. Set up the LIVE listener
    const orderSubscription = supabase
      .channel("live-order-tracking")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${user.id}`, // Only listen to changes for this user
        },
        (payload) => {
          // When the database changes, update the screen instantly!
          console.log("Order updated live!", payload.new);
          setOrders((currentOrders) =>
            currentOrders.map((order) =>
              order.id === payload.new.id ? payload.new : order
            )
          );
        }
      )
      .subscribe();

    // 3. Cleanup connection when they leave the page
    return () => {
      supabase.removeChannel(orderSubscription);
    };
  }, [user]);

  const getStatusStyle = (status) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-800 border-yellow-200 text-pulse";
    if (status === "Preparing") return "bg-blue-100 text-blue-800 border-blue-200 animate-pulse";
    if (status === "Delivered") return "bg-green-100 text-green-800 border-green-200";
    return "bg-gray-100 text-gray-800";
  };

  if (!user) {
    return <p className="text-center mt-20 text-xl font-bold">Please log in to view your orders.</p>;
  }

  if (loading) {
    return <p className="text-center mt-20 text-xl text-gray-500">Loading your orders...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl flex items-center justify-center gap-2 font-bold text-gray-800 mb-8"><Package size={35}/> My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">You haven't ordered anything yet!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 transition-all">
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Order #{order.id}</p>
                <p className="font-bold text-lg text-gray-800">Total: ₹{order.total_amount}</p>
                <p className="text-sm text-gray-600 mt-1">Delivering to: {order.address}</p>
              </div>

              {/* Live Status Badge */}
              <div className={`px-6 py-3 rounded-full border-2 font-bold text-lg text-center min-w-40 transition-colors duration-500 ${getStatusStyle(order.status)}`}>
                {order.status === "Preparing" ? "🍳 Preparing..." : order.status}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}