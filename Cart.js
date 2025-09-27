import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import api from '../api';

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart, total } = useCart();
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (!customer.name || !customer.phone) return alert('Please enter name and phone');
    const order = {
      items: cart.map(i => ({ menuItem: i._id, name: i.name, qty: i.qty, price: i.price })),
      total,
      customer
    };
    try {
      setLoading(true);
      const res = await api.post('/orders', order);
      alert('Order placed! ID: ' + res.data._id);
      clearCart();
      setCustomer({ name: '', phone: '', address: '' });
    } catch (err) {
      console.error(err);
      alert('Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart">
      <h3>Cart</h3>
      {cart.length === 0 && <p>Cart is empty</p>}
      {cart.map(i => (
        <div key={i._id} className="cart-item">
          <div>
            <strong>{i.name}</strong>
            <div>₹{i.price}</div>
          </div>
          <div>
            <input type="number" value={i.qty} min="1" onChange={e => updateQty(i._id, Number(e.target.value))} style={{ width: 60 }} />
            <button onClick={() => removeFromCart(i._id)}>Remove</button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 12 }}>
        <strong>Total: ₹{total}</strong>
      </div>

      <h4>Customer details</h4>
      <input placeholder="Name" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} />
      <input placeholder="Phone" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
      <input placeholder="Address" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} />
      <div>
        <button onClick={placeOrder} disabled={!cart.length || loading}>{loading ? 'Placing...' : 'Place Order'}</button>
      </div>
    </div>
  );
}
