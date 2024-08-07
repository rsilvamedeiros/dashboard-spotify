import { useSession, signIn, signOut } from 'next-auth/react';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (session) {
      axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }).then(response => {
        setPlaylists(response.data.items);
      });
    }
  }, [session]);

  if (!session) {
    return <button onClick={() => signIn('spotify')}>Login with Spotify</button>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()}>Logout</button>

      <h2>Your Playlists</h2>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}
