export interface ChatResponse {
  _id: string;
  participants: string; // 參與者的ID
  lastMessage?: MessageResponse; // 最後一條訊息的詳情
  createdAt: Date; // 聊天創建時間
  updatedAt: Date; // 最後更新時間
}

export interface MessageResponse {
  _id: string;
  chatId: string;
  sender: string;
  receiver: string;
  message: string; // 訊息內容
  timestamp: Date; // 訊息發送時間
}
