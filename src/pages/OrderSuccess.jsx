import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FoodContext } from '../context/FoodContext';

const OrderSuccess = () => {
  const { clearCart } = useContext(FoodContext);

  // 👇 ম্যাজিক এখানে: পেজ লোড হলে কার্ট খালি হবে
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="container text-center mt-5" style={{ minHeight: '60vh' }}>
      <h1 className="text-success display-1">✔</h1>
      <h2 className="fw-bold  text-primary-custom">
        Order Placed Successfully!
      </h2>
      <p className="text-muted">Your food is being prepared.</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link
          to="/my-orders"
          className="btn btn-outline-light px-4 shadow text-dark"
        >
          Track Order
        </Link>
        <Link to="/" className="btn btn-primary-custom px-4">
          Home
        </Link>
      </div>
    </div>
  );
};
export default OrderSuccess;
