import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';

import { ChatResponse, MessageResponse } from '@models/responses/messages';
import {
  ApiPaginationResult,
  ApiResult,
  getRequest,
  postRequest,
} from '../../shared/api';

/**
 * 獲取聊天列表
 */
export const apiGetChats = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<ChatResponse>>(
    formatQueryString('/messages/chats', query),
  );

/**
 * 獲取特定聊天的訊息
 */
export const apiGetChatMessages = async (chatId: string) =>
  getRequest<ApiResult<MessageResponse[]>>(
    `/messages/chats/${chatId}/messages`,
  );

/**
 * 發送訊息
 */
export const apiSendMessage = async (data: {
  chatId: string;
  message: string;
}) => postRequest<ApiResult<MessageResponse>>('/messages/chats/message', data);
