import React, { useContext } from 'react';
import { FoodContext } from '../context/FoodContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cart, removeFromCart, updateQty, cartTotal } =
    useContext(FoodContext);
  const navigate = useNavigate();

  if (cart.length === 0)
    return (
      <div className="text-center mt-5">
        <h2 className="text-dark">Cart is Empty 🛒</h2>
        <Link to="/" className="btn btn-primary-custom mt-3">
          Go to Menu
        </Link>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="card-custom p-3 mb-3 d-flex align-items-center gap-3"
            >
              <img
                src={item.image}
                style={{ width: '60px', height: '60px', borderRadius: '10px' }}
                alt=""
              />
              <div className="flex-grow-1">
                <h5 className="m-0">{item.name}</h5>
                <small className="text-primary-custom">৳{item.price}</small>
              </div>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => updateQty(item.id, -1)}
              >
                -
              </button>
              <span className="fw-bold px-2">{item.qty}</span>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => updateQty(item.id, 1)}
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="btn btn-sm btn-danger ms-2"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card-custom p-4">
            <h4>Total: ৳{cartTotal}</h4>
            <small className="text-off">+ ৳60 Delivery Charge</small>
            <hr className="border-secondary" />
            <h3>Payable: ৳{cartTotal + 60}</h3>
            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary-custom w-100 mt-3"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
