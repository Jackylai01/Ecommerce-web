import { Transaction } from './transactions.res';

export interface ordersResponse {
  _id: string;
  user: {
    username: string;
  };
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  paymentResult?: {
    commonData?: any;
    ecpayData?: any;
  };
  shippingAddress?: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
  };
  products: {
    name: string;
  }[];
  receiverName: string;
  receiverCellPhone: string;
  receiverEmail: string;
  createdAt: string;
}

export interface OrderDetail {
  user: {
    username: string;
    email: string;
  };
  order: {
    paymentResult: any;
    shippingAddress: any;
    _id: string;
    totalPrice: number;
    status: Transaction['status'];
    createdAt: Date;
  };
  shipments: Array<{
    _id: string;
    LogisticsID: string;
    shipmentStatus: string;
    receiverCellPhone: string; // 收件人電話
    receiverEmail: string; // 收件人信箱
  }>;
  payments: Array<{
    _id: string;
    ChoosePayment: string;
    TotalAmount: number;
    PaymentStatus: string;
    ItemName: string;
    MerchantTradeNo: string;
    PaymentType: any;
    PaymentTypeChargeFee: number;
  }>;
  invoices: Array<{
    _id: string;
    invoiceNumber: string;
    issueDate: Date;
    totalAmount: number;
    status: string;
  }>;
}
