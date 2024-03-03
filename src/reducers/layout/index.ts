import { createSlice } from '@reduxjs/toolkit';

import { PageLayoutType } from '@enums/page-layout-type';

type LayoutState = {
  pageLayoutType: PageLayoutType;
};

const initialState: LayoutState = {
  pageLayoutType: PageLayoutType.CLIENT,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setPageLayoutType: (state, action) => {
      state.pageLayoutType = action.payload;
    },
  },
});

export const { setPageLayoutType } = layoutSlice.actions;
export default layoutSlice.reducer;
