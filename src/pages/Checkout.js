import React,{useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import axios from "axios";

const Checkout = () => {
  const url=useParams('url');
  console.log("Checkout");
  console.log(url)
  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;
  const [order, setOrder] = useState({});
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const navigation = useNavigate();
  const [zip, setZip] = useState('');
  const [cardnumber, setCardNumber] = useState(0);
  const [cvc,setCvc] = useState(0);
  const [expirymonth,setExpirymonth] = useState(0);
  const [expiryyear,setExpiryyear] = useState(0);
  const [formDisabled, setFormDisabled] = useState(true);
  const [paymentOption, setPaymentOption] = useState("Cash");

  const [submit,setSubmit]=useState(0);
  const [number, setNumber] = useState(0);
  const [PAddress, setPAddress] = useState(0);


const addOrder = async ()=>{
  // console.log(product)
  if (user_id!=0){
    await axios.post('http://127.0.0.1:8000/order_details/order/',{
      user_id : user_id,
      card_number : cardnumber,
      exp_month : expirymonth,
      exp_year : expiryyear,
      cvc : cvc,
      payment_type : paymentOption,
      user_id : user_id,
      city : city,
      state : state,
      zip : zip,
      address : address,
      firstname : firstname,
      lastname : lastname,
      o_panel : 1
    }
    ).then((response)=>{
      // alert(response.data.msg);
      // let url=response.data.url;
      // console.log("Cart")
      alert(response.data.msg);
      // navigation('/checkout/'+encodeURIComponent(url))
    }).catch((err)=>{
      alert(err)
    })
}
  

}
const [products,getProducts] = useState([]);

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


// console.log(order)
useEffect(() => {
  if (paymentOption === "Stripe") {
    setFormDisabled(false);
  } else {
    setFormDisabled(true);
  }
      }, [paymentOption]);




      useEffect(() => {
        getAllProducts();
            }, [submit]);
 
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Easy Bay</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                     Go Back To Cart
                    </Link>
                  </li>
                 
                 
                
                 
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
               EasyBay (EasyBay@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                
                <div className="flex-grow-1">
                <label htmlFor="" style={{ display: 'block' }}>
  UserName <span style={{ color: 'red' }}>*</span>
</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    onChange={(e)=>setFirstName(e.target.value)}
                    value={firstname}
                  />
                </div>
                <div className="flex-grow-1">
                <label htmlFor="" style={{ display: 'block' }}>
  Phone Number <span style={{ color: 'red' }}>*</span>
</label>
                  <input
    type="tel"
    placeholder="11-digit Phone Number"
    pattern="[0-9]{11}"
    className="form-control"
    onChange={(e) => setNumber(e.target.value)}
    value={number}
    required
  />
                </div>
                <div className="flex-grow-1">
  <label htmlFor="" style={{ display: 'block' }}>
    Shipping Address <span style={{ color: 'red' }}>*</span>
  </label>
  <input
    type="text"
    placeholder="Shipping Address"
    className="form-control"
    onChange={(e) => setAddress(e.target.value)}
    value={address}
    required
  />
</div>

<label>
  <input
    type="checkbox"
    onChange={(e) => {
      if (e.target.checked) {
        setPAddress(address);
      }
    }}
  />
  Same as Shipping Address
</label>



<div className="flex-grow-1">
  <label htmlFor="" style={{ display: 'block' }}>
    Permanent Address <span style={{ color: 'red' }}>*</span>
  </label>
  <input
    type="text"
    placeholder="Permanent Address"
    className="form-control"
    onChange={(e) => setPAddress(e.target.value)}
    value={PAddress}
    required
  />
</div>

<div className="flex-grow-1">
  <label htmlFor="" style={{ display: 'block' }}>
    Province <span style={{ color: 'red' }}>*</span>
  </label>
  <select
    className="form-control"
    onChange={(e) => setState(e.target.value)}
    value={state}
    required
  >
    <option value="">Select State</option>
    <option value="Punjab">Punjab</option>
    <option value="Sindh">Sindh</option>
    <option value="KPK">KPK</option>
    <option value="Balochistan">Balochistan</option>
    <option value="Gilgit Baltistan">Gilgit Baltistan</option>
  </select>
</div>
                <div className="flex-grow-1">

                <label htmlFor="" style={{ display: 'block' }}>
    City <span style={{ color: 'red' }}>*</span>
  </label>

                  <input
                    type="text"
                    placeholder="City name"
                    className="form-control"
                    onChange={(e)=>setCity(e.target.value)}
                    value={city}
                  />
                </div>
               
                
                <div className="flex-grow-1">
                <label htmlFor="" style={{ display: 'block' }}>
    City <span style={{ color: 'red' }}>*</span>
  </label>
                  <input
                    type="number"
                    placeholder="52250"
                    className="form-control"
                    onChange={(e)=>setZip(e.target.value)}
                    value={zip}
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
            <div className="col-5">
            <div className="border-bottom py-4">
              <div className="d-flex gap-10 mb-2 align-align-items-center">


              {
  products.map((item) => {
    return (
      <>
        {item.panel === 1 ? 
          <div className="cart-col-1 gap-15 d-flex align-items-center">
            <div className="w-25">
              <img
                className="img-fluid"
                alt="product image"
                src={process.env.REACT_APP_BACKEND_URL + item.product.p_image}
                style={{height:'100px'}}
              />
            </div>
            <br />
            <div className="w-75" key={item.product.id}>
              <p>{item.product.p_name}</p>

              <br/><br/>
              <h5 className="price">$ {item.product.p_price}</h5>
              
              {/* <p>Size: {item.product.size}</p>
              <p>Color: {item.product.color}</p> */}
            </div>
{/* 
            <div className="cart-col-2">
                <h5 className="price">$ {item.product.p_price}</h5>
              </div> */}
             

          </div>

          



          
          : 'Loading'
            } 
            
                  
      </>
    );
  })
}



              </div>
            </div>
                  {/* <div className="border-bottom py-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="total">Subtotal</p>
                      <p className="total-price">$ 500</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0 total">Shipping</p>
                      <p className="mb-0 total-price">${500}</p>
                    </div>
                  </div> */}
                  <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                    <h4 className="total">Total</h4>
                    <h5 className="total-price">$500</h5>
                  </div>
           <div>
  <label>
  <input
    type="radio"
    name="paymentOption"
    value="Cash"
    checked={paymentOption === "Cash"}
    onChange={() => setPaymentOption("Cash")}
  />
  Cash on Delivery
</label>

<label style={{ paddingLeft: "90px" }}>
  <input
    type="radio"
    name="paymentOption"
    value="Stripe"
    checked={paymentOption === "Stripe"}
    onChange={() => setPaymentOption("Stripe")}
  />
  Online payment
</label>

      <br />

      </div>
      {paymentOption === "Stripe" && (
      <fieldset>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            className="form-control"
            onChange={(e)=>setCardNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input
            type="text"
            id="cvc"
            className="form-control"
            onChange={(e)=>setCvc(e.target.value)}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="expiryMonth">Expiry Month</label>
            <input
              type="text"
              id="expiryMonth"
              className="form-control"
              onChange={(e)=>setExpirymonth(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="expiryYear">Expiry Year</label>
            <input
              type="text"
              id="expiryYear"
              className="form-control"
              onChange={(e)=>setExpiryyear(e.target.value)}
            />
          </div>
        </div>
      </fieldset>
      )}
            <Link onClick={addOrder} className="button" style={{marginTop: '90PX', marginLeft: '380px'} } disabled={formDisabled} >
                      Place Order
                    </Link>
                  </div>
              
        </div>
      </Container>
    </>
  );
};

export default Checkout;
