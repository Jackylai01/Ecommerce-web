import { IItem, IProduct, ItemKey } from '@models/requests/products';
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
        product: IProduct;
        count?: number;
      }>,
    ) => {
      const { key, product, count = 1 } = action.payload;
      const item: IItem = { ...product, count };

      const existingIndex = state[key].findIndex(
        (item) => item.id === product.id,
      );
      if (existingIndex !== -1) {
        // 直接操作 count 属性
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
      state[key] = state[key].filter((item) => item.id !== productId);
    },
    increaseCount: (
      state,
      action: PayloadAction<{ key: ItemKey; productId: string }>,
    ) => {
      const { key, productId } = action.payload;
      const index = state[key].findIndex((item) => item.id === productId);
      if (index !== -1) {
        state[key][index].count += 1;
      }
    },
    decreaseCount: (
      state,
      action: PayloadAction<{ key: ItemKey; productId: string }>,
    ) => {
      const { key, productId } = action.payload;
      const index = state[key].findIndex((item) => item.id === productId);
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

// 使用 createSelector 创建 isAdded selector
export const isAdded = createSelector(
  [
    selectCart,
    (state: AppState, key: ItemKey, productId: string) => ({ key, productId }),
  ],
  (cart, { key, productId }) => {
    return cart[key].some((item) => item.id === productId);
  },
);

export default cartSlice.reducer;
