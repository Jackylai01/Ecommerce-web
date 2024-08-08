import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { IDesignPage } from '@models/requests/design.req';
import { createSlice } from '@reduxjs/toolkit';
import {
  createDesignPageAsync,
  deleteDesignPageAsync,
  getAllDesignPagesAsync,
  getDesignPageByRouteAsync,
  updateDesignPageAsync,
  uploadImageAsync,
} from './actions';

export enum DesignPageActions {
  CREATE_DESIGN_PAGE = 'createDesignPage',
  GET_ALL_DESIGN_PAGES = 'getAllDesignPages',
  GET_DESIGN_PAGE_BY_ROUTE = 'getDesignPageByRoute',
  UPDATE_DESIGN_PAGE = 'updateDesignPage',
  DELETE_DESIGN_PAGE = 'deleteDesignPage',
}

type DesignPageState = ApiState<DesignPageActions> & {
  pages: IDesignPage[] | null;
  currentPage: IDesignPage | null;
  uploadedImageUrls: string[] | null;
};

const initialState: DesignPageState = {
  pages: null,
  currentPage: null,
  uploadedImageUrls: null,
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

export const { resetDesignPageState, setPages, setCurrentPage } =
  designPageSlice.actions;
export default designPageSlice.reducer;
