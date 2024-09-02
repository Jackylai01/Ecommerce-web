import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { ChatResponse, MessageResponse } from '@models/responses/messages';
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchChatsAsync,
  fetchMessagesAsync,
  MessageAsyncAction,
  sendMessageAsync,
} from './actions';

type MessageState = ApiState<MessageAsyncAction> & {
  chats: ChatResponse[] | null;
  messages: { [key: string]: MessageResponse[] } | null;
};

const initialState: MessageState = {
  chats: null,
  messages: {},
  ...newApiState<MessageState>(MessageAsyncAction),
};

const messageSlice = createSlice({
  name: ReducerName.PUBLIC_MESSAGES,
  initialState,
  reducers: {
    resetMessageState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatsAsync.fulfilled, (state, action) => {
      state.chats = action.payload;
    });
    builder.addCase(fetchMessagesAsync.fulfilled, (state, action) => {
      state.messages = state.messages || {};
      state.messages[action.meta.arg] = action.payload;
    });
    builder.addCase(sendMessageAsync.fulfilled, (state, action) => {
      state.messages = state.messages || {};
      if (state.messages[action.payload.chatId]) {
        state.messages[action.payload.chatId].push(action.payload);
      } else {
        state.messages[action.payload.chatId] = [action.payload];
      }
    });
    asyncMatcher(builder, ReducerName.PUBLIC_MESSAGES);
  },
});

export const { resetMessageState } = messageSlice.actions;
export default messageSlice.reducer;
