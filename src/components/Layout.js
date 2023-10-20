import React, { useEffect, useState }  from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Layout = () => {
  const [logged_in,setLoggedIn]=useState(false);
  // const logged_in =localStorage.getItem('logged_in');

  useEffect(()=>{
    setLoggedIn(localStorage.getItem('logged_in'))
  })
  return (
    <>
      <Header logged_in={logged_in}/>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
