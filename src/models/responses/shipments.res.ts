export interface ShipmentResponse {
  _id: string;
  orderId: {
    _id: string;
  };
  LogisticsID: string;
  tempLogisticsID: string;
  shipmentStatus: string;
  carrier: string;
  trackingNumber?: string;
  goodsAmount: number;
  updateStatusDate: string;
  receiverName: string;
  receiverCellPhone: string;
  receiverEmail: string;
  receiverAddress: string;
  bookingNote?: string;
  cvsPaymentNo?: string;
  cvsValidationNo?: string;
  logisticsType: string;
  logisticsSubType: string;
  logisticsStatusHistory: {
    status: string;
    statusName: string;
    updateDate: string;
  }[];
  shipmentDate?: string;
  receiverStoreID?: string;
  uniqueId?: string;
}
