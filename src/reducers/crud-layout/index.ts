import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiPaginationResult } from '@services/shared/api';
import {
  CrudLayoutAction,
  crudLayoutCreateAsync,
  crudLayoutDeleteAsync,
  crudLayoutDetailAsync,
  crudLayoutListAsync,
  crudLayoutUpdateAsync,
} from './actions';

export type CrudLayoutState<T = unknown> = ApiState<CrudLayoutAction> & {
  list: ApiPaginationResult<T> | null;
  detail: T | null;
  downloadList: T[] | null;
};

const initialState: CrudLayoutState = {
  list: null,
  detail: null,
  downloadList: null,
  ...newApiState<CrudLayoutState>(CrudLayoutAction),
};

const crudLayoutSlice = createSlice({
  name: ReducerName.CRUD_LAYOUT,
  initialState,
  reducers: {
    setCrudLayoutList: (
      state,
      action: PayloadAction<ApiPaginationResult<unknown>>,
    ) => {
      state.list = action.payload;
    },
    setCrudLayoutDetail: (state, action: PayloadAction<unknown>) => {
      state.detail = action.payload;
    },
    resetCrudLayout: () => initialState,
    resetCrudLayoutStatus: (state) => {
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(crudLayoutListAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(crudLayoutDetailAsync.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
    builder.addCase(crudLayoutCreateAsync.fulfilled, (state, action) => {
      state.detail = { ...(<any>state.detail), ...action.payload };
    });
    builder.addCase(crudLayoutUpdateAsync.fulfilled, (state, action) => {
      state.detail = { ...(<any>state.detail), ...action.payload };
    });
    builder.addCase(crudLayoutDeleteAsync.fulfilled, (state) => {
      state.detail = null;
    });

    asyncMatcher(builder, ReducerName.CRUD_LAYOUT);
  },
});

export const {
  setCrudLayoutList,
  setCrudLayoutDetail,
  resetCrudLayout,
  resetCrudLayoutStatus,
} = crudLayoutSlice.actions;
export default crudLayoutSlice.reducer;
