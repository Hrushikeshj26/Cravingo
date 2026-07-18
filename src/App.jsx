import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import UserLogin from './pages/UserLogin'
import AdminDashboard from './pages/AdminDashboard'
import MyOrders from './pages/MyOrders'
import { useAuth } from './context/authContext'
import CravingoPromoPopup from './components/CravingoPromoPopup'


function App() {

  const CustomerLayout = () => {
    const { user } = useAuth();
    if( user && user.email === 'admin@cravingo.com'){
      return <Navigate to='/admin' replace/>
    }

  return (
    <>
      <Navbar />
      <CravingoPromoPopup/>
      <div className="container mx-auto">
        <Outlet/>
      </div>
      <Footer/>
    </>
  );
};

const AdminGuard = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.email !== 'admin@cravingo.com') {
    return <Navigate to="/" replace />;
  }
  return children;
};

  return (
    <div className='bg-neutral-200 w-full'>
      <BrowserRouter>
          <Routes>
            <Route element={<CustomerLayout/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/menu' element={<Menu/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/login' element={<UserLogin/>}/>
              <Route path='/myorder' element={<MyOrders/>}/>
            </Route>
            
            <Route path="/admin" element={
              <AdminGuard>
                <AdminDashboard/>
              </AdminGuard>
            } />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App