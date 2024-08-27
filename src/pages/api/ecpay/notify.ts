import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const paymentData = req.body;
    console.log(req.method);
    try {
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
        res.redirect(302, `/payment-result/payment-success/${MerchantTradeNo}`);
      } else {
        const { MerchantTradeNo } = paymentData;
        res.redirect(302, `/payment-result/payment-failure/${MerchantTradeNo}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      res.redirect(404, '/payment-result/payment-failure');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
