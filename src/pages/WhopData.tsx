import { useState, useEffect } from 'react';
import WhopDataComponent from '@/components/WhopData';

export default function WhopData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://info-radar.vercel.app/api/whop-data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return <WhopDataComponent data={data} />;
}