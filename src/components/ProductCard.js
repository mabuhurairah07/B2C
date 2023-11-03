import React ,{useState} from "react";

import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from 'sweetalert2'

const ProductCard = (props) => {
  const { grid } = props;
  const [product,setProduct]=useState({});
  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;
  const navigation = useNavigate();
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
           navigation('/ourstore');
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
          to={'/product/'+props.p_id}
          className="product-card position-relative"
        >
          
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
              {props.des}
               
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
     
    </>
  );
};


export default ProductCard;
