import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import EditProfile from "../pages/EditProfile";
const ViewProfile = () => {

  const user=JSON.parse(localStorage.getItem('user'));

  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;

  const [data, setData] = useState('');
  // const navigation = useNavigate();

  

  const handleSubmit = async () => {
    
    try {
      const response = await axios.get('http://127.0.0.1:8000/user/user/'+user_id, {
      });

      if (!response.data.error) {
        // alert(response.data.msg);
        setData(response.data.data[0])
        
        // navigation('/');
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      alert('An error occurred during update.');
    }
  }
  console.log(data);
  useEffect(()=>{
    handleSubmit();
  },[])
  return ( 
    <div style={{backgroundColor: '#CACFD2'}}>
    <h1 style={{backgroundColor: '##ece6ff'}} className='VEH1' >View Profile</h1>
      <form style={{marginBottom: '50px'}}>
        <label htmlFor="name">Name</label>
        <input className='VE-input'
          type="text"
          id="name"
          name="name"
          value={data.username?data.username:'Loading'}  readOnly
        //   onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input className='VE-input'
          type="email"
          id="email"
          name="email"
          value={data.email?data.email:'Loading'}  readOnly
        //   onChange={(e) => setEmail(e.target.value)}
        />

       
        
<label htmlFor="address">Address</label>
        <input className='VE-input'
          type="address"
          id="address"
          name="address"
          value={data.address?data.address:'No Added Address'} readOnly
        />
        <label htmlFor="contactNumber">Contact Number</label>
        <input className='VE-input'
          type="tel"
          id="contactNumber"
          name="contactNumber"
          value={data.phone_no?data.phone_no:'Loading'} readOnly
        />
       


      </form>
    
    </div>
    
  );
};

export default ViewProfile;
