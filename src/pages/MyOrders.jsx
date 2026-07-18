import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../context/authContext";
import {
  CookingPot,
  Package,
  Clock,
  CheckCircle,
  ShoppingBag,
  MapPin,
} from "lucide-react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // 1. Fetch initial orders WITH their nested food items!
    const fetchMyOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (
            quantity,
            menu_items (
              name,
              price
            )
          )
        `,
        )
        .eq("user_id", user.id)
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
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Order updated live!", payload.new);
          // Merge the live update with existing data so we don't lose the nested order_items
          setOrders((currentOrders) =>
            currentOrders.map((order) =>
              order.id === payload.new.id
                ? { ...order, ...payload.new }
                : order,
            ),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(orderSubscription);
    };
  }, [user]);

  // Premium, compact status badges
  const getStatusDisplay = (status) => {
    if (status === "Pending") {
      return (
        <span className="flex items-center justify-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg font-bold text-[10px] sm:text-xs border border-amber-200 shadow-sm">
          <Clock size={12} strokeWidth={2.5} /> Pending
        </span>
      );
    }
    if (status === "Preparing") {
      return (
        <span className="flex items-center justify-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-bold text-[10px] sm:text-xs border border-blue-200 shadow-sm">
          <CookingPot size={12} className="animate-pulse" strokeWidth={2.5} />{" "}
          Preparing
        </span>
      );
    }
    if (status === "Delivered") {
      return (
        <span className="flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg font-bold text-[10px] sm:text-xs border border-emerald-200 shadow-sm">
          <CheckCircle size={12} strokeWidth={2.5} /> Delivered
        </span>
      );
    }
    return (
      <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-bold text-xs border border-gray-200">
        {status}
      </span>
    );
  };

  // Format Date safely
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <p className="text-xl font-bold text-gray-700">
          Please log in to view your orders.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
          <Package size={32} className="text-orange-500" /> My Orders
        </h1>

        {loading ? (
          // Modern Loading State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-orange-500 mb-4"></div>
            <p className="font-semibold text-gray-500 text-sm">
              Fetching your order history...
            </p>
          </div>
        ) : orders.length === 0 ? (
          // Premium Empty State
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="bg-orange-50 p-5 rounded-full text-orange-400 mb-5">
              <ShoppingBag size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              No orders yet!
            </h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">
              You haven't placed any orders. Browse our menu to find something
              delicious.
            </p>
            <Link
              to="/menu"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-sm hover:-translate-y-0.5 text-sm"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          // Compact Orders List with Top Header
          <div className="flex flex-col gap-5">
            {orders.map((order) => {
              const itemsString = order.order_items
                ?.map(
                  (item) =>
                    `${item.quantity}x ${item.menu_items?.name || "Item"}`,
                )
                .join(" • ");

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="bg-gray-50/80 border-b border-gray-100 px-5 py-3.5 flex justify-between items-center">
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-3">
                      <h2 className="text-base sm:text-lg font-black text-gray-900">
                        Order #{order.id}
                      </h2>
                      <span className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></span>
                      <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div>{getStatusDisplay(order.status)}</div>
                  </div>

                  {/* BODY: Items, Address & Total */}
                  <div className="p-5 flex flex-col lg:flex-row lg:items-center gap-5">
                    {/* Items & Address (Flexible space) */}
                    <div className="flex-1 flex flex-col min-w-0 gap-3">
                      {/* Items Box */}
                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                        <p className="text-sm font-semibold text-gray-800 leading-snug">
                          {itemsString || (
                            <span className="text-gray-400 italic">
                              Items unavailable
                            </span>
                          )}
                        </p>
                      </div>
                      {/* Address Line */}
                      <div className="flex items-center gap-1.5 text-gray-500 px-1">
                        <MapPin
                          size={14}
                          className="shrink-0 text-orange-400"
                        />
                        <p
                          className="text-xs font-medium truncate"
                          title={order.address}
                        >
                          {order.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col justify-between items-center lg:items-end lg:w-32 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 lg:text-right hidden lg:block">
                        Total Paid
                      </p>
                      <p className="text-2xl font-black text-orange-600">
                        ₹{order.total_amount}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
