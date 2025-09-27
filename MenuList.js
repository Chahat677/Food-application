import React, { useEffect, useState } from 'react';
import api from '../api';
import { useCart } from '../context/CartContext';

export default function MenuList() {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/menu').then(res => setMenu(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="menu-grid">
      {menu.map(item => (
        <div key={item._id} className="card">
          {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: 140, objectFit: 'cover' }} />}
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>₹{item.price}</strong>
            <button onClick={() => addToCart(item, 1)}>Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}
