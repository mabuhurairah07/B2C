import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import { BiArrowBack } from "react-icons/bi";

const CompareProduct = () => {
  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;
  const [product, setProduct] = useState([]);
  const [details, setDetails] = useState([]);
  const [category, setCategory] = useState('');
  const [submit, setSubmit] = useState(0);
  const navigation = useNavigate();

  const fetchCompare = async () => {
    const p_id = JSON.parse(localStorage.getItem('product_id'));
    const p_id1 = JSON.parse(localStorage.getItem('product_id1'));
    if (user_id) {
      await axios.post('http://127.0.0.1:8000/products/compare/', {
        p_id: p_id,
        p_id1: p_id1
      }).then((response) => {
        if (!response.data.error) {
          setProduct(response.data.data.product);
          setDetails(response.data.data.details);
          setCategory(response.data.data.category);
        } else {
          const errorData = {
            icon: 'error',
            title: 'Oops...',
            text: response.data.msg,
            confirmButtonText: 'OK'
          };
          Swal.fire(errorData);
        }
      });
    }
  };

  const handleAddToCart = async (product_id) => {
    if (user_id) {
      await axios.post('http://127.0.0.1:8000/cart_details/addtocart/', {
        product: product_id,
        user_data: user_id,
        quantity: 1,
        panel: 1
      }).then((response) => {
        const msg = response.data.msg;
        if (!response.data.error) {
          Swal.fire({
            icon: 'success',
            title: msg,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            background: '#ced8e6',
            title: 'Product Already in Cart',
            icon: 'warning',
            confirmButtonText: 'Okay'
          });
        }
      });
    } else {
      Swal.fire({
        background: '#ced8e6',
        text: 'Please Login First',
        confirmButtonText: 'Okay'
      });
      navigation('/login');
    }
  };

  const deleteCompare = async (product_id) => {
    if (user_id) {
      await axios.post('http://127.0.0.1:8000/products/delete_compare/', {
        user_id: user_id,
        product_id: product_id
      }).then((response) => {
        setSubmit(submit + 1);
      }).catch((err) => {
        console.log(err);
      });
    }
  };
  console.log(product);
  console.log(details);
  console.log(category);
  useEffect(() => {
    fetchCompare();
  }, [submit]);

  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          {product.length != 0 && details.length != 0 ? (
            <div className="col-12">
              <table className="compare-table">
                <tbody>
                  {product.map((item, index) => {
                    if (item.product) {
                      const detail = details[index];
                      return (
                        <tr key={item.product.p_id}>
                          <td>
                            <h5>{item.product.p_name}</h5>
                          </td>
                          <td>
                            <table className="detail-table">
                              <tbody>
                                {category == 'AC' && (
                                  <tr>
                                    <td>Capacity:</td>
                                    <td>{detail.ac_capacity}</td>
                                  </tr>
                                  // Add more AC details here...
                                )}
                                {category == 'Laptops' && (
                                  <tr>
                                    <td>Processor:</td>
                                    <td>{detail.laptop_processor}</td>
                                  </tr>
                                  // Add more Laptop details here...
                                )}
                                {category == 'Phones' && (
                                  <tr>
                                    <td>Processor:</td>
                                    <td>{detail.mobile_processor}</td>
                                  </tr>
                                  // Add more Phone details here...
                                )}
                                {category == 'LCD' && (
                                  <tr>
                                    <td>Display:</td>
                                    <td>{detail.lcd_display}</td>
                                  </tr>
                                  // Add more LCD details here...
                                )}
                              </tbody>
                            </table>
                          </td>
                          <td>
                            <button
                              className=""
                              type=""
                              onClick={() => handleAddToCart(item.product.p_id)}
                            >
                              Add to Cart
                            </button>
                            <Link to="/" className="text-dark">
                              <BiArrowBack className="me-2" />
                              Return to Home
                            </Link>
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
          ) : 'Loading'}
        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
