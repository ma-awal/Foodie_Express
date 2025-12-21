import React, { useContext, useState } from 'react';
import { FoodContext } from '../context/FoodContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, cartTotal, placeOrder } = useContext(FoodContext);
  const navigate = useNavigate();

  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    trxId: '',
  });
  const [loading, setLoading] = useState(false);

  // যদি কেউ ডাইরেক্ট লিংকে আসে
  if (cart.length === 0)
    return (
      <div className="text-center mt-5">
        <h2>Cart is Empty!</h2>
      </div>
    );

  const handleOrder = async (e) => {
    e.preventDefault();

    if (method === 'bkash' && !formData.trxId) {
      toast.warning('Enter Bkash Transaction ID');
      return;
    }

    setLoading(true);
    const success = await placeOrder({
      customer: formData,
      paymentMethod: method === 'cod' ? 'Cash on Delivery' : 'Bkash/Nagad',
      paymentStatus: method === 'cod' ? 'Pending' : 'Verify Needed',
    });
    setLoading(false);

    if (success) {
      // অর্ডার সফল, এখন সাকসেস পেজে পাঠাবো
      navigate('/order-success');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card-custom p-4">
            <h3 className="mb-4">Checkout Details</h3>
            <form onSubmit={handleOrder}>
              <input
                required
                placeholder="Full Name"
                className="form-control mb-3"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                required
                type="number"
                placeholder="Mobile Number"
                className="form-control mb-3"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <textarea
                required
                placeholder="Address"
                className="form-control mb-3"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />

              <h5 className="mb-3">Payment Method</h5>
              <div className="d-flex gap-3 mb-3">
                <button
                  type="button"
                  className={`btn w-50 ${
                    method === 'cod' ? 'btn-primary-custom' : 'btn-secondary'
                  }`}
                  onClick={() => setMethod('cod')}
                >
                  Cash On Delivery
                </button>
                <button
                  type="button"
                  className={`btn w-50 ${
                    method === 'bkash' ? 'btn-primary-custom' : 'btn-secondary'
                  }`}
                  onClick={() => setMethod('bkash')}
                >
                  Bkash / Nagad
                </button>
              </div>

              {method === 'bkash' && (
                <div className="mb-3 p-3 bg-dark rounded border border-secondary">
                  <p className="small mb-1">
                    Send Money to: <strong>017XXXXXXXX</strong>
                  </p>
                  <input
                    required
                    placeholder="Enter Transaction ID"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, trxId: e.target.value })
                    }
                  />
                </div>
              )}

              <button
                disabled={loading}
                className="btn btn-primary-custom w-100 py-3 fw-bold"
              >
                {loading
                  ? 'Processing...'
                  : `Confirm Order (৳${cartTotal + 60})`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
