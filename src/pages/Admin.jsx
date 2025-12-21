// ... imports same as before ... (FoodContext, db, etc.)
// শুধু ফর্মের ক্যাটাগরি অংশটুকু আপডেট করুন বা পুরো ফাইল রিপ্লেস করুন

import React, { useState, useContext, useEffect, useMemo } from 'react';
import { FoodContext } from '../context/FoodContext';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import {
  FaTrash,
  FaCheckCircle,
  FaMotorcycle,
  FaFire,
  FaClipboardList,
  FaMoneyBillWave,
  FaHamburger,
} from 'react-icons/fa';

const Admin = () => {
  const { isAdmin, foodItems } = useContext(FoodContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(false);

  // New Food State
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'Burger',
    image: '',
    desc: '',
  });

  // Fetch Orders
  useEffect(() => {
    if (isAdmin) {
      const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
      const unsub = onSnapshot(q, (snap) =>
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      );
      return () => unsub();
    }
  }, [isAdmin]);

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.total || 0),
      0
    );
    return {
      totalRevenue,
      totalOrders: orders.length,
      pendingOrders: orders.filter((o) => o.status === 'Pending').length,
    };
  }, [orders]);

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    setLoading(true);
    await addDoc(collection(db, 'foods'), {
      ...newItem,
      price: Number(newItem.price),
    });
    setNewItem({
      name: '',
      price: '',
      category: 'Burger',
      image: '',
      desc: '',
    });
    toast.success('Item Added! 🍔');
    setLoading(false);
  };

  const handleDeleteFood = async (id) => {
    if (window.confirm('Remove?')) await deleteDoc(doc(db, 'foods', id));
  };
  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, 'orders', id), { status });
    toast.success(status);
  };

  if (!isAdmin)
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center text-danger">
        <h1>🚫 Staff Only</h1>
      </div>
    );

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary-custom fw-bold">Admin Panel</h2>
        <span className="badge bg-dark border border-secondary p-2">
          {new Date().toDateString()}
        </span>
      </div>

      <div className="btn-group w-100 mb-4 shadow-sm">
        <button
          className={`btn ${
            activeTab === 'orders'
              ? 'btn-primary-custom'
              : 'btn-dark border-secondary'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Live Orders ({orders.length})
        </button>
        <button
          className={`btn ${
            activeTab === 'dashboard'
              ? 'btn-primary-custom'
              : 'btn-dark border-secondary'
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          Stats
        </button>
        <button
          className={`btn ${
            activeTab === 'menu'
              ? 'btn-primary-custom'
              : 'btn-dark border-secondary'
          }`}
          onClick={() => setActiveTab('menu')}
        >
          Menu Manage
        </button>
      </div>

      {/* --- ORDERS TAB --- */}
      {activeTab === 'orders' && (
        <div className="animate__animated animate__fadeIn">
          {orders.map((order) => (
            <div
              key={order.id}
              className="card-custom p-3 mb-3 border-start border-4 border-warning"
            >
              <div className="d-flex justify-content-between align-items-center bg-dark p-2 rounded mb-2">
                <div>
                  <span className="badge bg-warning text-dark me-2">
                    {order.status}
                  </span>{' '}
                  <span className="text-off small">
                    #{order.id.slice(0, 5)}
                  </span>
                </div>
                <h5 className="text-primary-custom m-0 fw-bold">
                  ৳{order.total}
                </h5>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-0 fw-bold">
                    {order.customer?.name}{' '}
                    <span className="text-off small">
                      ({order.customer?.phone})
                    </span>
                  </p>
                  <p className="small  text-off">{order.customer?.address}</p>
                  <span
                    className={`badge ${
                      order.paymentMethod?.includes('Bkash')
                        ? 'bg-danger'
                        : 'bg-success'
                    }`}
                  >
                    {order.paymentMethod}
                  </span>
                  {order.customer?.trxId && (
                    <span className="ms-2 badge bg-dark border border-warning text-warning">
                      {order.customer.trxId}
                    </span>
                  )}
                </div>
                <div className="col-md-6 text-end">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => updateStatus(order.id, 'Cooking')}
                        className="btn btn-sm btn-outline-info"
                      >
                        Start Cooking
                      </button>
                    )}
                    {order.status === 'Cooking' && (
                      <button
                        onClick={() => updateStatus(order.id, 'On Way')}
                        className="btn btn-sm btn-outline-warning"
                      >
                        Send Rider
                      </button>
                    )}
                    {order.status === 'On Way' && (
                      <button
                        onClick={() => updateStatus(order.id, 'Delivered')}
                        className="btn btn-sm btn-success"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="text-center py-5 text-muted">No Orders</div>
          )}
        </div>
      )}

      {/* --- DASHBOARD TAB --- */}
      {activeTab === 'dashboard' && (
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="card-custom p-4 border-success">
              <h3 className="text-success">৳{stats.totalRevenue}</h3>
              <small>Revenue</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-custom p-4 border-primary">
              <h3 className="text-primary">{stats.totalOrders}</h3>
              <small>Orders</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-custom p-4 border-info">
              <h3 className="text-info">{foodItems.length}</h3>
              <small>Items</small>
            </div>
          </div>
        </div>
      )}

      {/* --- MENU TAB (Add Combo Here) --- */}
      {activeTab === 'menu' && (
        <div className="animate__animated animate__fadeIn">
          <div className="card-custom p-4 mb-4">
            <h4 className="mb-3">Add Item / Combo</h4>
            <form onSubmit={handleAddFood}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    required
                    className="form-control"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    placeholder="Name (e.g. Family Combo)"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    required
                    type="number"
                    className="form-control"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: e.target.value })
                    }
                    placeholder="Price"
                  />
                </div>

                {/* 👇 এখানে Combo অপশন যোগ করা হয়েছে */}
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                  >
                    <option>Burger</option>
                    <option>Chicken Fry</option>
                    <option>Sandwich</option>
                    <option>French Fry</option>
                    <option>Cold Drinks</option>
                    <option value="Combo">🔥 Combo / Package</option>
                  </select>
                </div>

                <div className="col-12">
                  <input
                    required
                    className="form-control"
                    value={newItem.image}
                    onChange={(e) =>
                      setNewItem({ ...newItem, image: e.target.value })
                    }
                    placeholder="Image URL"
                  />
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control"
                    value={newItem.desc}
                    onChange={(e) =>
                      setNewItem({ ...newItem, desc: e.target.value })
                    }
                    placeholder="Description (e.g. 2 Burgers + 2 Cokes)"
                  />
                </div>
                <div className="col-12">
                  <button
                    disabled={loading}
                    className="btn btn-primary-custom w-100"
                  >
                    Add to Menu
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* List */}
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr>
                  <th>Img</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {foodItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        width="40"
                        height="40"
                        style={{ borderRadius: '5px' }}
                        alt=""
                      />
                    </td>
                    <td>
                      {item.name} <br />{' '}
                      <small className="text-off">{item.category}</small>
                    </td>
                    <td className="text-primary-custom fw-bold">
                      ৳{item.price}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteFood(item.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default Admin;
