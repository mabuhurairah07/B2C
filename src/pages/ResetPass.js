import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPass = () => {
  const userObj = JSON.parse(localStorage.getItem('id'));
  const user_id = userObj ? userObj : null;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const navigation = useNavigate();

  const resetPass = async (e) => {
    e.preventDefault();

    // Check if the passwords match and meet the minimum length requirement
    if (password.length < 6) {
      Swal.fire({
        background: '#ced8e6',
        title: 'Password must be at least 6 characters long.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        background: '#ced8e6',
        title: 'Passwords do not match.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
      return;
    }

    // Reset the password
    await axios.post(`http://127.0.0.1:8000/user/update_password/${user_id}`, {
      password: password,
    }).then((response) => {
      console.log(response.data);
      const msg = response.data.msg;
      if (!response.data.error) {
        Swal.fire({
          icon: 'success',
          title: msg,
          showConfirmButton: false,
          timer: 1500
        })
        navigation('/login');
      } else {
        (Swal.fire({
          background: '#ced8e6',
          title: msg,
          icon: 'warning',
          confirmButtonText: 'Okay'
        }))
        navigation('/ResetPass');
      }
    });
  }

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form className="d-flex flex-column gap-15">
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <CustomInput
                  type="password"
                  name="confpassword"
                  placeholder="Confirm Password"
                  value={confirmPassword} // Bind value to confirmPassword state
                  onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                />
                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <button
                    className="button border-0"
                    onClick={resetPass}
                  >
                    Ok
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ResetPass;
