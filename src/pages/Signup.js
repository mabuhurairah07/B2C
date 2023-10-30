import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import axios from 'axios';

const Signup = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword !== e.target.value) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setUsernameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');

    let hasError = false;

    if (!/^[A-Za-z]+$/.test(username)) {
      setUsernameError('Username should contain only alphabets.');
      hasError = true;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email format.Right format dua@gmail.com');
      hasError = true;
    }

    if (!/^[0-9]{11}$/.test(phone_no)) {
      setPhoneError('Phone number should be a 11-digit number.');
      hasError = true;
    }

    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters long.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/user/signup/', {
        username: username,
        email: email,
        phone_no: phone_no,
        password: password
      });

      if (!response.data.error) {
        localStorage.setItem('Sign up Successful', true);
        localStorage.setItem('user', response.data.data);
        alert(response.data.msg);
        navigation('/emailVerify');
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      alert('An error occurred during registration.');
    }
  }

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="" className="d-flex flex-column gap-15">
              <label htmlFor="username" style={{ display: 'block' }}>
  User Name <span style={{ color: 'red' }}>*</span>
</label>
<input
  id="username"
  className="form-control"
  placeholder="User Name"
  value={username}
  onChange={(e) => setUserName(e.target.value)}
  required
  pattern="[A-Za-z]+"
/>
                {usernameError && (
                  <div className="alert alert-danger mt-2">
                    {usernameError}
                  </div>
                )}
                <label htmlFor="email" style={{ display: 'block' }}>
  Email <span style={{ color: 'red' }}>*</span>
</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder=" rimsha@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && (
                  <div className="alert alert-danger mt-2">
                    {emailError}
                  </div>
                )}
                <label htmlFor="tel" style={{ display: 'block' }}>
  Phone number <span style={{ color: 'red' }}>*</span>
</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+92, 92, 330-6767755"
                  value={phone_no}
                  onChange={(e) => setPhone_no(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                />
                {phoneError && (
                  <div className="alert alert-danger mt-2">
                    {phoneError}
                  </div>
                )}
                <label htmlFor="password" style={{ display: 'block' }}>
        Password <span style={{ color: 'red' }}>*</span>
      </label>
      <input
        type="password"
        className="form-control"
        placeholder="******"
        value={password}
        onChange={handlePasswordChange}
        required
        minLength="6"
      />
      <label htmlFor="confirmPassword" style={{ display: 'block' }}>
        Confirm Password <span style={{ color: 'red' }}>*</span>
      </label>
      <input
        type="password"
        className="form-control"
        placeholder="******"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
        minLength="6"
      />
      {passwordError && (
        <div className="alert alert-danger mt-2">
          {passwordError}
        </div>
      )}
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <Link to="/emailVerify">
                    <button className="button border-0" onClick={handleSubmit}>Sign Up</button>
                   </Link>
                  </div>
                </div>
              </form>
              <p>
    Already have an account? 
    <Link to="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
      Login
    </Link>
  </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
