import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FoodProvider, FoodContext } from './context/FoodContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

// Pages
import Home from './pages/Home';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import Footer from './components/Footer';

const Navbar = () => {
  const { cart } = React.useContext(FoodContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          FOODIE<span className="text-primary-custom">EXPRESS</span>
        </Link>
        <div className="d-flex gap-3">
          <Link
            to="/my-orders"
            className="text-white text-decoration-none pt-2"
          >
            My Orders
          </Link>
          <Link to="/cart" className="position-relative text-white pt-2">
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-custom">
                {cart.length}
              </span>
            )}
          </Link>
          <Link to="/admin" className="text-warning text-decoration-none pt-2">
            Admin
          </Link>
          <Link
            to="/login"
            className="btn btn-sm btn-outline-light rounded-circle p-2"
          >
            <FaUser />
          </Link>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <FoodProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" theme="dark" />
      </BrowserRouter>
    </FoodProvider>
  );
}
export default App;
