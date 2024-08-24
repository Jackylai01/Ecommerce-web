import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { IDesignPage } from '@models/requests/design.req';
import { createSlice } from '@reduxjs/toolkit';
import {
  DesignPageAsyncAction,
  getAllDesignPagesAsync,
  getDesignPageByRouteAsync,
} from './actions';

type DragItem = {
  index?: number;
  block: any;
};

type PublicDesignPageState = ApiState<DesignPageAsyncAction> & {
  pages: IDesignPage[] | null;
  detailPage: IDesignPage | null;
};

const initialState: PublicDesignPageState = {
  pages: null,
  detailPage: null,
  ...newApiState<PublicDesignPageState>(DesignPageAsyncAction),
};

const publicDesignPageSlice = createSlice({
  name: ReducerName.PUBLIC_DESIGN_PAGES,
  initialState,
  reducers: {
    resetPublicDesignPageState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDesignPagesAsync.fulfilled, (state, action) => {
      state.pages = action.payload;
    });
    builder.addCase(getDesignPageByRouteAsync.fulfilled, (state, action) => {
      state.detailPage = action.payload;
    });
    asyncMatcher(builder, ReducerName.PUBLIC_DESIGN_PAGES);
  },
});

export const { resetPublicDesignPageState } = publicDesignPageSlice.actions;
export default publicDesignPageSlice.reducer;
