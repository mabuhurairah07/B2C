import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Product() {
  const [p_name, setName] = useState('');
  const [p_brand, setBrand] = useState('');
  const [p_status, setStatus] = useState('');
  const [p_des, setDescription] = useState('');
  const [p_price, setPrice] = useState('');
  const [disc_price, setDiscountedPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');
  const [user_data, setUserId] = useState('');
  const [p_image, setImage] = useState(null);

  const handleSubmit= async (e)=>{
    e.preventDefault();

    // if(username.length!=0 && password.length!=0 && email.length!=0 && phone_no.length!=0){
       await axios.post('http://127.0.0.1:8000/products/add_product/',{
        p_name: p_name,
        p_image : p_image,
        p_brand : p_brand,
        p_status:p_status,
        p_price : p_price,
        p_des:p_des,
        disc_price:disc_price,
        discount:discount,
        category:category,
        sub_category:sub_category,
        user_data:user_data
       },{
        headers:{
          "Content-Type":'multipart/form-data'
        }
       }).then((response)=>{
          // console.log("DFGDFGFG"+response.data.p_image);
          if(!response.data.error){
            // localStorage.setItem('Product Added',true)
            // localStorage.setItem('user',response.data.data)
            alert(response.data.msg)
            // navigation('/login');
          }else{
            alert(response.data.msg)
          }
       })
    // }

  }
  

  useEffect(()=>{
    localStorage.clear()
  })



  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={p_name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Brand:
        <input type="text" value={p_brand} onChange={(event) => setBrand(event.target.value)} />
      </label>
      <label>
        Status:
        <input type="text" value={p_status} onChange={(event) => setStatus(event.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={p_des} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <label>
        Price:
        <input type="text" value={p_price} onChange={(event) => setPrice(event.target.value)} />
      </label>
      <label>
        Discounted Price:
        <input type="text" value={disc_price} onChange={(event) => setDiscountedPrice(event.target.value)} />
      </label>
      <label>
        Discount:
        <input type="text" value={discount} onChange={(event) => setDiscount(event.target.value)} />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(event) => setCategory(event.target.value)} />
      </label>
      <label>
        Sub Category:
        <input type="text" value={sub_category} onChange={(event) => setSubCategory(event.target.value)} />
      </label>
      <label>
        User ID:
        <input type="text" value={user_data} onChange={(event) => setUserId(event.target.value)} />
      </label>
      <label>
        Image:
        <input type="file" onChange={handleImageChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Product;
