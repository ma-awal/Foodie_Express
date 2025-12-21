import React, { useContext, useState } from 'react';
import { FoodContext } from '../context/FoodContext';
import {
  FaFire,
  FaPlus,
  FaSearch,
  FaMotorcycle,
  FaUtensils,
  FaHeadset,
  FaMobileAlt,
  FaMapMarkerAlt,
  FaSmile,
  FaStar,
  FaQuoteLeft,
  FaApple,
  FaGooglePlay,
  FaArrowRight,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
  const { foodItems, addToCart } = useContext(FoodContext);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  // 1. CATEGORY DATA
  const categoryData = [
    {
      name: 'All',
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Burger',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop',
    },
    {
      name: 'Chicken Fry',
      img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Sandwich',
      img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2073&auto=format&fit=crop',
    },
    {
      name: 'French Fry',
      img: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Cold Drinks',
      img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1935&auto=format&fit=crop',
    },
  ];

  // 2. EXCLUSIVE DEALS DATA (New Section)
  const deals = [
    {
      id: 101,
      title: 'Weekend Binger',
      desc: '2 Burgers + 2 Cokes + Fries',
      price: 450,
      oldPrice: 600,
      img: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop',
    },
    {
      id: 102,
      title: 'Family Feast',
      desc: '8pcs Chicken + 4 Buns + Coleslaw',
      price: 999,
      oldPrice: 1250,
      img: 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 103,
      title: 'Couple Set',
      desc: '2 Sandwich + 2 Coffee',
      price: 350,
      oldPrice: 480,
      img: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=2064&auto=format&fit=crop',
    },
  ];

  // 3. TESTIMONIALS DATA (New Section)
  const reviews = [
    {
      name: 'Rahim Ahmed',
      comment: 'Best burger in Dhaka! Delivery was super fast.',
      rating: 5,
    },
    {
      name: 'Sadia Islam',
      comment: 'Loved the crispy chicken. Hot and fresh.',
      rating: 5,
    },
    {
      name: 'Tanvir Hasan',
      comment: 'Great packaging and polite rider. Recommended!',
      rating: 4,
    },
  ];

  const filteredItems = foodItems.filter((item) => {
    const matchCat = category === 'All' || item.category === category;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* 1. HERO SECTION */}
      <div
        className="position-relative d-flex align-items-center justify-content-center text-center px-3"
        style={{
          background:
            'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop")',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div style={{ zIndex: 2 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge bg-primary text-white mb-3 px-3 py-2 fs-6 rounded-pill">
              🚀 Free Delivery on First Order
            </span>
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="display-3 fw-bold text-white mb-2"
          >
            UNLIMITED <span className="text-primary-custom">TASTE</span>
          </motion.h1>
          <p className="lead text-light mb-4">
            Craving something delicious? We deliver happiness.
          </p>
          <a
            href="#menu"
            className="btn btn-primary-custom btn-lg shadow-lg rounded-pill px-5 fw-bold"
          >
            View Menu 👇
          </a>
        </div>
      </div>
      {/* 6. FEATURES */}
      <div className="container py-5  ">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="p-3 border border-secondary rounded bg-dark">
              <FaUtensils className="fs-2 text-primary-custom mb-2" />
              <h5 className="text-white">Fresh Food</h5>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border border-secondary rounded bg-dark">
              <FaMotorcycle className="fs-2 text-primary-custom mb-2" />
              <h5 className="text-white">Fast Delivery</h5>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border border-secondary rounded bg-dark">
              <FaHeadset className="fs-2 text-primary-custom mb-2" />
              <h5 className="text-white">24/7 Support</h5>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 🔥 EXCLUSIVE DEALS SECTION (NEW) */}
      <div className="container my-5 pt-4 ">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">
            <span className="text-primary-custom">Super</span> Deals
          </h2>
          <a href="#menu" className="text-muted text-decoration-none">
            View All <FaArrowRight />
          </a>
        </div>
        <div className="row g-4">
          {deals.map((deal) => (
            <div key={deal.id} className="col-md-4">
              <div className="card-custom border-0 h-100 position-relative group overflow-hidden">
                <img
                  src={deal.img}
                  className="w-100"
                  style={{ height: '200px', objectFit: 'cover' }}
                  alt={deal.title}
                />
                <div className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1 fw-bold rounded-end mt-3">
                  SAVE ৳{deal.oldPrice - deal.price}
                </div>
                <div className="card-body p-4">
                  <h4 className="fw-bold text-white">{deal.title}</h4>
                  <p className="text-off small">{deal.desc}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <span className="text-decoration-line-through text-off me-2">
                        ৳{deal.oldPrice}
                      </span>
                      <span className="text-primary-custom fw-bold fs-4">
                        ৳{deal.price}
                      </span>
                    </div>
                    <button
                      className="btn btn-outline-light rounded-pill btn-sm"
                      onClick={() => setCategory('All')}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. VISUAL MENU */}
      <div id="menu" className="container my-5">
        <h2 className="fw-bold mb-4 border-start border-4 border-dark ps-3 text-dark">
          <span className="text-primary-custom">Explore</span> Menu
        </h2>

        {/* Categories */}
        <div className="row g-3 mb-5">
          {categoryData.map((cat, idx) => (
            <div
              key={idx}
              className="col-4 col-md-2"
              onClick={() => setCategory(cat.name)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className={`card text-center p-2 border-0 h-100 shadow ${
                  category === cat.name
                    ? 'border border-primary bg-dark'
                    : 'bg-transparent'
                }`}
                style={{ borderRadius: '15px', transition: '0.3s' }}
              >
                <img
                  src={cat.img}
                  className="rounded-circle mx-auto mb-2 shadow-sm"
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    border:
                      category === cat.name
                        ? '2px solid #FF4500'
                        : '2px solid #333',
                  }}
                  alt={cat.name}
                />
                <small
                  className={`fw-bold d-block ${
                    category === cat.name ? 'text-primary-custom' : 'text-muted'
                  }`}
                >
                  {cat.name}
                </small>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="d-flex justify-content-between align-items-center mb-4 bg-dark p-2 rounded border border-secondary">
          <h5 className="m-0 fw-bold text-white px-2">
            Items ({filteredItems.length})
          </h5>
          <div className="input-group" style={{ maxWidth: '250px' }}>
            <span className="input-group-text bg-custom border-secondary text-muted">
              <FaSearch />
            </span>
            <input
              placeholder="Search food..."
              className="form-control bg-black border-secondary text-white"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Food Grid */}
        <div className="row g-4 pb-5">
          {filteredItems.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-3">
              <div className="card-custom h-100 p-0 border-0 shadow-sm position-relative">
                <div
                  style={{
                    height: '220px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={item.image}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                    alt={item.name}
                  />
                  <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge bg-white text-dark fw-bold px-2 py-1 shadow">
                      <FaFire className="text-warning" /> Hot
                    </span>
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="fw-bold mb-1 text-white">{item.name}</h5>
                      <span className="badge bg-dark border border-secondary text-off">
                        {item.category}
                      </span>
                    </div>
                    <h5 className="text-primary-custom fw-bold">
                      ৳{item.price}
                    </h5>
                  </div>
                  <p
                    className="small text-off mb-3"
                    style={{ minHeight: '40px' }}
                  >
                    {item.desc?.slice(0, 50)}...
                  </p>
                  <button
                    onClick={() => addToCart(item)}
                    className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2 text-white"
                  >
                    <FaPlus /> Add to Tray
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 💬 CUSTOMER REVIEWS (NEW) */}
      <div className="bg-dark py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-primary-custom text-uppercase fw-bold">
              Testimonials
            </h6>
            <h2 className="text-white fw-bold">Happy Customers</h2>
          </div>
          <div className="row g-4">
            {reviews.map((review, i) => (
              <div key={i} className="col-md-4">
                <div className="card-custom p-4 h-100 border border-secondary">
                  <FaQuoteLeft className="text-primary-custom fs-2 mb-3" />
                  <p className="text-off fst-italic">"{review.comment}"</p>
                  <div className="d-flex align-items-center mt-3">
                    <div
                      className="bg-secondary rounded-circle"
                      style={{ width: '40px', height: '40px' }}
                    ></div>
                    <div className="ms-3">
                      <h6 className="m-0 text-white fw-bold">{review.name}</h6>
                      <div className="text-warning small">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. 📱 DOWNLOAD APP SECTION (NEW) */}
      <div className="container my-5 py-5">
        <div
          className="card-custom p-5 position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF4500 0%, #FF8C00 100%)',
          }}
        >
          <div className="row align-items-center position-relative z-1">
            <div className="col-md-7 text-white">
              <h1 className="fw-bold mb-3">Download Mobile App</h1>
              <p className="lead mb-4">
                Get 20% Discount on your first app order. Available on Play
                Store & App Store.
              </p>
              <div className="d-flex gap-3">
                <button className="btn btn-dark d-flex align-items-center gap-2 px-4 py-2 rounded-pill">
                  <FaGooglePlay className="fs-4" />{' '}
                  <div>
                    <small
                      className="d-block lh-1"
                      style={{ fontSize: '10px' }}
                    >
                      GET IT ON
                    </small>
                    <span className="fw-bold">Google Play</span>
                  </div>
                </button>
                <button className="btn btn-light d-flex align-items-center gap-2 px-4 py-2 rounded-pill">
                  <FaApple className="fs-4" />{' '}
                  <div>
                    <small
                      className="d-block lh-1 text-black"
                      style={{ fontSize: '10px' }}
                    >
                      Download on the
                    </small>
                    <span className="fw-bold text-black">App Store</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="col-md-5 d-none d-md-block text-center">
              <FaMobileAlt
                style={{
                  fontSize: '250px',
                  opacity: 0.3,
                  transform: 'rotate(15deg)',
                }}
                className="text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
