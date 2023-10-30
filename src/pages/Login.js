import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import axios from 'axios';

const Login = () => {
  const [username,setUserName]=useState('');
  const [password,setPassword]=useState('');
  const navigation=useNavigate();
  const handleSubmit= async (e)=>{
    e.preventDefault();

    if(username.length!=0 && password.length!=0){
       await axios.post('http://127.0.0.1:8000/user/login/',{
        username: username,
        password:password
       }).then((response)=>{
          console.log(response);
          // console.log(response.data.data)
          if(!response.data.error){
            localStorage.setItem('logged_in',true)
            localStorage.setItem('user',JSON.stringify(response.data.data))
            navigation('/');
            // refresh = True;
          }else{
            alert(response.data.msg)
          }
       })
    }

  }
  

  useEffect(()=>{
    localStorage.clear()
  })
  
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form action="" className="d-flex flex-column gap-15">
              <label htmlFor="" style={{ display: 'block' }}>
  User Name <span style={{ color: 'red' }}>*</span>
</label>
                <input class="form-control" placeholder="User Name" value={username} onChange={(e)=>setUserName(e.target.value)}/>
                <label htmlFor="Password " style={{ display: 'block' }}>
  Password <span style={{ color: 'red' }}>*</span>
</label>
                <input type="password" class="form-control" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                
                <div>
                 

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" onClick={handleSubmit} style={{marginTop: '1px'}}
                   
                    >
                      Login
                    </button>
                    
                    </div>
                    <div>
                    <Link to="/forgot-password">Forgot Password?</Link>
  <p>
    Click here to create an account: 
    <Link to="/signup" style={{ textDecoration: 'none', color: '#007bff' }}>
      Sign Up
    </Link>
  </p>
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

export default Login;
