import React, { useContext, useEffect, useState } from 'react';
import { FoodContext } from '../context/FoodContext';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import {
  FaMotorcycle,
  FaCheckCircle,
  FaClock,
  FaFire,
  FaMoneyBillWave,
  FaMobileAlt,
  FaShoppingBag,
} from 'react-icons/fa';

const MyOrders = () => {
  const { user } = useContext(FoodContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // ১. শুধু লগিন করা ইউজারের অর্ডার দেখাবে এবং ২. নতুন অর্ডার সবার উপরে থাকবে
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc') // বা 'date' যদি timestamp না থাকে
      );

      const unsub = onSnapshot(q, (snap) => {
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      });
      return () => unsub();
    } else {
      setLoading(false);
    }
  }, [user]);

  // স্ট্যাটাস অনুযায়ী ব্যাজ এবং আইকন
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="badge bg-warning text-dark d-flex align-items-center gap-1">
            <FaClock /> Pending
          </span>
        );
      case 'Cooking':
        return (
          <span className="badge bg-info text-white d-flex align-items-center gap-1">
            <FaFire /> Cooking
          </span>
        );
      case 'On Way':
        return (
          <span className="badge bg-primary text-white d-flex align-items-center gap-1">
            <FaMotorcycle /> On Way
          </span>
        );
      case 'Delivered':
        return (
          <span className="badge bg-success text-white d-flex align-items-center gap-1">
            <FaCheckCircle /> Delivered
          </span>
        );
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  // স্ট্যাটাস অনুযায়ী প্রোগ্রেস বার পার্সেন্টেজ
  const getProgress = (status) => {
    if (status === 'Pending') return 10;
    if (status === 'Cooking') return 40;
    if (status === 'On Way') return 75;
    if (status === 'Delivered') return 100;
    return 0;
  };

  if (!user)
    return (
      <div className="container text-center mt-5" style={{ minHeight: '60vh' }}>
        <h3 className="text-white">Please Login first! 🔒</h3>
        <Link to="/login" className="btn btn-primary-custom mt-3">
          Go to Login
        </Link>
      </div>
    );

  if (loading)
    return (
      <div className="text-center mt-5 text-primary-custom">
        <h3>Loading Orders...</h3>
      </div>
    );

  return (
    <div className="container mt-5 mb-5" style={{ minHeight: '70vh' }}>
      <div className="d-flex align-items-center gap-3 mb-4 border-bottom border-secondary pb-3">
        <FaShoppingBag className="text-primary-custom fs-2" />
        <h2 className="  fw-bold m-0 text-custom-dark">My Order History</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <h3 className="text-muted">No orders found yet 😢</h3>
          <Link to="/" className="btn btn-outline-light mt-3 px-4 rounded-pill">
            Order Delicious Food
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 col-lg-6">
              <div className="card-custom p-4 h-100 position-relative border-start border-4 border-primary">
                {/* Header: ID & Status */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="mb-0 text-white fw-bold">
                      Order #{order.id.slice(0, 6)}
                    </h5>
                    <small className="text-muted">
                      {order.date.split(',')[0]}
                    </small>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                {/* Items List */}
                <div className="bg-dark p-3 rounded mb-3 border border-secondary">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="d-flex justify-content-between align-items-center text-white-50 border-bottom border-secondary pb-2 mb-2 last:border-0 last:pb-0"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={item.image}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '5px',
                            objectFit: 'cover',
                          }}
                          alt=""
                        />
                        <span>
                          {item.name}{' '}
                          <span className="text-white fw-bold">
                            x{item.qty}
                          </span>
                        </span>
                      </div>
                      <span className="text-white">
                        ৳{item.price * item.qty}
                      </span>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between pt-2 fw-bold text-primary-custom">
                    <span>Grand Total</span>
                    <span>৳{order.total}</span>
                  </div>
                </div>

                {/* Payment Info Box */}
                <div className="d-flex justify-content-between align-items-center bg-black bg-opacity-50 p-2 rounded mb-3 border border-secondary">
                  <div className="d-flex align-items-center gap-2">
                    {order.paymentMethod?.includes('Cash') ? (
                      <FaMoneyBillWave className="text-success" />
                    ) : (
                      <FaMobileAlt className="text-primary" />
                    )}
                    <div>
                      <small
                        className="d-block text-off"
                        style={{ fontSize: '0.7rem' }}
                      >
                        PAYMENT METHOD
                      </small>
                      <span
                        className={`fw-bold small ${
                          order.paymentMethod?.includes('Bkash')
                            ? 'text-warning'
                            : 'text-success'
                        }`}
                      >
                        {order.paymentMethod || 'COD'}
                      </span>
                    </div>
                  </div>
                  {/* TrxID if available */}
                  {order.customer?.trxId && (
                    <div className="text-end">
                      <small
                        className="d-block text-muted"
                        style={{ fontSize: '0.7rem' }}
                      >
                        TRX ID
                      </small>
                      <span className="text-white small font-monospace">
                        {order.customer.trxId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Tracking Progress Bar */}
                <div>
                  <div className="d-flex justify-content-between small text-muted mb-1">
                    <span>Order Placed</span>
                    <span>Delivered</span>
                  </div>
                  <div
                    className="progress"
                    style={{
                      height: '8px',
                      backgroundColor: '#333',
                      borderRadius: '10px',
                    }}
                  >
                    <div
                      className={`progress-bar progress-bar-striped progress-bar-animated ${
                        order.status === 'Delivered'
                          ? 'bg-success'
                          : 'bg-primary'
                      }`}
                      role="progressbar"
                      style={{ width: `${getProgress(order.status)}%` }}
                    ></div>
                  </div>
                  <small
                    className="text-primary-custom mt-2 d-block text-center fw-bold text-uppercase"
                    style={{ letterSpacing: '1px' }}
                  >
                    {order.status === 'Pending'
                      ? 'Waiting for confirmation...'
                      : order.status === 'Cooking'
                      ? 'Chef is preparing your food...'
                      : order.status === 'On Way'
                      ? 'Rider is near you...'
                      : 'Enjoy your meal! 😋'}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
