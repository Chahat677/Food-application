import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: 0, category: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await api.get('/menu');
    setItems(res.data);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/menu/${editingId}`, form);
      setEditingId(null);
    } else {
      await api.post('/menu', form);
    }
    setForm({ name: '', description: '', price: 0, category: '' });
    fetchItems();
  };

  const edit = (item) => {
    setEditingId(item._id);
    setForm({ name: item.name, description: item.description, price: item.price, category: item.category });
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    await api.delete(`/menu/${id}`);
    fetchItems();
  };

  return (
    <div className="admin">
      <h3>Admin Panel</h3>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} required />
        <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '', price: 0, category: '' }); }}>Cancel</button>}
      </form>

      <div className="items-list">
        {items.map(it => (
          <div key={it._id} className="admin-item">
            <div>
              <strong>{it.name}</strong>
              <div>₹{it.price}</div>
            </div>
            <div>
              <button onClick={() => edit(it)}>Edit</button>
              <button onClick={() => remove(it._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
