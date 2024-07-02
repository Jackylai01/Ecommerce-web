export interface Transaction {
  _id: string;
  date: string;
  amount: string;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  paymentMethod: string;
  customerName: string;
  productDescription: string;
}

export interface ShipmentResponse {
  _id: string;
  orderId: string;
  carrier: string;
  receiverName: string;
  shipmentStatus: string;
}
