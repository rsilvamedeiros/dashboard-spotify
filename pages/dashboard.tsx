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
  product: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
}

interface Track {
  name: string;
  artists: { name: string }[];
  album: { name: string };
}

const Dashboard: React.FC<{ userProfile: UserProfile; playlists: Playlist[] }> = ({ userProfile, playlists }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  const fetchTracks = async (playlistId: string) => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${userProfile.accessToken}`,
        },
      });
      setTracks(response.data.items.map((item: any) => item.track));
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  useEffect(() => {
    if (selectedPlaylist) {
      fetchTracks(selectedPlaylist.id);
    }
  }, [selectedPlaylist]);

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
          <p>Product: {userProfile.product}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Playlists</h2>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id} className="mt-2">
              <p className="font-bold">{playlist.name}</p>
              <p>{playlist.description}</p>
              <img src={playlist.images[0]?.url} alt={playlist.name} className="w-16 h-16 mt-2" />
              <button
                onClick={() => setSelectedPlaylist(playlist)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                View Tracks
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedPlaylist && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Tracks in {selectedPlaylist.name}</h2>
          <ul>
            {tracks.map((track, index) => (
              <li key={index} className="mt-2">
                <p className="font-bold">{track.name}</p>
                <p>Artists: {track.artists.map(artist => artist.name).join(', ')}</p>
                <p>Album: {track.album.name}</p>
              </li>
            ))}
          </ul>
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

  const userProfileResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const userProfile = await userProfileResponse.json();

  const playlistsResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const playlistsData = await playlistsResponse.json();

  return { props: { userProfile, playlists: playlistsData.items } };
};

export default Dashboard;
