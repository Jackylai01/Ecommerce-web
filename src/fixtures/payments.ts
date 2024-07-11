export const paymentTypeMap = {
  WebATM_TAISHIN: '台新銀行WebATM(暫不提供)',
  WebATM_ESUN: '玉山銀行WebATM(暫不提供)',
  WebATM_BOT: '台灣銀行WebATM',
  WebATM_FUBON: '台北富邦WebATM(暫不提供)',
  WebATM_CHINATRUST: '中國信託WebATM',
  WebATM_FIRST: '第一銀行WebATM',
  WebATM_CATHAY: '國泰世華WebATM(暫不提供)',
  WebATM_MEGA: '兆豐銀行WebATM(暫不提供)',
  WebATM_LAND: '土地銀行WebATM',
  WebATM_TACHONG: '大眾銀行WebATM(2018年已併到元大銀行)(暫不提供)',
  WebATM_SINOPAC: '永豐銀行WebATM(暫不提供)',
  ATM_TAISHIN: '台新銀行ATM(暫不提供)',
  ATM_ESUN: '玉山銀行ATM(暫不提供)',
  ATM_BOT: '台灣銀行ATM',
  ATM_FUBON: '台北富邦ATM(暫不提供)',
  ATM_CHINATRUST: '中國信託ATM',
  ATM_FIRST: '第一銀行ATM',
  ATM_LAND: '土地銀行ATM',
  ATM_CATHAY: '國泰世華銀行ATM',
  ATM_TACHONG: '大眾銀行ATM(2018年已併到元大銀行)(暫不提供)',
  ATM_PANHSIN: '板信銀行ATM',
  CVS_CVS: '超商代碼繳款',
  CVS_OK: 'OK超商代碼繳款',
  CVS_FAMILY: '全家超商代碼繳款',
  CVS_HILIFE: '萊爾富超商代碼繳款',
  CVS_IBON: '7-11 ibon代碼繳款',
  BARCODE_BARCODE: '超商條碼繳款',
  Credit_CreditCard: '信用卡',
  Flexible_Installment: '圓夢彈性分期',
  TWQR_OPAY: '歐付寶TWQR 行動支付',
  BNPL_URICH: '裕富數位無卡分期',
};

export const getPaymentStatusColors = (status: PaymentStatus): string => {
  switch (status) {
    case 'Pending':
      return 'gray.700';
    case 'Paid':
      return 'green';
    case 'Failed':
      return 'red';
    default:
      return 'gray.700';
  }
};

export const paymentStatusMap: any = {
  Pending: '未付款',
  Paid: '已付款',
  failed: '付款失败',
};

export type PaymentTypeKey = keyof typeof paymentTypeMap;
export type PaymentStatus = keyof typeof paymentStatusMap;
