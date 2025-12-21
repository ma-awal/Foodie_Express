import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FoodContext } from '../context/FoodContext';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { auth } from '../firebase';

const Navbar = () => {
  const { cart, user } = useContext(FoodContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          <span className="text-primary-custom">FOODIE</span>EXPRESS
        </Link>

        <div className="d-flex align-items-center gap-3">
          {user?.email === 'admin@food.com' && (
            <Link
              className="text-warning fw-bold text-decoration-none"
              to="/admin"
            >
              Admin
            </Link>
          )}

          <Link to="/cart" className="position-relative text-white">
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-custom">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={() => auth.signOut()}
              className="btn btn-sm btn-outline-danger rounded-circle p-2"
            >
              <FaSignOutAlt />
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm btn-primary-custom rounded-pill px-3"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
