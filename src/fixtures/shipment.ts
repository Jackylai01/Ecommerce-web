export const calculateLogisticsFee = (shipment: any, totalPrice: number) => {
  let logisticsFee = 0;
  switch (shipment.logisticsSubType) {
    case 'UNIMART':
      logisticsFee = 55; // 基本物流費用
      if (shipment.isCollection === 'Y') {
        logisticsFee += Math.max(3, totalPrice * 0.0075); // 代收手續費
      }
      break;
    case 'UNIMARTFREEZE':
      logisticsFee = 129; // 冷凍物流費用
      if (shipment.isCollection === 'Y') {
        logisticsFee += Math.max(3, totalPrice * 0.0075); // 代收手續費
      }
      break;
    case 'FAMI':
      logisticsFee = 55; // 基本物流費用
      if (shipment.isCollection === 'Y') {
        logisticsFee += Math.max(3, totalPrice * 0.0075); // 代收手續費
      }
      break;
    // 添加更多物流子類型的費用計算邏輯
    default:
      break;
  }
  return logisticsFee;
};

export const logisticsSubTypeMap = {
  FAMI: '全家物流(B2C)',
  UNIMART: '7-ELEVEN超商物流(B2C)',
  UNIMARTFREEZE: '7-ELEVEN冷凍店取(B2C)',
  FAMIC2C: '全家物流(C2C)',
  UNIMARTC2C: '7-ELEVEN超商物流(C2C)',
  HILIFE: '萊爾富物流(B2C)',
  HILIFEC2C: '萊爾富物流(C2C)',
  OKMARTC2C: 'OK超商(C2C)',
  TCAT: '黑貓物流',
  POST: '中華郵政',
};

export const reasonMapping: any = {
  'quality-issue': '商品質量問題',
  'wrong-item': '收到錯誤商品',
  damaged: '商品損壞',
  'not-as-described': '商品與描述不符',
  other: '其他原因',
};

export const getStatusShipmentColorScheme = (status: any) => {
  switch (status) {
    case 'Pending':
      return 'yellow';
    case 'Paid':
      return 'blue';
    case 'Created':
      return 'green';
    default:
      return 'gray';
  }
};

export const shipmentStatusMap = {
  Pending: '未出貨',
  Paid: '已出貨',
  Created: '等待處理',
};

export type ShipmentStatus = keyof typeof shipmentStatusMap;
export type LogisticsSubType = keyof typeof logisticsSubTypeMap;
