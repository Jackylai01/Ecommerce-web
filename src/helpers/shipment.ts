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
