import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient"; 
import { useAuth } from "../context/authContext";
import { ChefHat, Hamburger, LogOut, Package, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // --- STATE ---
  const [activeTab, setActiveTab] = useState("orders"); // Toggle between 'orders' and 'menu'
  
  // Orders State
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Menu State
  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [newDish, setNewDish] = useState({ name: '', price: '', category: 'starters', description: '', image_url: '' });
  const [isAdding, setIsAdding] = useState(false);

  // --- 1. INITIAL FETCH ---
  useEffect(() => {
    if (!user || user.email !== "admin@cravingo.com") {
      navigate("/admin");
      return;
    }
    fetchOrders();
    fetchMenuItems();
  }, [user, navigate]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    const { data, error } = await supabase.from("orders").select("*").order("id", { ascending: false });
    if (!error) setOrders(data);
    setLoadingOrders(false);
  };

  const fetchMenuItems = async () => {
    setLoadingMenu(true);
    const { data, error } = await supabase.from("menu_items").select("*").order("id", { ascending: false });
    if (!error) setMenuItems(data);
    setLoadingMenu(false);
  };

  // --- 2. ORDER FUNCTIONS ---
  const updateStatus = async (orderId, newStatus) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    if (error) alert("Failed to update status: " + error.message);
    else setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "bg-yellow-300 text-yellow-900";
    if (status === "Preparing") return "bg-blue-300 text-blue-900";
    if (status === "Delivered") return "bg-green-300 text-green-900";
    return "bg-gray-100 text-gray-800";
  };

  // --- 3. MENU FUNCTIONS (NEW) ---
  const handleAddDish = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    const { data, error } = await supabase
      .from("menu_items")
      .insert([{
        name: newDish.name,
        price: parseFloat(newDish.price),
        category: newDish.category.toLowerCase(),
        description: newDish.description,
        image_url: newDish.image_url
      }])
      .select();

    if (error) {
      alert("Failed to add dish: " + error.message);
    } else {
      alert("Dish added successfully!");
      setMenuItems([data[0], ...menuItems]); // Add to the top of the list instantly
      setNewDish({ name: '', price: '', category: 'starters', description: '', image_url: '' }); // Clear form
    }
    setIsAdding(false);
  };

  const handleDeleteDish = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}? This cannot be undone.`)) return;

    const { error } = await supabase.from("menu_items").delete().eq("id", id);

    if (error) {
      alert("Failed to delete dish. (Check if it's currently in someone's order!)");
    } else {
      setMenuItems(menuItems.filter(item => item.id !== id)); // Remove from screen instantly
    }
  };

  // --- RENDER ---
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      
      {/* HEADER & TABS */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b-2 py-5 border-gray-400 mb-8 gap-4">
        <h1 className="text-3xl flex items-center justify-center gap-2 font-bold text-gray-800"><ChefHat size={40}/> Admin Portal</h1>
        
        <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-bold transition-colors ${activeTab === 'orders' ? 'bg-orange-400 text-white' : 'text-gray-600 hover:bg-gray-50'} flex gap-2 items-center justify-center`}
          >
            <Package/> Live Orders
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`px-6 py-3 font-bold transition-colors border-l border-gray-200 ${activeTab === 'menu' ? 'bg-orange-400 text-white' : 'text-gray-600 hover:bg-gray-50'} flex gap-2 items-center justify-center`}
          >
            <Hamburger/> Manage Menu
          </button>
        </div>
        <Link to='/'
        onClick={() => logOut()}
        className="flex items-center font-semibold text-white text-sm justify-center gap-2 bg-red-500 hover:bg-red-600 rounded py-2 px-4">
            LogOut<LogOut size={20}/>
        </Link>
      </div>

      {/* ========================================= */}
      {/* ORDERS TAB                  */}
      {/* ========================================= */}
      {activeTab === 'orders' && (
        <div>
          {loadingOrders ? <p className="text-center mt-10">Loading orders...</p> : orders.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No live orders right now.</p>
          ) : (
            <div className="grid gap-6 mt-15">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-100 rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-base font-bold">Order #{order.id}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>{order.status}</span>
                    </div>
                    <div className="text-gray-600">
                      <p><strong>{order.customer_name}</strong> | {order.phone}</p>
                      <p>{order.address}</p>
                      <p className="text-lg font-bold text-gray-900 mt-2">₹{order.total_amount}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-37.5 items-center justify-center md:border-l border-gray-400 md:pl-6 pt-4 md:pt-0">
                    <p className="text-sm text-gray-500 font-semibold tracking-wider mb-1 text-center md:text-left">Update Status</p>
                    <button onClick={() => updateStatus(order.id, "Pending")} className={`py-1 cursor-pointer px-4 rounded-lg text-sm font-semibold ${order.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}>Pending</button>
                    <button onClick={() => updateStatus(order.id, "Preparing")} className={`py-1 cursor-pointer px-4 rounded-lg text-sm font-semibold ${order.status === 'Preparing' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>Preparing</button>
                    <button onClick={() => updateStatus(order.id, "Delivered")} className={`py-1 cursor-pointer px-4 rounded-lg text-sm font-semibold ${order.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>Delivered</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================= */}
      {/* MENU TAB                   */}
      {/* ========================================= */}
      {activeTab === 'menu' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Add New Dish Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Dish</h2>
            <form onSubmit={handleAddDish} className="flex text-sm font-medium flex-col gap-4">
              <input type="text" placeholder="Dish Name" required value={newDish.name} onChange={e => setNewDish({...newDish, name: e.target.value})} className="p-3 border border-gray-300 rounded-lg" />
              
              <div className="flex gap-4 text-sm">
                <input type="number" placeholder="Price (₹)" required min="0" value={newDish.price} onChange={e => setNewDish({...newDish, price: e.target.value})} className="w-1/2 p-3 border border-gray-300 rounded-lg" />
                <select value={newDish.category} onChange={e => setNewDish({...newDish, category: e.target.value})} className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white">
                  <option value="starters">Starters</option>
                  <option value="asian">Asian</option>
                  <option value="indian">Indian</option>
                  <option value="desserts">Desserts</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>

              <input type="url" placeholder="Image URL (e.g. https://...)" required value={newDish.image_url} onChange={e => setNewDish({...newDish, image_url: e.target.value})} className="p-3 border border-gray-300 rounded-lg" />
              
              <textarea placeholder="Description" required rows="3" value={newDish.description} onChange={e => setNewDish({...newDish, description: e.target.value})} className="p-3 border border-gray-300 rounded-lg" />

              <button type="submit" disabled={isAdding} className={`py-3 font-bold text-white rounded-lg transition-colors ${isAdding ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}>
                {isAdding ? 'Adding Dish...' : '+ Add to Menu'}
              </button>
            </form>
          </div>

          {/* RIGHT: Current Menu List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Current Menu ({menuItems.length})</h2>
            {loadingMenu ? <p>Loading menu...</p> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {menuItems.map(item => (
                  <div key={item.id} className="bg-gray-100 p-4 rounded-xl shadow-lg border border-gray-200 flex gap-4 items-center">
                    <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-orange-500 font-semibold capitalize">{item.category}</p>
                      <p className="font-bold text-sm text-gray-900">₹{item.price}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteDish(item.id, item.name)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Dish"
                    >
                      <Trash2/>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}