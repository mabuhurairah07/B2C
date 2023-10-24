import React ,{useState, useEffect} from "react";

import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from 'sweetalert2'

const CompareCard = (props) => {
  const { grid } = props;
  const navigation=useNavigate();
  const {id}=useParams();
  const [product,setProduct]=useState([]);
  const [details,setDetails]=useState([]);
  const [category,setCategory] = useState('')
  const [submit,setSubmit]=useState(0);

  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;

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

  const fetchCompare= async()=>{
    if(user_id.length!==0){
      await axios.get('http://127.0.0.1:8000/products/compare/'+user_id
      ).then((response)=>{
        console.log('loop');
        // console.log(response.data.data);
        if(!response.data.error){
          setProduct(response.data.data.product);
          setDetails(response.data.data.details);
          setCategory(response.data.data.category);
        }else{
          const errorData = {
            icon: 'error',
            title: 'Oops...',
            text: response.data.msg,
            confirmButtonText: 'OK'
          }
          Swal.fire(errorData)
        }
      })
    }
  }
  
  let location = useLocation();
  console.log(product);
  console.log('Category');
  console.log(category);
  
  useEffect(()=>{
    fetchCompare();
  },[submit])
  return (
    <>
      <div
        className={`p-2 ${
          location.pathname == "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <Link
          to={`${
            location.pathname == "/"
              ? `/product/${props.p_id}`
              : location.pathname == "/product/:id"
              ? `/product/${props.p_id}`
              : `${props.p_id}`
          }`}
          className="product-card position-relative"
        >
         
          <div className="product-image position-sticky">
         
                <div>
                  <img src={props.image} className="img-fluid"/>
                </div>
           
          </div>
          <div className="product-details position-relative">
              <h6 className="brand">{props.name}</h6>
              <h5 className="product-title">
              {props.title}
                
              </h5>
              <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
               
              </p>
              <p className="price">{props.price}</p>
          </div>


          <div>
          <button
                      className="button border-0 ml-5 mb-4"
                   
                      type="button" 
                      onClick={handleAddToCompare}
                    >
                      Add to Compare
                    </button>
          </div>

        </Link>
        </div>
     
    </>
  );
};


export default CompareCard;
