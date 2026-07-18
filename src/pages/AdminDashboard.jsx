import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../context/authContext";
import {
  ChefHat,
  LogOut,
  Package,
  Trash2,
  UtensilsCrossed,
  History,
  CheckCircle,
  ChevronDown,
  MapPin,
  CircleCheckBig,
  SquareDot,
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("live");

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [newDish, setNewDish] = useState({
    name: "",
    price: "",
    category: "starters",
    description: "",
    image_url: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const [orderToConfirm, setOrderToConfirm] = useState(null);

  useEffect(() => {
    if (!user || user.email !== "admin@cravingo.com") {
      navigate("/");
      return;
    }
    fetchOrders();
    fetchMenuItems();
  }, [user, navigate]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from("orders")
      .select(`*, order_items (quantity, menu_items (name, price))`)
      .order("id", { ascending: false });

    if (!error) setOrders(data);
    setLoadingOrders(false);
  };

  const fetchMenuItems = async () => {
    setLoadingMenu(true);
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setMenuItems(data);
    setLoadingMenu(false);
  };

  const updateStatus = async (orderId, newStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);
    if (error) alert("Failed to update status: " + error.message);
    else
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
  };

  const handleStatusChange = (order, newStatus) => {
    if (newStatus === "Delivered") {
      setOrderToConfirm(order);
    } else {
      updateStatus(order.id, newStatus);
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    const { data, error } = await supabase
      .from("menu_items")
      .insert([
        {
          name: newDish.name,
          price: parseFloat(newDish.price),
          category: newDish.category.toLowerCase(),
          description: newDish.description,
          image_url: newDish.image_url,
        },
      ])
      .select();

    if (error) alert("Failed to add dish: " + error.message);
    else {
      setMenuItems([data[0], ...menuItems]);
      setNewDish({
        name: "",
        price: "",
        category: "starters",
        description: "",
        image_url: "",
      });
    }
    setIsAdding(false);
  };

  const handleDeleteDish = async (id, name) => {
    if (!window.confirm(`Delete ${name} permanently?`)) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (!error) setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const liveOrders = orders.filter((order) => order.status !== "Delivered");
  const historyOrders = orders.filter((order) => order.status === "Delivered");

  // ULTRA-COMPACT HORIZONTAL LAYOUT
  const renderOrderCards = (orderList, emptyMessage, isHistory = false) => {
    if (loadingOrders) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-orange-500"></div>
        </div>
      );
    }

    if (orderList.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <Package size={40} className="text-gray-300 mb-3" />
          <h3 className="text-lg font-bold text-gray-700">{emptyMessage}</h3>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {orderList.map((order) => {
          // Format items into a single compact string: "2x Burger, 1x Coke"
          const itemsString = order.order_items
            ?.map(
              (item) => `${item.quantity}x ${item.menu_items?.name || "Item"}`,
            )
            .join(" • ");

          return (
            <div
              key={order.id}
              className=" bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col lg:items-center gap-4 hover:border-orange-200 transition-colors"
            >
              {/* 1. ID & Customer Info (Fixed small width) */}
              <div className="flex flex-col w-full justify-between shrink-0">
                <div className="flex justify-between items-center gap-2 mb-1">
                  <h2 className="text-lg font-black w-60 md:w-full text-orange-700">
                    #{order.id}
                  </h2>
                  {!isHistory ? (
                    <span className="text-[12px] flex gap-1 items-center font-bold text-green-700 uppercase tracking-wider bg-green-200 px-1.5 py-0.5 rounded">
                      <SquareDot size={15} strokeWidth={3} />
                      Live
                    </span>
                  ) : (
                    <span className="text-[12px] flex gap-1 items-center font-bold text-green-700 uppercase tracking-wider bg-green-200 px-1.5 py-0.5 rounded">
                      <CircleCheckBig size={15} strokeWidth={3} />
                      {order.status}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {order.customer_name} |
                  </p>
                  <p className="text-sm text-gray-500 font-medium truncate">
                    {order.phone}
                  </p>
                </div>
              </div>

              <div className="w-full flex-col md:flex-row flex gap-5 md:gap-2">
                {/* 2. Order Items String & Address (Flexible middle space) */}
                <div className="flex-1 flex flex-col min-w-0 bg-gray-300/40 p-2.5 rounded-lg border border-gray-100 gap-1.5">
                  <p className="text-sm font-semibold text-gray-800 leading-snug">
                    {itemsString}
                  </p>
                  <p
                    className="text-xs flex gap-1 text-gray-600 truncate"
                    title={order.address}
                  >
                    <MapPin size={15} /> {order.address}
                  </p>
                </div>

                {/* 3. Total & Action (Fixed right side) */}
                <div className="flex flex-row lg:flex-col justify-between items-center lg:items-end lg:w-36 shrink-0 gap-2">
                  <p className="text-lg font-black text-orange-600">
                    ₹{order.total_amount}
                  </p>

                  {!isHistory && (
                    <div className="relative w-36 lg:w-full">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order, e.target.value)
                        }
                        className={`appearance-none w-full border text-xs font-bold rounded-lg outline-none py-1.5 pl-3 pr-8 cursor-pointer shadow-sm transition-all ${
                          order.status === "Pending"
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : order.status === "Preparing"
                              ? "bg-blue-50 border-blue-200 text-blue-700"
                              : "bg-white border-gray-200 text-gray-800"
                        }`}
                      >
                        <option
                          value="Pending"
                          className="font-semibold text-gray-900"
                        >
                          Pending
                        </option>
                        <option
                          value="Preparing"
                          className="font-semibold text-gray-900"
                        >
                          Preparing
                        </option>
                        <option
                          value="Delivered"
                          className="font-bold text-emerald-600"
                        >
                          Delivered
                        </option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-12 font-sans relative">
      {/* TOP NAVBAR */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
              <ChefHat size={22} />
            </div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Cravingo Admin
            </h1>
          </div>

          <Link
            to="/"
            onClick={() => logOut()}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 py-2 px-3 rounded-lg transition-all"
          >
            Logout <LogOut size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* PILL NAVIGATION */}
        <div className="flex md:justify-center mb-8 overflow-x-auto pb-2 no-scrollbar">
          <div className="inline-flex bg-gray-300/40 p-1 rounded-xl shadow-inner whitespace-nowrap">
            <button
              onClick={() => setActiveTab("live")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === "live" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
            >
              <Package size={16} strokeWidth={2.5} /> Live Orders
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === "history" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
            >
              <History size={16} strokeWidth={2.5} /> Order History
            </button>
            <button
              onClick={() => setActiveTab("menu")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === "menu" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
            >
              <UtensilsCrossed size={16} strokeWidth={2.5} /> Manage Menu
            </button>
          </div>
        </div>

        {/* TABS */}
        {activeTab === "live" && (
          <div className="animate-in fade-in duration-300">
            {renderOrderCards(
              liveOrders,
              "Kitchen is quiet. Waiting for new orders!",
              false,
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="animate-in fade-in duration-300">
            {renderOrderCards(
              historyOrders,
              "No completed orders yet today.",
              true,
            )}
          </div>
        )}

        {activeTab === "menu" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
            {/* Add Dish Form */}
            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-24">
                <h2 className="text-lg font-extrabold text-gray-900 mb-5 flex items-center gap-2">
                  <div className="bg-orange-100 text-orange-600 w-8 h-8 rounded-lg flex items-center justify-center text-lg">
                    +
                  </div>
                  Add Dish
                </h2>
                <form onSubmit={handleAddDish} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Dish Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newDish.name}
                      onChange={(e) =>
                        setNewDish({ ...newDish, name: e.target.value })
                      }
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all text-sm font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={newDish.price}
                        onChange={(e) =>
                          setNewDish({ ...newDish, price: e.target.value })
                        }
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Category
                      </label>
                      <select
                        value={newDish.category}
                        onChange={(e) =>
                          setNewDish({ ...newDish, category: e.target.value })
                        }
                        className="appearance-none w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all text-sm font-medium cursor-pointer"
                      >
                        <option value="starters">Starters</option>
                        <option value="asian">Asian</option>
                        <option value="indian">Indian</option>
                        <option value="desserts">Desserts</option>
                        <option value="drinks">Drinks</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3 top-8 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      required
                      value={newDish.image_url}
                      onChange={(e) =>
                        setNewDish({ ...newDish, image_url: e.target.value })
                      }
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      rows="2"
                      value={newDish.description}
                      onChange={(e) =>
                        setNewDish({ ...newDish, description: e.target.value })
                      }
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all resize-none text-sm font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAdding}
                    className={`w-full py-3.5 mt-2 font-bold text-white rounded-lg shadow-sm transition-all ${isAdding ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
                  >
                    {isAdding ? "Adding..." : "Publish to Menu"}
                  </button>
                </form>
              </div>
            </div>

            {/* Menu List */}
            <div className="lg:col-span-8">
              {loadingMenu ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-orange-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3 items-center hover:shadow-md transition-all"
                    >
                      <div className="w-16 h-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                          {item.category}
                        </p>
                        <h3 className="font-bold text-gray-900 text-sm truncate">
                          {item.name}
                        </h3>
                        <p className="font-black text-gray-700 text-sm mt-0.5">
                          ₹{item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteDish(item.id, item.name)}
                        className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Dish"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DELIVERED CONFIRMATION MODAL */}
      {orderToConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 transform transition-all animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full mb-5 shadow-inner">
                <CheckCircle size={40} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                Confirm Delivery
              </h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Mark Order{" "}
                <strong className="text-gray-900">#{orderToConfirm.id}</strong>{" "}
                as delivered? This moves it to History.
              </p>
              <div className="flex w-full gap-3">
                <button
                  onClick={() => setOrderToConfirm(null)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateStatus(orderToConfirm.id, "Delivered");
                    setOrderToConfirm(null);
                  }}
                  className="flex-1 py-3 px-4 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/30 hover:-translate-y-0.5"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
