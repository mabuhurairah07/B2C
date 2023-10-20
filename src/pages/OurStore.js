import React, {useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import CategorySlider from "./CategorySlider";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";


import axios from 'axios';
const OurStore = () => {



  
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
const handleSearchInputChange = (e) => {
  setSearchQuery(e.target.value);
};

useEffect(() => {
  // Filter the products based on the search query whenever it changes
  const filtered = products.allproducts ? products.allproducts.filter(product =>
    product.p_name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];
  setFilteredProducts(filtered);
}, [searchQuery, products]);

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          {/* <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li style={{fontSize:'18px'}}>Mobile Phones</li>
                  <li style={{fontSize:'18px'}}>Laptops</li>
                  <li style={{fontSize:'18px'}}>Air Conditioner</li>
                  <li style={{fontSize:'18px'}}>Air Buds</li>
                </ul>
              </div>
            </div> */}

           
          <div className="col-12 align-items-center justify-content-center">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
               
                <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
                  
                </div>
                <div className="d-flex align-items-center gap-10">
                
                  <p className="totalproducts mb-0"> Products</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                   
                     

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            


      {/* Existing code... */}
      <div className="row">
        {filteredProducts.map((product) => (
          <ProductCard
            grid={grid}
            key={product.p_id}
            image={'http://127.0.0.1:8000/' + product.p_image}
            p_id={product.p_id}
            name={product.p_name}
            title={product.p_title}
            price={product.disc_price}
            style={{ size: '20%' }}
          />
        ))}
      </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;

