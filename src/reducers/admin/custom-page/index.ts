import { ReducerName } from '@enums/reducer-name';
import { ModifyPage } from '@models/entities/cms/page';
import { CustomPageBlock } from '@models/entities/custom-page-template';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DragItem = {
  index?: number;
  block: CustomPageBlock;
};

type CustomPageState = {
  active: boolean;
  dragItem: DragItem | null;
  pageInfo: ModifyPage | null;
  pageBlocks: CustomPageBlock[];
};

const initialState: CustomPageState = {
  active: false,
  dragItem: null,
  pageBlocks: [],
  pageInfo: null,
};

const customPageSlice = createSlice({
  name: ReducerName.ADMIN_CUSTOM_PAGE,
  initialState,
  reducers: {
    setCustomPageActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setDragItem: (state, action: PayloadAction<DragItem | null>) => {
      state.dragItem = action.payload;
    },
    setPageBlocks: (state, action: PayloadAction<CustomPageBlock[]>) => {
      state.pageBlocks = action.payload;
    },
    removeBLockItem: (state, action: PayloadAction<number>) => {
      state.pageBlocks = state.pageBlocks.filter(
        (block: any, index: number) => index !== action.payload,
      );
    },
    updateElementSizeAndPosition: (state, action) => {
      const { elementId, newSize, newAlignment } = action.payload;
      state.pageBlocks.forEach((block) => {
        block.elements.forEach((element) => {
          if (element.id === elementId && element.tagName === 'img') {
            element.size = newSize;
            element.alignment = newAlignment;
          }
        });
      });
    },
    formLayoutDataReset: () => initialState,
  },
});

export const {
  setCustomPageActive,
  setDragItem,
  setPageBlocks,
  removeBLockItem,
  formLayoutDataReset,
  updateElementSizeAndPosition,
} = customPageSlice.actions;
export default customPageSlice.reducer;
