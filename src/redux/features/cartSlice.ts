/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [] as any,
  selectedItems: 0,
  total: 0,
  deliveryCharge: 15,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const isProductExist = state?.products?.find(
        (product: any) => product._id === action.payload._id
      );
      if (!isProductExist) {
        console.log("from if");
        state.products.push({ ...action.payload, quantity: 1 });
      }
      selectedItems(state);
      countTotal(state);
    },
    // update quantity
    updateQuantity: (state, action) => {
      const product = state.products.find(
        (product: any) => product._id === action.payload.productId
      );

      if (action.payload.type === "increment") {
        product.quantity += 1;
      } else {
        if (product.quantity) {
          product.quantity -= 1;
        } else {
          state.products = state.products.filter(
            (product: any) => product._id !== action.payload.productId
          );
        }
      }
    },
    // remove from cart
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
    },
  },
});

// utils for cart
const selectedItems = (state: any) => {
  state.selectedItems = state?.products?.reduce(
    (total: number, product: any) => {
      return total + product.quantity;
    },
    0
  );
};
const countTotal = (state: any) => {
  //   for total price
  state.total = state?.products?.reduce((total: number, product: any) => {
    return (
      total + state.deliveryCharge + Number(product.price) * product.quantity
    );
  }, 0);
};

export const selectProductQuantityById = (
  state: any,
  productId: string
): number => {
  const product = state.cart.products.find((p: any) => p._id === productId);
  return product ? product.quantity : 0;
};

export const { addToCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
