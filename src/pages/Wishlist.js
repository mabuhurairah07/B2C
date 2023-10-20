import React, {useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import axios from 'axios';


const Wishlist = () => {
  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;
  const [product,setProduct]=useState([]);
  const [submit,setSubmit]=useState(0);

 
  

    const fetchWishList= async()=>{
      if(user_id.length!=0){
        await axios.get('http://127.0.0.1:8000/products/wishlist/'+user_id
        ).then((response)=>{
         console.log(response.data.data);
        if(!response.data.error){
            setProduct(response.data.data);
        }else{
           alert(response.data.msg)
          }
        })
      }
    }
    const deleteWishList= async(product_id)=>{
      // console.log(product_id)
      if(user_id.length!=0){
        await axios.post('http://127.0.0.1:8000/products/delete_wishlist/',{
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

    useEffect(()=>{
      fetchWishList();
    },[submit])
  return (
    <>
   
          <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
      <div className="row">
        {
            product.length!=0?
            product.map((item) => {
             return(
              <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
                onClick={()=>deleteWishList(item.product.p_id)}
              />
              <div className="wishlist-card-image">
                <img
                  src={'http://127.0.0.1:8000/'+item.product.p_image}
                  className="img-fluid w-100"
                  alt="product_image"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  {item.product.p_name}
                </h5>
                <h6 className="price">$ {item.product.p_price}</h6>
              </div>
            </div>
          </div>
             ) 
            })
          :
          'Loading Data....'
          }
          
      

          {/* <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src="images/watch.jpg"
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                </h5>
                <h6 className="price">$ 100</h6>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src="images/watch.jpg"
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                </h5>
                <h6 className="price">$ 100</h6>
              </div>
            </div>
          </div> */}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
