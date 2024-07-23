export const getOrderStatusInChinese = (order: any) => {
  const latestPaymentStatus = order.payments?.[0]?.PaymentStatus;
  const latestShipmentStatus = order.shipments?.[0]?.shipmentStatus;

  if (order.status === 'Cancelled') {
    return '已取消';
  } else if (order.status === 'Shipped') {
    return '已出貨';
  } else if (order.status === 'Completed') {
    return '已完成';
  } else if (order.status === 'Pending') {
    return '待處理';
  } else if (order.paymentMethod === 'COD' && order.status === 'COD_Pending') {
    return '貨到付款待處理';
  } else if (
    latestPaymentStatus === 'Failed' ||
    latestShipmentStatus === 'Returned'
  ) {
    return '已退貨';
  } else if (
    latestPaymentStatus === 'Refunded' ||
    latestShipmentStatus === 'Returned'
  ) {
    return '已退貨';
  } else if (
    latestPaymentStatus === 'Paid' &&
    latestShipmentStatus === 'Delivered'
  ) {
    return '已完成';
  } else if (
    latestPaymentStatus === 'Paid' &&
    (latestShipmentStatus === 'Shipped' ||
      latestShipmentStatus === 'In Transit')
  ) {
    return '已出貨';
  } else if (
    latestPaymentStatus === 'Paid' &&
    latestShipmentStatus === 'Pending'
  ) {
    return '處理中';
  } else if (
    latestPaymentStatus === 'Pending' &&
    latestShipmentStatus === 'Pending'
  ) {
    return '待處理';
  } else {
    return '待處理';
  }
};

export const getOrderStatusColor = (order: any) => {
  const latestPaymentStatus = order.payments?.[0]?.PaymentStatus;
  const latestShipmentStatus = order.shipments?.[0]?.shipmentStatus;

  if (latestPaymentStatus === 'Failed' || order.status === 'Cancelled') {
    return 'red';
  } else if (
    latestPaymentStatus === 'Refunded' ||
    latestShipmentStatus === 'Returned'
  ) {
    return 'orange';
  } else if (
    latestPaymentStatus === 'Paid' &&
    latestShipmentStatus === 'Delivered'
  ) {
    return 'green';
  } else if (
    latestPaymentStatus === 'Paid' &&
    (latestShipmentStatus === 'Shipped' ||
      latestShipmentStatus === 'In Transit')
  ) {
    return 'blue';
  } else if (
    latestPaymentStatus === 'Paid' &&
    latestShipmentStatus === 'Pending'
  ) {
    return 'yellow';
  } else if (
    latestPaymentStatus === 'Pending' &&
    latestShipmentStatus === 'Pending'
  ) {
    return 'gray';
  } else if (order.paymentMethod === 'COD' && order.status === 'COD_Pending') {
    return 'purple';
  } else {
    return 'gray';
  }
};
