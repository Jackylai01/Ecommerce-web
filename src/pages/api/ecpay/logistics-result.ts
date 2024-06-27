import { NextApiRequest, NextApiResponse } from 'next';

const handleLogisticsResult = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { ResultData } = req.body;

    if (!ResultData) {
      return res.status(400).json({ message: 'ResultData field is missing' });
    }

    const parsedData = JSON.parse(ResultData);

    res.status(200).json({ success: true, data: parsedData });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handleLogisticsResult;
