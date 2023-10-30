import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link , useLocation} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'


;

const SpecialProduct = (props) => {
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
          
          </div>
          <div className="product-image position-sticky">
          
                <div>
               <img src={props.img}  className="img-fluid" alt={props.name}  style={{ 
    width: '100%', 
    height: '100%', 
    borderRadius: '10px' ,
    paddingLeft: '30px'
  }} 
/>
                </div>
           
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

              <h5 className="brand">{props.name}</h5>
              <h6 className="title" style={{Color: 'black'}}>
                {props.description}
              </h6>
              <ReactStars
                count={5}
                size={24}
                value={props.rating}
                edit={false}
                activeColor="#ffd700"
              />
              

          </div>
          <div>
          <button
                      className="button border-0 ml-5 mb-4"
                     
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


export default SpecialProduct;
