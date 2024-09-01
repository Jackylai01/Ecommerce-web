import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Faq } from '@models/responses/faq.res';
import { createSlice } from '@reduxjs/toolkit';
import { FaqAsyncAction, getFaqsListAsync } from './actions';

type FaqState = ApiState<FaqAsyncAction> & {
  list: Faq[] | null;
};

const initialState: FaqState = {
  list: null,
  ...newApiState<FaqState>(FaqAsyncAction),
};

const publicFaqSlice = createSlice({
  name: ReducerName.PUBLIC_FAQS,
  initialState,
  reducers: {
    resetFaqState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getFaqsListAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    asyncMatcher(builder, ReducerName.PUBLIC_FAQS);
  },
});

export const { resetFaqState } = publicFaqSlice.actions;
export default publicFaqSlice.reducer;
