import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const paymentData = req.body;

    try {
      const response = await fetch('http://localhost:3001/api/ecpay/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      const result = await response.text();
      if (result === '1|OK') {
        // 处理成功后重定向到前端成功页面
        res.redirect('/payment-success');
      } else {
        // 处理失败后重定向到前端失败页面
        res.redirect('/payment-failure');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      res.redirect('/payment-failure');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
