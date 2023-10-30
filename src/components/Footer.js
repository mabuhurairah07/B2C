import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" />
                <h3 className="mb-0 text-white">EasyBay e-commerce website</h3>
              </div>
            </div>
           
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Hno : Near Gift University, <br /> Gujranwala, Pakistan <br />
                  PostalCode: 52250
                </address>
                <a
                  href="tel:+92 330654444"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +92 330654444
                </a>
                <a
                  href="easybay@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  easybay@gmail.com
                </a>
              
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Terms & Conditions
                </Link>
                
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-link d-flex flex-column">
                <Link to = "/About" className="text-white py-2 mb-1">About Us</Link>
                <Link to = "/Contact" className="text-white py-2 mb-1">Direction Map</Link>
                <Link to = "/Contact" className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1" to="ourstore/Laptops">Laptops</Link>
                <Link className="text-white py-2 mb-1" to="ourstore/Phones">Mobiles</Link>
                <Link className="text-white py-2 mb-1" to="ourstore/LCD">LCD</Link>
                <Link className="text-white py-2 mb-1" to="ourstore/AC">AC</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
               EasyBay E-commerce Website
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
