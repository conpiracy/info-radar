import React from 'react';

interface PlatformMetrics {
  total_revenue: number;
  total_users: number;
}

interface Community {
  rank: number;
  name: string;
  logo: string;
  affiliate_earnings: number;
}

interface WhopDataProps {
  data: {
    platform_metrics: PlatformMetrics;
    top_communities: Community[];
  };
}

const WhopData: React.FC<WhopDataProps> = ({ data }) => {
  return (
    <div>
      <h1>Whop Analytics</h1>
      <div>
        <h2>Platform Metrics</h2>
        <p>Revenue: ${data.platform_metrics.total_revenue}</p>
        <p>Users: {data.platform_metrics.total_users}</p>
      </div>
      <div>
        <h2>Top Communities</h2>
        {data.top_communities.map((community) => (
          <div key={community.rank}>
            <h3>{community.name}</h3>
            <img src={community.logo} alt={community.name} />
            <p>Earnings: ${community.affiliate_earnings}</p>
            <p>Rank: #{community.rank}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhopData;
