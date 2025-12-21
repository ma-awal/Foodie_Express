import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  // Cart Load
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('food_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cart Save
  useEffect(() => {
    localStorage.setItem('food_cart', JSON.stringify(cart));
  }, [cart]);

  // Auth & Data Load
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAdmin(u && u.email === 'admin@food.com'); // Admin Check
      setLoading(false);
    });

    const unsubData = onSnapshot(collection(db, 'foods'), (snap) => {
      setFoodItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubAuth();
      unsubData();
    };
  }, []);

  // --- ACTIONS ---
  const addToCart = (food) => {
    const exist = cart.find((x) => x.id === food.id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === food.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...food, qty: 1 }]);
    }
    toast.success('Added 🍔', { theme: 'dark', autoClose: 1000 });
  };

  const updateQty = (id, amount) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + amount) } : item
      )
    );
  };

  const removeFromCart = (id) => setCart(cart.filter((x) => x.id !== id));

  // 👇 শুধুমাত্র অর্ডার সাকসেস পেজে কল হবে
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('food_cart');
  };

  // 👇 অর্ডার সেভ করবে (কার্ট খালি করবে না)
  const placeOrder = async (orderData) => {
    try {
      const fullOrder = {
        ...orderData,
        items: cart,
        total: cart.reduce((acc, item) => acc + item.price * item.qty, 0) + 60, // Delivery Fee 60
        status: 'Pending',
        date: new Date().toLocaleString(),
        timestamp: Date.now(),
        userId: user ? user.uid : 'guest',
      };

      await addDoc(collection(db, 'orders'), fullOrder);
      return true;
    } catch (err) {
      toast.error('Order Failed!');
      return false;
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <FoodContext.Provider
      value={{
        user,
        isAdmin,
        foodItems,
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        placeOrder,
        clearCart,
        cartTotal,
      }}
    >
      {!loading && children}
    </FoodContext.Provider>
  );
};
