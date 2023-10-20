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
        },
        {
          id: 2,
          time: '2023-10-17 2:30 PM',
          product: 'mOBILE',
          image: 'images/iphone.jpg',
          price: 29.99,
        },
        // Add more order entries as needed
      ],
    };
  }

  render() {
    const { orders } = this.state;

    return (
      <div>
        <h1>Order History</h1>
        <table>
          <thead>
            <tr>
              <th>Order Time</th>
              <th>Product</th>
              <th>Image</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.time}</td>
                <td>{order.product}</td>
                <td>
                  <img src={order.image} alt={order.product} style={{ width: '100px', height: '100px' }} />
                </td>
                <td>${order.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderHistoryPage;
