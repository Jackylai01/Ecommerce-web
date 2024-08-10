import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { IDesignPage } from '@models/requests/design.req';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createDesignPageAsync,
  deleteDesignPageAsync,
  DesignPageActions,
  getAllDesignPagesAsync,
  getDesignPageByRouteAsync,
  updateDesignPageAsync,
  uploadImageAsync,
} from './actions';

type DragItem = {
  index?: number;
  block: any;
};

type DesignPageState = ApiState<DesignPageActions> & {
  pages: IDesignPage[] | null;
  currentPage: IDesignPage | null;
  uploadedImageUrls: string[] | null;
  active: boolean;
  dragItem: DragItem | null;
  pageBlocks: any[];
};

const initialState: DesignPageState = {
  pages: null,
  currentPage: null,
  uploadedImageUrls: null,
  active: false,
  dragItem: null,
  pageBlocks: [],
  ...newApiState<DesignPageState>(DesignPageActions),
};

const designPageSlice = createSlice({
  name: ReducerName.ADMIN_CREATE_DESIGN_PAGE,
  initialState,
  reducers: {
    resetDesignPageState: () => initialState,
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
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
  extraReducers: (builder) => {
    builder.addCase(createDesignPageAsync.fulfilled, (state, action) => {
      if (state.pages) state.pages.push(action.payload);
    });
    builder.addCase(getAllDesignPagesAsync.fulfilled, (state, action) => {
      state.pages = action.payload;
    });
    builder.addCase(getDesignPageByRouteAsync.fulfilled, (state, action) => {
      state.currentPage = action.payload;
    });
    builder.addCase(updateDesignPageAsync.fulfilled, (state, action) => {
      if (state.pages) {
        state.pages = state.pages.map((page) =>
          page.route === action.payload.route ? action.payload : page,
        );
      }
    });
    builder.addCase(deleteDesignPageAsync.fulfilled, (state, action) => {
      if (state.pages) {
        state.pages = state.pages.filter(
          (page) => page.route !== action.payload,
        );
      }
    });
    builder.addCase(uploadImageAsync.fulfilled, (state, action) => {
      state.uploadedImageUrls = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_CREATE_DESIGN_PAGE);
  },
});

export const {
  resetDesignPageState,
  setPages,
  setCurrentPage,
  setCustomPageActive,
  setDragItem,
  addBlock,
  setPageBlocks,
  removeBlockItem,
  updateBlock,
} = designPageSlice.actions;
export default designPageSlice.reducer;
