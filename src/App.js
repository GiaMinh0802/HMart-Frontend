import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CompareProduct from './pages/CompareProduct';
import Contact from './pages/Contact';
import Forgotpassword from './pages/Forgotpassword';
import Home from './pages/Home';
import Login from './pages/Login';
import OurStore from './pages/OurStore';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import Resetpassword from './pages/Resetpassword';
import ShippingPolicy from './pages/ShippingPolicy';
import Signup from './pages/Signup';
import SingleProduct from './pages/SingleProduct';
import TermAndConditions from './pages/TermAndConditions';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='product' element={<OurStore />} />
            <Route path='product/:id' element={<SingleProduct />} />
            <Route path='cart' element={<Cart />} />
            <Route path='order' element={<Orders />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='compare-product' element={<CompareProduct />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='login' element={<Login />} />
            <Route path='profile' element={<Profile />} />
            <Route path='forgot-password' element={<Forgotpassword />} />
            <Route path='signup' element={<Signup />} />
            <Route path='reset-password' element={<Resetpassword />} />
            <Route path='privacy-policy' element={<PrivacyPolicy />} />
            <Route path='refund-policy' element={<RefundPolicy />} />
            <Route path='shipping-policy' element={<ShippingPolicy />} />
            <Route path='term-conditions' element={<TermAndConditions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
