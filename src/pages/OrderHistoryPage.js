import React, { Component } from 'react';
import Rating from 'react-rating-stars-component';
class OrderHistoryPage extends Component {
  constructor(props) {
    super(props);

    // Sample order history data
    this.state = {
      orders: [
        {
          id: 1,
          time: '2023-10-18 10:00 AM',
          product: 'LCD',
          image: 'images/tv.jpg',
          price: 19.99,
          rating: 4.5, // Added product rating
        },
        {
          id: 2,
          time: '2023-10-17 2:30 PM',
          product: 'MOBILE',
          image: 'images/iphone.jpg',
          price: 29.99,
          rating: 5.0, // Added product rating
        },
        // Add more order entries as needed
      ],
    };
  }
  handleRatingChange = (newRating, order) => {
    // Handle the new rating value, you can update the state or perform other actions
    console.log(`New rating for order ${order.id}: ${newRating}`);
  }

  

  render() {
    const { orders } = this.state;
    

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor:'#D5E3F0' }}>
      <h1>Order History</h1>
      <div style={{backgroundColor:'#C9E4EC'}}>
        
        {orders.map((order) => (
          <div key={order.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '30px', width: '400px'}}>
            <h2>{order.product}</h2>
            <img src={order.image} alt={order.product} style={{ width: '200px', height: '200px', marginBottom: '10px' }} />
            <div>
              <span style={{ fontWeight: 'bold' }}>Order Time:</span> {order.time}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Price:</span> ${order.price.toFixed(2)}
            </div>
            <div>
          <span style={{ fontWeight: 'bold' }}>Rating:</span>
          <Rating
            count={5}
            value={order.rating}
           
            onChange={(newRating) => this.handleRatingChange(newRating, order)}
          />
        </div>
            
          </div>
          
          
        ))}
        </div>
      </div>
    );
  }
}

export default OrderHistoryPage;
