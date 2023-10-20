import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'


;

const SpecialProduct = (props) => {
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
  
  
  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-between" style={{height:'200px '}}>
            <div>
              

             <img src={props.img}  className="img-fluid" alt={props.name}  style={{ 
    width: '100%', 
    height: '100%', 
    borderRadius: '10px' ,
    paddingLeft: '30px'
  }} 
/>
            </div>
            <div className="special-product-content" style={{ 
  backgroundColor: '#f2f2f2', 
  padding: '10px', 
  borderRadius: '10px',
  paddingLeft : '10%',
  width : '50%',
  color : 'grey'
}}>
              <h5 className="brand">{props.name}</h5>
              <h6 className="title" style={{Color: 'black'}}>
                {props.description}
              </h6>
              <ReactStars
                count={5}
                size={24}
                value={4}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                {/* <span className="red-p">$100</span> &nbsp; <strike>$200</strike> */}
                ${props.price}
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
              </p>
              
             
            
              
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
