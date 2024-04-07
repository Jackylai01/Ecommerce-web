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
    updateBlock: (
      state,
      action: PayloadAction<{ index: number; block: CustomPageBlock }>,
    ) => {
      const { index, block } = action.payload;
      state.pageBlocks[index] = block;
    },
    addBlock: (state, action: PayloadAction<CustomPageBlock>) => {
      state.pageBlocks = [...state.pageBlocks, action.payload];
    },

    updateElementContent: (
      state,
      action: PayloadAction<{ id: string; newContent: string }>,
    ) => {
      const { id, newContent } = action.payload;
      state.pageBlocks = state.pageBlocks.map((block) => {
        return {
          ...block,
          elements: block.elements.map((element) => {
            if (element.id === id) {
              return { ...element, context: newContent };
            }
            return element;
          }),
        };
      });
    },
    formLayoutDataReset: () => initialState,
  },
});

export const {
  setCustomPageActive,
  setDragItem,
  addBlock,
  setPageBlocks,
  removeBLockItem,
  formLayoutDataReset,
  updateElementContent,
} = customPageSlice.actions;
export default customPageSlice.reducer;
