import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-3 border-top border-secondary mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h4 className="fw-bold mb-3">
              <span className="text-primary-custom">FOODIE</span>EXPRESS
            </h4>
            <p className="text-off small">
              Craving delicious food? We deliver hot and fresh burgers, crispy
              chicken, and beverages right to your doorstep in minutes.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold mb-3 text-white">Contact Us</h5>
            <ul className="list-unstyled text-muted small">
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaMapMarkerAlt className="text-primary-custom" /> Dhaka,
                Bangladesh
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaPhoneAlt className="text-primary-custom" /> +880 1700-000000
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaEnvelope className="text-primary-custom" />{' '}
                support@foodie.com
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold mb-3 text-white">Follow Us</h5>
            <div className="d-flex gap-3 align-items-center">
              <a
                href="#"
                className="btn btn-outline-secondary rounded-circle p-2 border-0 text-white hover-primary"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="btn btn-outline-secondary rounded-circle p-2 border-0 text-white hover-primary"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="btn btn-outline-secondary rounded-circle p-2 border-0 text-white hover-primary"
              >
                <FaTwitter size={20} />
              </a>
            </div>
            <p className="small text-off mt-3">
              Opening Hours: 10:00 AM - 11:00 PM
            </p>
          </div>
        </div>

        <div className="text-center pt-4 mt-4 border-top border-secondary">
          <small className="text-off">
            &copy; 2025 FoodieExpress. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
