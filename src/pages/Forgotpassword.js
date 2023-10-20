import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import axios from 'axios';
import Swal from 'sweetalert2'

const Forgotpassword = () => {

  const[email, setEmail] = useState('');
  const navigation=useNavigate();
          //  navigation('/Verify');
      
  const forgetPassword= async ()=>{
    // e.preventDefault();
    // console.log(email);
    if(email!=null){
      await axios.post('http://127.0.0.1:8000/user/forget_password/',{
       email : email,

      }).then((response)=>{
         console.log(response.data);
         const msg = response.data.msg;
         if(!response.data.error){
          //  localStorage.setItem('Item Added',true)
          Swal.fire({
            
            icon: 'success',
            title: msg,
            showConfirmButton: false,
            timer: 1500
          })
           navigation('/Verify');
         }else{
           (Swal.fire({
            background:'#ced8e6',
            title: msg,
            icon: 'warning',
            confirmButtonText: 'Okay'
          }))
         }
      })
    }

    

  }



useEffect(() => {
}, []);

  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form action="" className="d-flex flex-column gap-15">
                <CustomInput type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" />
                
    
    <Link to="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
      Go Back To Login 
    </Link>
  
                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="" type="submit">
                     
                      <Link onClick={() => {forgetPassword()}}> Submit</Link>
                    </button>
                    <Link to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;
