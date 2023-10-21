import React, { Component } from 'react';

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

  renderStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i}>&#9733;</span>); // Full star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Empty star
      }
    }
    return stars;
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
              <span style={{ fontWeight: 'bold' }}>Rating:</span> {this.renderStars(order.rating)}
            </div>
            
          </div>
          
          
        ))}
        </div>
      </div>
    );
  }
}

export default OrderHistoryPage;
