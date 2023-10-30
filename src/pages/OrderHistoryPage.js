import React, { Component } from 'react';
import axios from 'axios';

const userObj = JSON.parse(localStorage.getItem('user'));
const user_id = userObj ? userObj.id : null;

class OrderHistoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      currentRating: 0, // Initialize with a default rating value
    };
  }

  async componentDidMount() {
    await this.getAllProducts();
  }

  getAllProducts = async () => {
    try {
      console.log(process.env.REACT_APP_BACKEND_URL);
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + 'order_details/order_details/' + user_id
      );

      if (!response.data.error) {
        this.setState({ orders: response.data.data });
        console.log(response.data);
      } else {
        alert(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleRatingClick = (order, rating) => {
    // You can add an API call here to update the rating on the server
    // For simplicity, we'll just update the state in this example
    const updatedOrders = this.state.orders.map((o) => {
      if (o.id === order.id) {
        return { ...o, rating };
      }
      return o;
    });

    this.setState({ orders: updatedOrders, currentRating: rating });
  };

  formatOrderTime(orderTime) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(orderTime).toLocaleString(undefined, options);
  }

  renderStars(order) {
    const { currentRating } = this.state;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const starClassName = i <= currentRating ? 'star filled' : 'star';
      stars.push(
        <span
          key={i}
          className={starClassName}
          onClick={() => this.handleRatingClick(order, i)}
        >
          &#9733;
        </span>
      );
    }

    return <div className="rating">{stars}</div>;
  }

  render() {
    const { orders } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#D5E3F0' }}>
        <h1>Order History</h1>
        <div style={{ backgroundColor: '#C9E4EC' }}>
          {orders.map((order) => (
            <div key={order.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '30px', width: '400px' }}>
              <h2>{order.product.p_name}</h2>
              <img src={process.env.REACT_APP_BACKEND_URL + order.product.p_image} alt={order.product.p_name} style={{ width: '200px', height: '200px', marginBottom: '10px' }} />
              <div>
                <span style={{ fontWeight: 'bold' }}>Order Time:</span> {this.formatOrderTime(order.updated_at)}
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}>Price:</span> ${order.sale_price}
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}>Rating:</span> {this.renderStars(order)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default OrderHistoryPage;
