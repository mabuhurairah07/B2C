
import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import axios from 'axios';
import ScrollToTop from "./ScrollToTop";

const Cart = () => {
  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;
  const [products,getProducts] = useState([]);
  const [quantity,setQuantity] = useState({});
  const [modelData,setModelData] = useState({});
  const [submit,setSubmit]=useState(0);
  const navigation = useNavigate();

  const getAllProducts = async (e) => {
    try{
      console.log(process.env.REACT_APP_BACKEND_URL);
      await axios.get(process.env.REACT_APP_BACKEND_URL+'cart_details/cart/'+user_id).then((response)=>{
       
        if(!response.data.error){
            getProducts(response.data.data);
            console.log(response.data.data);
        }else{
          alert(response.msg);
        }
     })
    }catch(error){
      console.log(error)
    }
  }


  const handleUpdateCart= async (e)=>{
    e.preventDefault();
    console.log(modelData)
    if(quantity.length!=0){
       await axios.post('http://127.0.0.1:8000/cart_details/cart/updated/',{
        user_data: user_id,
        product : modelData.product.p_id,
        quantity : modelData.quantity,
        panel : 1
       }).then((response)=>{
          console.log(response);
          if(!response.data.error){
            alert(response.data.msg)
          }else{
            alert(response.data.msg)
          }
       })
    }

  }
  const handleDeleteCart = async (product)=>{
      // console.log(product)
      if (user_id!=0){
        await axios.post('http://127.0.0.1:8000/cart_details/cart/delete/',{
          user_data : user_id,
          product : product,
        }
        ).then((response)=>{
          setSubmit(submit+1);
          console.log(response.data);
        }).catch((err)=>{
          console.log(err)
        })
    }
      

  }

  const openModel=(product)=>{
    setModelData(product);
    console.log(product)
  }
  const handleChangeModelData=(e)=>{
    // console.log(e.target.name)
    setModelData({...modelData,[e.target.name]:e.target.value});

  }
  useEffect(() => {
    getAllProducts();
        }, [submit]);
  return (
    <>
      <ScrollToTop />
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
      

      <div className="row">
       
       <div className="col-12">
         <div className="cart-header py-3 d-flex justify-content-between align-items-center">
           <h4 className="cart-col-1">Product</h4>
           <h4 className="cart-col-2">Price</h4>
           <h4 className="cart-col-3">Quantity</h4>
           <h4 className="cart-col-4">Total</h4>
         </div>

        {  
        products.map((item)=> {
            return(
              <>
            { item.panel==1 ?
              <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
              <div className="cart-col-1 gap-15 d-flex align-items-center">
                <div className="w-25">
                  <img className="img-fluid" alt="product image" src={process.env.REACT_APP_BACKEND_URL+item.product.p_image}/>
                </div>
                <div className="w-75" key={item.product.id}>
                  <p>{item.product.p_name}</p>
                  <p>Size: {item.product.size}</p>
                  <p>Color: {item.product.color}</p>
                </div>
              </div>
              <div className="cart-col-2">
                <h5 className="price">$ {item.product.p_price}</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center gap-15">
                <div>
                  <input
                    className="form-control"
                    type="number"
                    name=""
                    value={item.quantity}
                    readOnly
                  />
                </div>
              </div>
              <div className="cart-col-4">
                <h5 className="price">${parseFloat(item.product.p_price)*parseFloat(item.quantity)}</h5>
              </div>
              <div>
                <button className="btn btn-success" onClick={()=>openModel(item)} data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
              </div>
              <div>
                <button className="btn btn-danger" onClick={()=>handleDeleteCart(item.product.p_id)}>Delete</button>
              </div>
            </div>
            : 'Loading'
            } 
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <input
                    className="form-control"
                    type="number"
                    name="quantity"
                    min={1}
                    max={10}
                    value={modelData.quantity}
                    onChange={handleChangeModelData}
                  />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onClick={handleUpdateCart}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
          </>
          )
         })
        
        }
       </div>     
       <div className="col-12 py-2 mt-4">
         <div className="d-flex justify-content-between align-items-baseline">
           <Link to="/product" className="button">
             Continue To Shopping
           </Link>
           <div className="d-flex flex-column align-items-end">
             <p>Taxes and shipping calculated at checkout</p>
             <Link type="button" className="button" class="btn btn-primary" to='/checkout'>
               Checkout
             </Link>
           </div>
         </div>
       </div>
      </div>

      </Container>
    </>
  );
};

export default Cart;
