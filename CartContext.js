import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const initialState = JSON.parse(localStorage.getItem('cart') || '[]');

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i._id === action.item._id);
      if (exists) return state.map(i => i._id === action.item._id ? { ...i, qty: i.qty + action.qty } : i);
      return [...state, { ...action.item, qty: action.qty }];
    }
    case 'REMOVE':
      return state.filter(i => i._id !== action.id);
    case 'UPDATE_QTY':
      return state.map(i => i._id === action.id ? { ...i, qty: action.qty } : i);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, qty = 1) => dispatch({ type: 'ADD', item, qty });
  const removeFromCart = id => dispatch({ type: 'REMOVE', id });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
