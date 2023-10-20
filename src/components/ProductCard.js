import React ,{useState} from "react";
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import CWatch from "../images/CWatch.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import iphone from "../images/iphone.jpg";
import sam from "../images/sam.jpg";
import suitCase from "../images/suitCase.jpg";
import axios from "axios";
import Swal from 'sweetalert2'
// import { useLocation } from "react-router-dom";
const ProductCard = (props) => {
  const { grid } = props;
  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;
  const handleAddToCart= async ()=>{
    if(user_id!=null){
      await axios.post('http://127.0.0.1:8000/cart_details/addtocart/',{
       product : props.p_id,
       user_data : user_id,
       quantity : 1,
       panel : 1

      }).then((response)=>{
         console.log(response);
         const msg = response.data.msg;
         if(!response.data.error){
          //  localStorage.setItem('Item Added',true)
          Swal.fire({
            
            icon: 'success',
            title: msg,
            showConfirmButton: false,
            timer: 1500
          })
          //  navigation('/');
         }else{
           (Swal.fire({
            background:'#ced8e6',
            title: 'Product Already in Cart',
            icon: 'warning',
            confirmButtonText: 'Okay'
          }))
         }
      })
    }else{
      (Swal.fire({
        background:'#ced8e6',
        text:' Please Login First',
       
        confirmButtonText: 'Okay'
      }))
      // navigation('/login');
    }

    

  }
  
  let location = useLocation();

  return (
    <>
      <div
        className={`p-2 ${
          location.pathname == "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <Link
          to={`${
            location.pathname == "/"
              ? `/product/${props.p_id}`
              : location.pathname == "/product/:id"
              ? `/product/${props.p_id}`
              : `${props.p_id}`
          }`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            {/* <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button> */}
          </div>
          <div className="product-image position-sticky">
              {/* <img src="images/iphone" className="img-fluid" ></img> */}
                <div>
                  <img src={props.image} className="img-fluid"/>
                </div>
                
                {/* <img src={props.image2} className="img-fluid"  /> */} 
          </div>
          <div className="product-details position-relative">
              <h6 className="brand">{props.name}</h6>
              <h5 className="product-title">
              {props.title}
                
              </h5>
              <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate non
                provident, similique sunt...
              </p>
              <p className="price">{props.price}</p>
          </div>
          <div>
          <button
                      className="button border-0 ml-5 mb-4"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button" 
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
          </div>

        </Link>
        </div>
       {/* <div
        className={` ${
          location.pathname == "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <Link
          to={`${
            location.pathname == "/"
              ? "/product/:id"
              : location.pathname == "/product/:id"
              ? "/product/:id"
              : ":id"
          }`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={props.image} className="img-fluid" />
            <img src={props.image} className="img-fluid" alt="product image" />
            <img src={props.image2} className="img-fluid" alt="product image" />
            <img src={props.tv} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              Citizen Watch, Discover Swiss
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt...
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div> */}
    </>
  );
};


export default ProductCard;