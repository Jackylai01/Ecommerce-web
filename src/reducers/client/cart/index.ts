import { IItem, ItemKey } from '@models/requests/products';
import { ProductsResponse } from '@models/responses/products.res';
import { AppState } from '@models/store';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

interface CartState {
  cart: IItem[];
  wishlist: IItem[];
  checkout: IItem[];
}

const initialState: CartState = {
  cart: [],
  wishlist: [],
  checkout: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        key: ItemKey;
        product: ProductsResponse;
        count?: number;
      }>,
    ) => {
      const { key, product, count = 1 } = action.payload;
      const item: IItem = { ...product, count };

      const existingIndex = state[key].findIndex(
        (item) => item._id === product._id,
      );
      if (existingIndex !== -1) {
        state[key][existingIndex].count += count;
      } else {
        state[key].push(item);
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ key: ItemKey; productId: string }>,
    ) => {
      const { key, productId } = action.payload;
      state[key] = state[key].filter((item) => item._id !== productId);
    },
    increaseCount: (
      state,
      action: PayloadAction<{ key: ItemKey; productId: string }>,
    ) => {
      const { key, productId } = action.payload;
      const index = state[key].findIndex((item) => item._id === productId);
      if (index !== -1) {
        state[key][index].count += 1;
      }
    },
    decreaseCount: (
      state,
      action: PayloadAction<{ key: ItemKey; productId: string }>,
    ) => {
      const { key, productId } = action.payload;
      const index = state[key].findIndex((item) => item._id === productId);
      if (index !== -1 && state[key][index].count > 1) {
        state[key][index].count -= 1;
      }
    },
    resetItems: (state, action: PayloadAction<ItemKey>) => {
      state[action.payload] = [];
    },
  },
});

export const { addItem, removeItem, increaseCount, decreaseCount, resetItems } =
  cartSlice.actions;

export const selectCart = (state: AppState) => state.clientCart;

export const isAdded = createSelector(
  [
    selectCart,
    (state: AppState, key: ItemKey, productId: string) => ({ key, productId }),
  ],
  (cart, { key, productId }) => {
    return cart[key].some((item) => item._id === productId);
  },
);

export default cartSlice.reducer;
