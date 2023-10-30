// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUserContext = () => {

  
  return useContext(UserContext);
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch user data and cart count here
    const fetchUserData = async () => {
      const user=JSON.parse(localStorage.getItem('user'));

      const userObj = JSON.parse(localStorage.getItem('user'));
      const user_id = userObj ? userObj.id : null;
      try {
        const userResponse = await axios.get('http://127.0.0.1:8000/user/user/' + user_id);
        setUser(userResponse.data.data[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCartCount = async () => {
      const user=JSON.parse(localStorage.getItem('user'));

      const userObj = JSON.parse(localStorage.getItem('user'));
      const user_id = userObj ? userObj.id : null;
      try {
        const cartCountResponse = await axios.get('http://127.0.0.1:8000/cart_details/cartcount/' + user_id);
        setCartCount(cartCountResponse.data.data);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchUserData();
    fetchCartCount();
  }, []);

  return (
    <UserContext.Provider value={{ user, cartCount }}>
      {children}
    </UserContext.Provider>
  );
}
