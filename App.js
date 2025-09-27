import React from 'react';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';

export default function App() {
  return (
    <div className="app">
      <header style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <h1>MyFirstReact — Food Order App</h1>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, padding: 12 }}>
        <section>
          <h2>Menu</h2>
          <MenuList />
        </section>

        <aside>
          <Cart />
          <hr />
          <AdminPanel />
        </aside>
      </main>
    </div>
  );
}
