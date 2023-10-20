import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import axios from 'axios';
import Swal from 'sweetalert2';

const EmailVerify = () => {
  const navigation = useNavigate();
  const [code, setCode] = useState('');

  const verify = async (e) => {
    e.preventDefault();
    if (code !== '') {
      console.log(code);
      await axios.post('http://127.0.0.1:8000/user/validate/', {
        code: code,
      }).then((response) => {
        console.log(response.data);
        const msg = response.data.data;
        if (!response.data.error) {
          localStorage.setItem('id', JSON.stringify(response.data.id));
          Swal.fire({
            icon: 'success',
            title: msg,
            showConfirmButton: false,
            timer: 1500,
          });
          navigation('/login');
        } else {
          Swal.fire({
            background: '#ced8e6',
            title: msg,
            icon: 'warning',
            confirmButtonText: 'Okay',
          });
          navigation('/Verify');
        }
      });
    }
  };

  return (
    <>
      <Meta title={"Email authentication"} />
      <BreadCrumb title="Email Authentication" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Email Authentication for signup</h3>
              <p className="text-center mt-2 mb-3">
                Kindly enter the verification code that has been sent to you in the email.
              </p>
              <form action="" className="d-flex flex-column gap-15">
              <label htmlFor="email" style={{ display: 'block' }}>
  Email Verification code<span style={{ color: 'red' }}>*</span>
</label>
                <CustomInput type = "integer" name="VerificationCode" placeholder="Verification Code" onChange={(e) => setCode(e.target.value)} />

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit" onClick={verify}>
                      Submit
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

export default EmailVerify;
