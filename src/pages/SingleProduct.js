import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import axios from 'axios';
import ScrollToTop from "./ScrollToTop";
import Swal from 'sweetalert2'
const SingleProduct = () => {
  const {id}=useParams();
  // const user_id=localStorage.getItem('user');
  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;
  const [stars, setStars] = useState();
  
  

  const [product,setProduct]=useState({});
  // const [quantity,setQuantity]=useState({});
  // console.log(user_id.id)


  const navigation=useNavigate();
  const handleAddToCompare= async ()=>{
    if(user_id!=null){
      await axios.post('http://127.0.0.1:8000/products/compare/',{
       product_id : id,
       user_id : user_id
      }).then((response)=>{
         console.log(response.data);
         if(!response.data.error){
          //  localStorage.setItem('Item Added',true)
          Swal.fire({
            
            icon: 'success',
            title: 'Product has been Added to Compare',
            showConfirmButton: false,
            timer: 1500
          })
           navigation('/Selectproduct');
         }else{
           (Swal.fire({
            background:'#ced8e6',
            text: response.data.msg,
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
  const Alert = ( ) => {
    Swal.fire('My Alert')
   }
  const [recommended,getRecommended] = useState([]);
useEffect(() => {
  getRecommendedProducts();
      }, []);
const getRecommendedProducts = async (e) => {
  try{
    await axios.get('http://127.0.0.1:8000/products/recommendations/' + user_id).then((response)=>{
     
      if(!response.data.error){
          // const allProducts = response.data;
          // console.log('Recommneded');
          getRecommended(response.data.data);
          // console.log(response.data.data)
      }else{
        alert(Alert)
      }
   })
  }catch(error){
    console.log(error)
  }
}
  const handleAddToCart= async ()=>{
    if(user_id!=null){
      await axios.post('http://127.0.0.1:8000/cart_details/addtocart/',{
       product : id,
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
  const handleAddToWishList= async()=>{
    if(user_id!=null){
      await axios.post('http://127.0.0.1:8000/products/wishlist/',{
       product_id : id,
       user_id : user_id
      }).then((response)=>{
         console.log(response);
         if(!response.data.error){
         
          Swal.fire({
            
            icon: 'success',
            title: 'Product has been Added to WishList',
            showConfirmButton: false,
            timer: 3500
          })
          
          //  navigation('/');
         }else{
          (Swal.fire({
            background:'#ced8e6',
            text: response.data.msg,
            icon: 'warning',
            confirmButtonText: 'Okay'
          }))
         }
      })
    }
    
    else{
      (Swal.fire({
        background:'#ced8e6',
        text:' Please Login First',
       
        confirmButtonText: 'Okay'
      }))
      navigation('/login');
    }
  }
  const handleFeedback= async()=>{
    // console.log('In feedback function');
    if(user_id!=null){
      await axios.post('http://127.0.0.1:8000/products/feedback/',{
       product : id,
       user : user_id,
       stars : stars
      }).then((response)=>{
         console.log(response);
         if(!response.data.error){
         
          Swal.fire({
            
            icon: 'success',
            title: response.data.msg,
            showConfirmButton: false,
            timer: 3500
          })
          
          //  navigation('/');
         }else{
          (Swal.fire({
            background:'#ced8e6',
            text: response.data.msg,
            icon: 'warning',
            confirmButtonText: 'Okay'
          }))
         }
      })
    }
    
    else{
      (Swal.fire({
        background:'#ced8e6',
        text:' Please Login First',
       
        confirmButtonText: 'Okay'
      }))
      navigation('/login');
    }
  }

  const fetchProductDetail= async ()=>{
    await axios.get('http://127.0.0.1:8000/products/details/'+id).then((response)=>{
      setProduct(response.data.data)
    })
  }
  useEffect(()=>{
    fetchProductDetail()
  },[])

  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img: 'http://127.0.0.1:8000/'+product.p_image
  };

  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const closeModal = () => {};
  return (
    <>
    <ScrollToTop />
      <Meta title={"Product Name"} />
      
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        {
          product?
          <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              <div>
                <img
                  src={'http://127.0.0.1:8000/'+product.p_image} 
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src={'http://127.0.0.1:8000/'+product.p_image} 
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src={'http://127.0.0.1:8000/'+product.p_image} 
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src={'http://127.0.0.1:8000/'+product.p_image} 
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  {product.p_name}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {product.disc_price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Description :</h3>
                  <p className="product-data">{product.p_des}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{product.p_brand}</p>
                </div>

                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Total Price :</h3>
                  <p className="product-data">{product.p_price}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Discount Price :</h3>
                  <p className="product-data">{product.disc_price}</p>
                </div>



                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  {product.category && product.category.cat_name ?
                  <p className="product-data">{product.category.cat_name}</p>
                :
                'Loading.....'  
                }
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                    
                  <p className="product-data">{product.p_status==1?'In Stock':'Out of Stock'}</p> 
                      
                </div>
                
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                 
                  <div className="d-flex align-items-center justify-content-center gap-30 ms-5">
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
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div style={{cursor:'pointer'}} 
                  onClick={handleAddToCompare} 
                  >
                    <TbGitCompare className="fs-5 me-2"  /> 
                    Add to Compare  
                  </div>
                  <div  style={{cursor:'pointer'}} onClick={handleAddToWishList} >
                    <AiOutlineHeart className="fs-5 me-2"  /> Add to Wishlist
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          :
          'Loading ....'

        }
        
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
                {product.p_des}
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {/* {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )} */}
              </div>
              <div className="review-form py-4">
                <form className="d-flex flex-column gap-15">
                <h4>Gave a Rating</h4>
                  <div>
                    <ReactStars
                      value = {stars}
                      count={5}
                      size={24}
                      onChange={setStars}
                      // value={4}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="button border-0" onClick={handleFeedback}>Submit Review</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
        
           
              <ProductCard
                key={recommended.p_id}
                image={'http://127.0.0.1:8000/'+recommended.p_image}
                p_id={recommended.p_id}
                name={recommended.p_name}
                title={recommended.p_title}
                price={recommended.disc_price}
                
              />
              
            
        </div>
      </Container>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: asgfd</p>
                  <p className="mb-1">Color: asgfd</p>
                  <p className="mb-1">Size: asgfd</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
