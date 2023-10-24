import React, {useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import CategorySlider from "./CategorySlider";
import ReactStars from "react-rating-stars-component";
import CompareCard from "../components/CompareCard";
import Color from "../components/Color";
import Container from "../components/Container";


import axios from 'axios';
const Selectproduct = () => {



  
  const [grid, setGrid] = useState(4);
  const [products,getProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);


  
useEffect(() => {
  getAllProducts();
      }, []);
const getAllProducts = async (e) => {
  try{
    await axios.get('http://127.0.0.1:8000/products/product_display/').then((response)=>{
     
      if(!response.data.error){
          // const allProducts = response.data;
          getProducts(response.data);
          console.log(response.data)
      }else{
        alert(response.msg)
      }
   })
  }catch(error){
    console.log(error)
  }
}


useEffect(() => {
  // Filter the products based on the search query whenever it changes
  const filtered = products.allproducts ? products.allproducts.filter(product =>
    product.p_name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];
  setFilteredProducts(filtered);
}, [searchQuery, products]);

  return (
    <>
      <Meta title={"Compare select prodcut"} />
      <BreadCrumb title="SelectProduct for compare" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
         

           
          <div className="col-12 align-items-center justify-content-center">
            <div className="filter-sort-grid mb-7">
              <div className="d-flex justify-content-between align-items-center">
                
                <div className="d-flex align-items-center gap-3">
                
                  
                  
                </div>
              </div>
            </div>
            


      {/* Existing code... */}
      <div className="row">
        {filteredProducts.map((product) => (
          <CompareCart
            
            key={product.p_id}
            image={'http://127.0.0.1:8000/' + product.p_image}
            p_id={product.p_id}
            name={product.p_name}
            price={product.disc_price}
            style={{ size: '10%' }}
          />
        ))}
      </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Selectproduct;

