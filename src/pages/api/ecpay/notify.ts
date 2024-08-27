import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const paymentData = req.body;
    try {
      // 處理綠界的付款通知
      const response = await fetch(
        'https://ecommerce-api2023.onrender.com/api/ecpay/notify',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        },
      );

      const result = await response.text();

      if (result === '1|OK') {
        const { MerchantTradeNo } = paymentData;
        res.redirect(`/payment-result/payment-success/${MerchantTradeNo}`);
      } else {
        res.redirect('/payment-result/payment-failure');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      res.redirect('/payment-result/payment-failure');
    }
  } else if (req.method === 'GET') {
    // 處理用戶被導回的情況，顯示付款結果頁面
    res.status(200).send('This is the result page after payment.');
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
