import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import axios from "axios";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
  // Inside Header component

  const user=JSON.parse(localStorage.getItem('user'));

  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;

  const [data, setData] = useState('');

  

  const handleSubmit = async () => {
    
    try {
      const response = await axios.get('http://127.0.0.1:8000/user/user/'+user_id, {
      });

      if (!response.data.error) {
        // alert(response.data.msg);
        setData(response.data.data[0])
        
        // navigation('/');
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      alert('An error occurred during update.');
    }
  }
  console.log(data);
  useEffect(()=>{
    handleSubmit();
  },[])
 
  return (
    <>
   
              <header className="header-top-strip py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0" >
                <b>Enjoy Free Shipping from EasyBay Over $100</b> 
              </p>
            </div>
         
            {props.logged_in?
        <div className="text-end  "  >
        
      <FontAwesomeIcon icon={faUserCircle} className="icon2" />

          <span  style={{fontSize:'20px', fontWeight:'bold', color:"var(--color-777777)"}} >Hello: {data.username ? data.username : 'Loading'}</span>
          </div>:
          <div></div>
      }
      
    </div>
            </div>
      
          
      </header>
          
       
    
      <header className="header-upper py-3" >
        <div className="container-xxl" >
          <div className="row align-items-center">
            <div className="col-2">
              <h1>
                <Link to = "/" className="text-black">  Easy Bay </Link>
              </h1>
            </div>
            <div className="col-5">
             
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                {props.logged_in? 
                  <div className="d-flex align-items-center gap-10 text-white"  >
                    <button
                      className="btn btn-secondary  bg-transparent border-0  "
                      
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      
                     
                    >
                      <FontAwesomeIcon icon={faUserCheck} className="icon" />
                      <span className="mb-0">
                       My Account
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                      style={{backgroundColor: "#7CB9E8"}}
                    >
                      <li>
                        <Link className="dropdown-item text-blue" to="OrderHistoryPage">
                         Order History
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-blue" to="ViewProfile">
                         View Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-blue" to="EditProfile">
                          Edit Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-blue" to="login">
                          Log out
                        </Link>
                      </li>
                    </ul>
                  </div>:
                <div>
                  <Link
                    to="/login"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <p className="mb-0">
                      Log in  
                    </p>
                  
                  </Link>
                </div>
                
                }
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">0</span>
                      
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown" style={{fontSize : '6px'}}>
                  

                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                      <NavLink className="dropdown-item text-white" to="/ourstore/laptop">Laptop</NavLink>
                      </li>
                      <li>
                      <NavLink className="dropdown-item text-white"  to="/ourstore/mobile">Mobile</NavLink>
                      </li>
                      <li>
                      <NavLink className="dropdown-item text-white" to="/ourstore/ac">AC</NavLink>
                      </li>
                      <li>
                      <NavLink className="dropdown-item text-white" to="/ourstore/lcd">LCD</NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links" style={{fontSize : '6px'}}>
                  <div className="d-flex align-items-center gap-15" style={{fontSize : '6px'}}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                   
                    <NavLink to="/contact">Contact Us</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
