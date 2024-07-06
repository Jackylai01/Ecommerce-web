import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import { clientQequestReturnAction, requestReturnAsync } from './actions';

type QuestReturnState = ApiState<clientQequestReturnAction> & {
  returnDate: any;
};

const initialState: QuestReturnState = {
  returnDate: null,
  ...newApiState<QuestReturnState>(clientQequestReturnAction),
};

const clientQuestReturnStateSlice = createSlice({
  name: ReducerName.CLIENT_REQUESTRETURN,
  initialState,
  reducers: {
    resetQuestReturnState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(requestReturnAsync.fulfilled, (state, action) => {
      state.returnDate = action.payload;
    });
    asyncMatcher(builder, ReducerName.CLIENT_REQUESTRETURN);
  },
});

export const { resetQuestReturnState } = clientQuestReturnStateSlice.actions;
export default clientQuestReturnStateSlice.reducer;
