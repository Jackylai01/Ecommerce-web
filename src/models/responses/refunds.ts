export class refundsResponse {
  userId!: string;
  orderId!: string;
  reason!: string;
  status!: 'Pending' | 'Approved' | 'Rejected' | 'In Progress' | 'Completed';
  images!: { imageUrl: string; imageId: string }[];
  ecpayResponse!: {
    RtnCode: number;
    RtnMsg: string;
    RtnMerchantTradeNo: string;
    RtnOrderNo: string;
  };
}
