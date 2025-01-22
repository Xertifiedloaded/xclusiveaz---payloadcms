'use client'
import toast  from 'react-hot-toast';
import { createContext, useContext, useReducer, useEffect, useState } from 'react'

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_CART':
      return action.payload;
      case 'ADD_TO_CART':
        const existingProduct = state.find(item => item.id === action.payload.id);
        if (existingProduct) {
          return state;
        }
        return [{ ...action.payload, quantity: 1 }, ...state];

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);

    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [selectedLocation, setSelectedLocation] = useState({ name: '', price: 0 });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch({ type: 'INITIALIZE_CART', payload: savedCart });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      toast.error(`${product.name} is already in the cart!`);
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`${product.name} has been added to the cart!`);
  };

  const removeFromCart = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      toast.success(`${product.name} removed from the cart!`);
    }
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart has been cleared!');
  };

  const updateLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        updateLocation,
        selectedLocation,
        cartTotal: cart.reduce((total, item) => total + item.price * item.quantity, 0) + selectedLocation.price,
        cartCount: cart.reduce((count, item) => count + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
