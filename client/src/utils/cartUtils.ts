import type { CartState } from '../types';

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: CartState) => {
  // Calculate item price
  const itemsPrice = state.cartItems.reduce(
    (acc: number, cartItem) => acc + cartItem.price * cartItem.qty,
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

  return state;
};
