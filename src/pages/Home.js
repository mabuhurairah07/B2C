import React, {useEffect, useState} from "react";
import { Link, navigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Marquee from "react-fast-marquee";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";

import axios from 'axios';
import Color from "../components/Color";




function Home() {

  


   const Alert = ( ) => {
    Swal.fire('My Alert')
   }
const [products,getProducts] = useState([]);
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
        alert(Alert)
      }
   })
  }catch(error){
    console.log(error)
  }
}

  return (
    <>
      

      <div>
      
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="/images/home/img1.jpg" class="d-block w-100" alt="IPhone" height="500px"/>
    </div>
                        <div class="carousel-item">
                            <img src="/images/home/img2.jpg" class="d-block w-100" alt="IPhone" height="500px"/>
    </div>

  

                            <div class="carousel-item">
                                <img src="/images/home/img3.jpg" class="d-block w-100" alt="IPhone" height="500px"/>
    </div>
                            <div class="carousel-item">
                                <img src="/images/home/img4.jpg" class="d-block w-100" alt="IPhone" height="500px"/>
    </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>


                            
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        
                    </div>



<section className= "home-wrapper-2 py-5">
<div className="container.xxl">
<div className="row">
<div className="col-12" >
<h3 style={{paddingLeft:'50%', color:'purple', backgroundColor:'#E0D7FF'}}>          SERVICES</h3>
<div className="services d-flex align-items-center justify-content-between">
<div style={{paddingTop:'10px', paddingRight:'40px'}}>
  <img src="images/service.png" alt="services" />

  <div>
    <h6>Free Shipping</h6>
    <p >From all orders over $10</p>
  </div>
</div>
<div>
<img src="images/service-02.png" alt="services" />

<div  >
  <h6>Daily Surprise Offers</h6>
  <p >Save up to 25%</p>
</div>

<div>
  <h6></h6>
  <p></p>
</div></div>
<div >
<img src="images/service-03.png" alt="services" />

<div>
  <h6>Support 24/7</h6>
  <p >Shop with an expert</p>
</div></div>
<div>
<img src="images/service-04.png" alt="services" />

<div >
  <h6>Affordable Prices</h6>
  <p >Get factory direct place</p>
</div>
</div>
<div>
<img src="images/service-05.png" alt="services" />

<div >
  <h6>Secure Payments</h6>
  <p>100% protected payments</p>
</div>
</div>


</div>
</div>
</div>
</div>


</section>



      
      
    

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/AC.png"
                className="img-fluid"
                alt="famous"
                style={{height: '360px'}} />
              <div className="famous-content position-absolute">
                <h5>Air Conditioner</h5>
                <h6>Blue Star1</h6>
                <p>From $399or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-2.webp"
                className="img-fluid"
                alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/LCD.jpg"
                className="img-fluid"
                alt="famous"
                style={{height:'360px', width:'100%'}} />
              <div className="famous-content position-absolute">
                <h5 className="text-white">home speakers</h5>
                <h6 className="text-white ">Room-filling sound.</h6>
                <p className="text-white">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row"  style={{ position:'relative', alignItems:'normal', imageSize:'50%'}}>
          <div className="col-12" >
            <h3 className="section-heading" >Special Products</h3>
          </div>
        </div>
        <div className="row" style={{ position:'relative', alignItems:'normal', tabSize:'50%'}} >  
        {
            products.special ?
            products.special.map((product) => (
        <SpecialProduct name={product.p_name}
        //  description={product.p_des}
         price = {product.p_price}img={'http://127.0.0.1:8000/'+product.p_image} />
          ))          
          :
          'Loading Data....'
          }
            
          </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading"> Products</h3>
          </div>
        </div>
        
        <div className="row">
                {/* <div className="product-container d-flex flex-wrap justify-content-between"> */}
          {
            products.allproducts ?
            products.allproducts.map((product) => (
              <ProductCard
                key={product.p_id}
                image={'http://127.0.0.1:8000/'+product.p_image}
                p_id={product.p_id}
                name={product.p_name}
                title={product.p_title}
                price={product.disc_price}
                
              />
              
            ))
          :
          'Loading Data....'
          }
            
     
        </div>
      </Container>
     
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                 <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div> 
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div> 
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      
    </>
  );
}

export default Home;
