// pages/dashboard.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obter o token do cookie
        const response = await fetch('/api/auth/me');
        const { accessToken } = await response.json();

        if (accessToken) {
          const userResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setData(userResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data from Spotify:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {data ? (
        <div>
          <h2 className="text-xl">Welcome, {data.display_name}</h2>
          <img src={data.images[0]?.url} alt="Profile" className="rounded-full w-32 h-32" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
