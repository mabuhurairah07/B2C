import React ,{useState, useEffect} from "react";

import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { TbGitCompare } from "react-icons/tb";
import axios from "axios";
import Swal from 'sweetalert2'

const CompareCard = (props) => {
  const { grid } = props;
  const navigation=useNavigate();
  const {id}=useParams();
  const [product,setProduct]=useState([]);
  const [details,setDetails]=useState([]);
  const [category,setCategory] = useState('')
  const [submit,setSubmit]=useState(0);

  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;

  const handleAddToCompare = (p_id) => {
    if (user_id !== null) {
      // Get the product_id from the selected product
      const product_id = p_id;
  
      if (product_id) {
        // Check if the product_id in local storage matches the current product's id
        const storedProductID = JSON.parse(localStorage.getItem('product_id'));
        console.log(storedProductID);
  
        if (storedProductID === product_id) {
          Swal.fire({
            icon: 'info',
            title: 'Product is already in Compare.',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          // Save the product_id to local storage for later use
          localStorage.setItem('product_id1', product_id);
  
          Swal.fire({
            icon: 'success',
            title: 'Product has been Added to Compare',
            showConfirmButton: false,
            timer: 1500
          });
          navigation('/compare-product');
  
          // Use React Router to navigate to the `/Selectproduct/:cat` route
          // navigation(`/Selectproduct/${product.category.cat_name}`);
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Product ID is missing. Cannot add to Compare.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } else {
      Swal.fire({
        background: '#ced8e6',
        text: 'Please Login First',
        confirmButtonText: 'Okay'
      });
      navigation('/login');
    }
  };
  
 
  let location = useLocation();
  // console.log(product);
  // console.log('Category');
  // console.log(category);
  
  useEffect(()=>{
    // fetchCompare();
  },[submit])
  return (
    <>
      <div
        className={`p-2 ${
          location.pathname == "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <div
         
          className="product-card position-relative"
        >
         
          <div className="product-image position-sticky">
         
                <div>
                  <img src={props.image} className="img-fluid"/>
                </div>
           
          </div>
          <div className="product-details position-relative">
              <h6 className="brand">{props.name}</h6>
              <h5 className="product-title">
              {props.title}
                
              </h5>
              <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
               
              </p>
              <p className="price">{props.price}</p>
          </div>


         
          <div style={{cursor:'pointer'}} 
                  onClick={() => handleAddToCompare(props.p_id)} 
                  >
                    <TbGitCompare className="fs-5 me-2"  /> 
                    Add to Compare  
                  </div>

        </div>
        </div>
     
    </>
  );
};


export default CompareCard;
