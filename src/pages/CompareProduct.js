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
        <div className="col-4">
        </div>
              {product.length !== 0 && details.length !== 0 ? (
        <div className="col-8">
          <div className="row">
            {product.map((item, index) => {
              const detail = details[index];
              return (
                <div key={item.p_id} className="col-md-6">
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={'http://127.0.0.1:8000/' + item.p_image} alt={item.p_name} style={{ maxWidth: "150px" }} />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.p_name}</h5>
                          <div className="card-details"  style={{marginTop:'100px'}}>
                          <tbody>
        {category === 'AC' && (
          <>
            <tr>
              <td>Capacity:</td>
              <td>{detail.ac_capacity}</td>
            </tr>
            <tr>
              <td>Type:</td>
              <td>{detail.ac_type}</td>
            </tr>
            <tr>
              <td>Inverter:</td>
              <td>{detail.ac_inverter}</td>
            </tr>
            <tr>
              <td>Warranty:</td>
              <td>{detail.ac_warranty}</td>
            </tr>
            <tr>
              <td>Energy Efficiency:</td>
              <td>{detail.ac_energy_efficiency}</td>
            </tr>
          </>
        )}

          {category === 'Laptops' && (
            <>
              <tr>
                <td>Processor:</td>
                <td>{detail.laptop_processor}</td>
              </tr>
              <tr>
                <td>Battery:</td>
                <td>{detail.laptop_battery}</td>
              </tr>
              <tr>
                <td>Memory:</td>
                <td>{detail.laptop_memory}</td>
              </tr>
              <tr>
                <td>Display:</td>
                <td>{detail.laptop_display}</td>
              </tr>
              <tr>
                <td>Generation:</td>
                <td>{detail.laptop_generation}</td>
              </tr>
            </>
          )}

          {category == 'Phones' && (
            <>
              <tr>
                <td>Processor:</td>
                <td>{detail.mobile_processor}</td>
              </tr>
              <tr>
                <td>Battery:</td>
                <td>{detail.mobile_battery}</td>
              </tr>
              <tr>
                <td>Memory:</td>
                <td>{detail.mobile_memory}</td>
              </tr>
              <tr>
                <td>Display:</td>
                <td>{detail.mobile_display}</td>
              </tr>
              <tr>
                <td>Camera:</td>
                <td>{detail.mobile_camera}</td>
              </tr>
            </>
          )}

          {category == 'LCD' && (
            <>
              <tr>
                <td>Display:</td>
                <td>{detail.lcd_display}</td>
              </tr>
              <tr>
                <td>Power Consumption:</td>
                <td>{detail.lcd_power_consumption}</td>
              </tr>
              <tr>
                <td>Audio:</td>
                <td>{detail.lcd_audio}</td>
              </tr>
              <tr>
                <td>Chip:</td>
                <td>{detail.lcd_chip}</td>
              </tr>
            </>
          )}

        </tbody>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : 'Loading'}

        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
