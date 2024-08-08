// pages/statistics.tsx

import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const Statistics: React.FC<{ playlists: any[] }> = ({ playlists }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (playlists) {
      const labels = playlists.map(playlist => playlist.name);
      const values = playlists.map(playlist => playlist.tracks.total);

      setData({
        labels,
        datasets: [
          {
            label: 'Number of Tracks per Playlist',
            data: values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [playlists]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Statistics</h1>
      {data && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Playlist Track Counts</h2>
          <Line data={data} />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || !session.accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const playlistsResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const playlistsData = await playlistsResponse.json();

  return { props: { playlists: playlistsData.items } };
};

export default Statistics;
