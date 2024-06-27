import { useEffect } from 'react';

const LogisticsPage = () => {
  useEffect(() => {
    const logisticsHtml = localStorage.getItem('logisticsSelection');
    if (logisticsHtml) {
      document.open();
      document.write(logisticsHtml);
      document.close();
    } else {
      console.error('No logisticsSelection found in localStorage');
    }
  }, []);

  return null;
};

export default LogisticsPage;
