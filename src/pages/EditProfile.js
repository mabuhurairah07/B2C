import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;
  
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigate();

  

  const handleSubmit = async () => {
    // e.preventDefault();

    // Reset previous errors
    setUsernameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');

    let hasError = false;

    if (!/^[A-Za-z]+$/.test(name)) {
      setUsernameError('Username should contain only alphabets.');
      hasError = true;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email format.Right format dua@gmail.com');
      hasError = true;
    }

    if (!/^[0-9]{11}$/.test(contactNumber)) {
      setPhoneError('Phone number should be a 11-digit number.');
      hasError = true;
    }

    if (address.length < 15) {
      setPasswordError('Address should be at least 15 characters long.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/user/user/'+user_id, {
        username: name,
        email: email,
        phone_no: contactNumber,
        // password: password,
        address : address
      });

      if (!response.data.error) {
        alert(response.data.msg);
        navigation('/');
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      alert('An error occurred during update.');
    }
  }


  return (
    
    <div style={{backgroundColor: '#CACFD2'}}>
      <h1 style={{backgroundColor: '##ece6ff'}} className='VEH1'>Edit Profile</h1>
      <form>
        <label htmlFor="name">Name</label>
        <input className='VE-input'
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input className='VE-input'
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

<label htmlFor="address">Address</label>
        <input className='VE-input'
          type="address"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="contactNumber">Contact Number</label>
        <input className='VE-input'
          type="tel"
          id="contactNumber"
          name="contactNumber"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
