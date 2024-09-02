import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetChatMessages,
  apiGetChats,
  apiSendMessage,
} from '@services/messgaes/chats/chats';

export enum MessageAsyncAction {
  fetchChats = 'fetchChats',
  fetchMessages = 'fetchMessages',
  sendMessage = 'sendMessage',
}

/**
 * 獲取聊天列表
 */
export const fetchChatsAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_MESSAGES}/${MessageAsyncAction.fetchChats}`,
  async (query: PagingQuery) => {
    const response = await apiGetChats(query);
    return response.result.data;
  },
);

/**
 * 獲取聊天訊息
 */
export const fetchMessagesAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_MESSAGES}/${MessageAsyncAction.fetchMessages}`,
  async (chatId: string) => {
    const response = await apiGetChatMessages(chatId);
    return response.result.data;
  },
);

/**
 * 發送訊息
 */
export const sendMessageAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_MESSAGES}/${MessageAsyncAction.sendMessage}`,
  async (data: { chatId: string; message: string }) => {
    const response = await apiSendMessage(data);
    return response.result.data;
  },
);
