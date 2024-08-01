import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DragItem = {
  index?: number;
  block: any;
};

type AdminEditPagesState = {
  active: boolean;
  dragItem: DragItem | null;
  pageBlocks: any[];
};

const initialState: AdminEditPagesState = {
  active: false,
  dragItem: null,
  pageBlocks: [],
};

const adminEditPagesSlice = createSlice({
  name: 'customPage',
  initialState,
  reducers: {
    resetCustomPage: () => initialState,
    setCustomPageActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setDragItem: (state, action: PayloadAction<DragItem | null>) => {
      state.dragItem = action.payload;
    },
    setPageBlocks: (state, action: PayloadAction<any[]>) => {
      state.pageBlocks = action.payload;
    },
    removeBlockItem: (state, action: PayloadAction<number>) => {
      state.pageBlocks = state.pageBlocks.filter(
        (_, index) => index !== action.payload,
      );
    },
    updateBlock: (
      state,
      action: PayloadAction<{ index: number; block: any }>,
    ) => {
      const { index, block } = action.payload;
      state.pageBlocks[index] = block;
    },
    addBlock: (state, action: PayloadAction<any>) => {
      state.pageBlocks.push(action.payload);
    },
  },
});

export const {
  setCustomPageActive,
  setDragItem,
  addBlock,
  setPageBlocks,
  removeBlockItem,
  resetCustomPage,
  updateBlock,
} = adminEditPagesSlice.actions;

export default adminEditPagesSlice.reducer;
