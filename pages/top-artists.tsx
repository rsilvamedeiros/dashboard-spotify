// pages/top-artists.tsx

import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TopArtists: React.FC<{ topArtists: any[] }> = ({ topArtists }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (topArtists) {
      const labels = topArtists.map(artist => artist.name);
      const values = topArtists.map(artist => artist.popularity);

      setData({
        labels,
        datasets: [
          {
            label: 'Artist Popularity',
            data: values,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [topArtists]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Top Artists</h1>
      {data && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Artist Popularity</h2>
          <Bar data={data} />
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

  const topArtistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const topArtistsData = await topArtistsResponse.json();

  return { props: { topArtists: topArtistsData.items } };
};

export default TopArtists;
