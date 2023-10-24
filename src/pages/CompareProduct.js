import React from "react";
import BreadCrumb from "../components/BreadCrumb";

import Meta from "../components/Meta";

import Container from "../components/Container";
import { useState, useEffect } from 'react';
import {useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import { BiArrowBack } from "react-icons/bi";


const CompareProduct = () => {

  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;
  const [product,setProduct]=useState([]);
  const [details,setDetails]=useState([]);
  const [category,setCategory] = useState('')
  const [submit,setSubmit]=useState(0);
  const navigation = useNavigate();

 
  

   const fetchCompare= async()=>{
    if(user_id.length!==0){
      await axios.get('http://127.0.0.1:8000/products/compare/'+user_id
      ).then((response)=>{
        console.log('loop');
        // console.log(response.data.data);
        if(!response.data.error){
          setProduct(response.data.data.product);
          setDetails(response.data.data.details);
          setCategory(response.data.data.category);
        }else{
          const errorData = {
            icon: 'error',
            title: 'Oops...',
            text: response.data.msg,
            confirmButtonText: 'OK'
          }
          Swal.fire(errorData)
        }
      })
    }
  }
  const handleAddToCart= async (product_id)=>{
    if(user_id!=null){
      console.log(product_id);
      await axios.post('http://127.0.0.1:8000/cart_details/addtocart/',{
       product : product_id,
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
      navigation('/login');
    }

    

  }

  const deleteCompare= async(product_id)=>{
    console.log(product_id)
    console.log(user_id);
    if(user_id.length!=0){
      await axios.post('http://127.0.0.1:8000/products/delete_compare/',{
        user_id:user_id,
        product_id:product_id
      }
      ).then((response)=>{
        setSubmit(submit+1);
        console.log(response.data);
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  console.log(product);
  console.log('Category');
  console.log(category);
  
  useEffect(()=>{
    fetchCompare();
  },[submit])


  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
        {
          product.length!=0 && details.length!=0 && category=='AC'?
          // details.length!=0?
          product.map((item, index) => {
            const detail = details[index];
           return(
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                  onClick={()=>deleteCompare(item.product.p_id)}
                />
                <div className="product-card-image">
                  <img src={'http://127.0.0.1:8000/'+item.product.p_image}
                    className="img-fluid w-100"
                    alt="product_image" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    {item.product.p_name}
                  </h5>
                  <h6 className="price mb-3 mt-3">$ {item.product.p_price}</h6>

                  <div>
                    <div>
                      <h5>Capacity:</h5>
                      <p>{detail.ac_capacity}</p>
                    </div>
                    <div>
                      <h5>Warranty:</h5>
                      <p>{detail.ac_warranty}</p>
                    </div>
                    <div>
                      <h5>Type:</h5>
                      <p>{detail.ac_type}</p>
                    </div>
                    <div>
                      <h5>Inverter:</h5>
                      <p>{detail.ac_capacity}</p>
                    </div>
                    <div>
                      <h5>Energy Efficiency:</h5>
                      <p>{detail.ac_energy_efficiency}</p>
                    </div>
                    
                  </div>
                </div>
              </div>
          </div>
           )
            })
            :
          product.length!=0 && details.length!=0 && category=='Laptops'?
          // details.length!=0?
          product.map((item, index) => {
            const detail = details[index];
           return(
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                  onClick={()=>deleteCompare(item.product.p_id)}
                />
                <div className="product-card-image">
                  <img src={'http://127.0.0.1:8000/'+item.product.p_image}
                    className="img-fluid w-100"
                    alt="product_image" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    {item.product.p_name}
                  </h5>
                  <h6 className="price mb-3 mt-3">$ {item.product.p_price}</h6>

                  <div>
                    <div>
                      <h5>Processor:</h5>
                      <p>{detail.laptop_processor}</p>
                    </div>
                    <div>
                      <h5>Battery:</h5>
                      <p>{detail.laptop_battery}</p>
                    </div>
                    <div>
                      <h5>Memory:</h5>
                      <p>{detail.laptop_memory}</p>
                    </div>
                    <div>
                      <h5>Display:</h5>
                      <p>{detail.laptop_display}</p>
                    </div>
                    <div>
                      <h5>Generation:</h5>
                      <p>{detail.laptop_generation}</p>
                    </div>
                    
                  </div>
                </div>
              </div>
          </div>
           )
            })
            :
          product.length!=0 && details.length!=0 && category=='Phones'?
          // details.length!=0?
          product.map((item, index) => {
            const detail = details[index];
           return(
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                  onClick={()=>deleteCompare(item.product.p_id)}
                />
                <div className="product-card-image">
                  <img src={'http://127.0.0.1:8000/'+item.product.p_image}
                    className="img-fluid w-100"
                    alt="product_image" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    {item.product.p_name}
                  </h5>
                  <h6 className="price mb-3 mt-3">$ {item.product.p_price}</h6>

                  <div>
                    <div>
                      <h5>Processor:</h5>
                      <p>{detail.mobile_processor}</p>
                    </div>
                    <div>
                      <h5>Battery:</h5>
                      <p>{detail.mobile_battery}</p>
                    </div>
                    <div>
                      <h5>Memory:</h5>
                      <p>{detail.mobile_memory}</p>
                    </div>
                    <div>
                      <h5>Display:</h5>
                      <p>{detail.mobile_display}</p>
                    </div>
                    <div>
                      <h5>Camera:</h5>
                      <p>{detail.mobile_camera}</p>
                    </div>
                    
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-30 ms-5">
                  <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Home
                    </Link>
                    <button
                      className="button"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button" 
                      onClick={()=>handleAddToCart(item.product.p_id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
          </div>
           )
            })
            :
          product.length!=0 && details.length!=0 && category=='LCD'?
          // details.length!=0?
          product.map((item, index) => {
            const detail = details[index];
           return(
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                  onClick={()=>deleteCompare(item.product.p_id)}
                />
                <div className="product-card-image">
                  <img src={'http://127.0.0.1:8000/'+item.product.p_image}
                    className="img-fluid w-100"
                    alt="product_image" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    {item.product.p_name}
                  </h5>
                  <h6 className="price mb-3 mt-3">$ {item.product.p_price}</h6>

                  <div>
                    <div>
                      <h5>Display:</h5>
                      <p>{detail.lcd_display}</p>
                    </div>
                    <div>
                      <h5>Power Consumption:</h5>
                      <p>{detail.lcd_power_consumption}</p>
                    </div>
                    <div>
                      <h5>Audio:</h5>
                      <p>{detail.lcd_audio}</p>
                    </div>
                    <div>
                      <h5>Chip:</h5>
                      <p>{detail.lcd_chip}</p>
                    </div>
                    
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-30 ms-5">
                 
                    <button
                      className="button"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button" 
                      onClick={()=>handleAddToCart(item.product.p_id)}
                    >
                      Add to Cart
                    </button>
                    <Link to="/" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Home
                    </Link>
                  </div>
                  
                </div>
              </div>
          </div>
           )
            })
            :
            'Loading'
          }
        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
