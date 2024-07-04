import { Transaction } from '@models/responses/transactions.res';

export const statusColors: { [key in Transaction['status']]: string } = {
  Pending: 'yellow',
  Paid: 'blue',
  Shipped: 'orange',
  Completed: 'green',
  Cancelled: 'red',
};

export const statusMap: { [key in Transaction['status']]: string } = {
  Pending: '待處理',
  Paid: '已支付',
  Shipped: '已出貨',
  Completed: '完成',
  Cancelled: '取消',
};

export const tradeStatusMap: { [key: string]: string } = {
  '0': '未付款',
  '1': '已付款',
  '10200095': '交易失敗',
};
