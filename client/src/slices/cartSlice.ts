import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../types';

const localCart = localStorage.getItem('cart');
const initialState: CartState = localCart
  ? JSON.parse(localCart)
  : { cartItems: [] };

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      console.log(state);

      const existItem = state.cartItems.find(
        (product) => product._id === item._id,
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((product) =>
          product._id === existItem._id ? item : product,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate item price
      const itemsPrice = state.cartItems.reduce(
        (acc, cartItem) => acc + cartItem.price * cartItem.qty,
        0,
      );
      state.itemsPrice = addDecimals(itemsPrice);

      // Calculate shipping price
      const freeShippingIfOrderAbove = 100;
      const defaultShippingPrice = 10;
      state.shippingPrice = addDecimals(
        itemsPrice > freeShippingIfOrderAbove ? 0 : defaultShippingPrice,
      );

      // Calculate tax price
      const taxPercentage = 0.15;
      state.taxPrice = addDecimals(taxPercentage * itemsPrice);

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
