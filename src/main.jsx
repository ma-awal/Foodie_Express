import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// জাভাস্ক্রিপ্ট এর জন্য (মোবাইল মেনুর জন্য লাগে)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
