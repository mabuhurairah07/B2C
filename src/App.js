import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPloicy from "./pages/RefundPloicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CategorySlider from "./pages/CategorySlider";
import Product from "./pages/Product";
import ViewProfile from "./pages/ViewProfile";
import EditProfile from "./pages/EditProfile";
import Verify from "./pages/Verify";
import ResetPass from "./pages/ResetPass";
import EmailVerify from "./pages/emailVerify";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import Selectproduct from "./pages/Selectproduct";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="OrderHistoryPage/" element={<OrderHistoryPage />} />
            <Route path="Selectproduct/:cat?" element={<Selectproduct />} />

            <Route path="EditProfile" element={<EditProfile />} />

            <Route path="ViewProfile" element={<ViewProfile />} />
            <Route path="Verify" element={<Verify />} />
            <Route path="ResetPass" element={<ResetPass />} />
            <Route path="EmailVerify" element={<EmailVerify />} />
            <Route path="contact" element={<Contact />} />
            <Route path="ourstore/:cat?" element={<OurStore />} />
            <Route path="addproduct" element={<Product />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="Category-Slider" element={<CategorySlider />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<Resetpassword />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPloicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndContions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
