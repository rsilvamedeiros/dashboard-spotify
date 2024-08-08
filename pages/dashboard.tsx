// pages/dashboard.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

interface UserProfile {
  display_name: string;
  images: { url: string }[];
  email: string;
  id: string;
}

const Dashboard: React.FC<{ userProfile: UserProfile }> = ({ userProfile }) => {
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${userProfile.accessToken}`,
          },
        });
        setPlaylists(response.data.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, [userProfile.accessToken]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center mt-4">
        <img
          src={userProfile.images[0]?.url}
          alt="Profile"
          className="rounded-full w-32 h-32"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{userProfile.display_name}</h2>
          <p>Email: {userProfile.email}</p>
          <p>ID: {userProfile.id}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Playlists</h2>
        <ul>
          {playlists.map((playlist: any) => (
            <li key={playlist.id} className="mt-2">
              <p className="font-bold">{playlist.name}</p>
              <p>{playlist.description}</p>
              <img src={playlist.images[0]?.url} alt={playlist.name} className="w-16 h-16 mt-2" />
            </li>
          ))}
        </ul>
      </div>
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

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const userProfile = await response.json();
  return { props: { userProfile } };
};

export default Dashboard;
