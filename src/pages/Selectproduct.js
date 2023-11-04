import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import CompareCard from "../components/CompareCard";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";

const Selectproduct = () => {
  const { cat } = useParams();
  const [products, getProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigation = useNavigate();
  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;

  useEffect(() => {
    getAllProducts();
  }, [cat]);

  const getAllProducts = async () => {
    try {
      await axios.get('http://127.0.0.1:8000/products/product_display/').then((response) => {
        if (!response.data.error) {
          getProducts(response.data);
          console.log(response.data);
        } else {
          alert(response.msg);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Filter the products based on the search query and selected category
    const filtered = products.allproducts
  ? products.allproducts.filter((product) => {
      const nameMatch = product.p_name.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = cat ? product.category.cat_name === cat : true; // Only filter by category if a category is selected
      return nameMatch && categoryMatch;
    })
  : [];
setFilteredProducts(filtered);

  }, [searchQuery, products, cat]);

  const handleAddToCompare = (product) => {
    if (user_id !== null) {
      // Get the product_id from the selected product
      const product_id = product.p_id;
  
      if (product_id) {
        // Check if the product_id in local storage matches the current product's id
        const storedProductID = localStorage.getItem('product_id');
  
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
  
  

  return (
    <>
      <Meta title={"Compare select product"} />
      {/* <BreadCrumb title="" /> */}
      {/* Your other components and JSX here... */}
      <h1 className="compare-heading">Select Product for Compare</h1>
<br /> <br />
      <div className="row">
            {filteredProducts.map((product) => (
        <CompareCard
          key={product.p_id}
          image={'http://127.0.0.1:8000/' + product.p_image}
          p_id={product.p_id}
          name={product.p_name}
          price={product.disc_price}
          style={{ size: '10%' }}
          onClick={() => handleAddToCompare(product)}
        />
      ))}
      </div>
    </>
  );
};

export default Selectproduct;
